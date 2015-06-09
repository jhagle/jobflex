/*user wants to search for matching jobs based on both skills and attitude
pseudo code
retrieve users lists from database
note for self: mongo's find method returns a cursor object. use .fetch() method to access
documents within cursor object. in meteor api? more importantly, how do I retrieve stuff from the database?*/

var User = require('../app/models/user');
var Company = require('../app/models/company');
var Job = require('../app/models/job');
var sumList;
var sumList2;

//Param one is the ID of the user performing the search. Param 2 is a boolean, false if the user is a candidate, true if the user is a job listing.
function search(id,type){
    var skills;
    var cult;
	if(type){
        Job.findOne({"_id":id},{"skills":1,"_id":0},function (err,s){
            if(err) return err;
            else{
                skills=s;
            }
        });
        Job.findOne({"_id":id},{"culture":1,"_id":0},function (err,s){
            if(err) return err;
            else{
                cult=s;
            }
        });
    }
    else{
        User.findOne({"_id":id},{"local.candidate.skills":1,"_id":0},function (err,s){
            if(err) return err;
            else{
                skills=s;
            }
        });
        User.findOne({"_id":id},{"local.candidate.culture":1,"_id":0},function (err,s){
            if(err) return err;
            else{
                cult=s;
            }
        });
    }
    var narrowed =  narrowDown(type, skills);
    sortByCulture(sortedBySkill,cult,type);
    var sortedBySkill = sortBySkill(narrowed,skills,type);
    return finalSort(sortedBySkill);
}
/*
* Narrows down the list of possible matches so that only the jobs/candidates that have the user's #1 skill in their top 3 skills will show up
* */
function narrowDown(type,skills){
    var idArray;
    var cur;
    var l;
    var toReturn=new Array();
    if(type){
        User.find({},{"_id":1},function (err,s){
            if(err) return err;
            else{
                idArray = s;
            }
        });
        l = idArray.length;
        for(var i=0;i<l;i++){
            User.findOne({"_id":idArray[i]},{"_id":0,"local.candidate.skills":1}, function(err,s){
                if(err) return err;
                else{
                    //cur is the current skills array.
                    cur = s;
                    for(var k=0;k<3;k++){
                        if(cur[k]==skills[0]){
                            toReturn.push(idArray[i]);
                        }
                    }
                }
            });
        }
    }
    else{
        Job.find({},{"_id":1},function (err,s){
            if(err) return err;
            else{
                idArray = s;
            }
        });
        l = idArray.length;
        for(var i=0;i<l;i++){
            Job.findOne({"_id":idArray[i]},{"_id":0,"skills":1}, function(err,s){
                if(err) return err;
                else{
                    //cur is the current skills array.
                    cur = s;
                    for(var k=0;k<3;k++){
                        if(cur[k]==skills[0]){
                            toReturn.push(idArray[i]);
                        }
                    }
                }
            });
        }
    }
    if(toReturn.length==0){
        return idArray;
    }
    return toReturn;
}

//Sorts the idList and accompanying sumList by skills
function sortBySkill(idArray,skills,type){
    sumList = new Array(idArray.length);
    var l = idArray.length;
    var s  = skills.length;
    var cur;
    if(type){
        for(var i=0;i<l;i++){
            User.findOne({"_id":idArray[i]},{"_id":0,"local.candidate.skills":1}, function(err,s){
                if(err) return err;
                else{
                    //cur is the current skills array.
                    cur = s;
                    var c = cur.length;
                    for(var k=0;k<c;k++){
                        sumList[i]+=(Math.abs(parseInt(skills[k])-parseInt(cur[k])));
                    }
                }
            });
        }
    }
    else{
        for(var i=0;i<l;i++){
            Job.findOne({"_id":idArray[i]},{"_id":0,"skills":1}, function(err,s){
                if(err) return err;
                else{
                    //cur is the current skills array.
                    cur = s;
                    var c = cur.length;
                    for(var k=0;k<c;k++){
                        sumList[i]+=(Math.abs(parseInt(skills[k])-parseInt(cur[k])));
                    }
                }
            });
        }
    }
    quickSort(idArray,0,idArray.length,true);
    return idArray;
}

function sortByCulture(idArray,culture,type){
    sumList2 = new Array(idArray.length);
    var l = idArray.length;
    var s  = culture.length;
    var cur;
    if(type){
        for(var i=0;i<l;i++){
            User.findOne({"_id":idArray[i]},{"_id":0,"local.candidate.culture":1}, function(err,s){
                if(err) return err;
                else{
                    //cur is the current culture array.
                    cur = s;
                    var c = cur.length;
                    for(var k=0;k<c;k++){
                        sumList2[i]+=(Math.abs(parseInt(culture[k])-parseInt(cur[k])));
                    }
                }
            });
        }
    }
    else{
        for(var i=0;i<l;i++){
            Job.findOne({"_id":idArray[i]},{"_id":0,"culture":1}, function(err,s){
                if(err) return err;
                else{
                    //cur is the current culture array.
                    cur = s;
                    var c = cur.length;
                    for(var k=0;k<c;k++){
                        sumList2[i]+=(Math.abs(parseInt(culture[k])-parseInt(cur[k])));
                    }
                }
            });
        }
    }
    quickSort(idArray,0,idArray.length,false);
}

function finalSort(idList){
    var l =idList.length;
    var i =0;
    var j=0;
    var range=5;
    var iter =5;
    while(range<100 && i<l){
        while(i<l && sumList[i]<range){
            i++;
        }
        quickSort(idList,j,i,false);
        j=i;
        range+=iter;
    }
}

//my own implementation of quick sort that also sorts the _id list with respect to the best matches
function quickSort(idList,i,j,b){
	if(i < j){
		var p = partition(idList,i,j,b);
		quickSort(idList,i,p-1,b);
		quickSort(idList,p+1,j,b);
	}
}

function partition(idList,i,j,b){
    var s;
    if(b) s=sumList;
    else s=sumList2;
	var val = sumList[i];
	var h =i;
	for (var k=i+1;k<=j;k++){
		if(s[k]<val){
			h++;
			var temp1 = s[h];
			s[h]=s[k];
			s[k]=temp1;
			
			var temp2 = idList[h];
			idList[h] = idList[k];
			idList[k] = temp2;
		}
	}
	var temp3 = s[i];
	s[i]=s[h];
	s[h]=temp3;
	
	var temp4 = idList[i];
	idList[i] = idList[h];
	idList[h] = temp4;
	
	return h;
}