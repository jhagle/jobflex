//user wants to search for matching jobs based on both skills and attitude
//pseudo code
//retrieve users lists from database
//note for self: mongo's find method returns a cursor object. use .fetch() method to access 
//documents within cursor object. in meteor api? more importantly, how do I retrieve stuff from the database?
var userSkillList = db.candidateData.find( {_id: *userId*}, {skillsSort: 1, _id: 0} ).fetch();
var userAttiList = db.candidateData.find( {_id: *userId*}, {workAttitude: 1, _id: 0} ).fetch();

//The function would return an _id array sorted from best matches to worst.
//the equivalent search function for companies looking for candidates would probably be almost identical
function searchSkillsUser(userSkillList){
	//retrieve companies lists
	var compSkillArr = db.companyData.find( {}, {skillsSort: 1} ).fetch();
	
	var lenCSA = compSkillList[1].length;

	//these arrays will store the values calculated by the best match algorithm
	var compSkillSum = new Array(lenCSA);
	
	//An algorithm for comparing the user skill elements with companies' user skill elements
	//outer most loop iterates through all the skill lists retrieved from the database
	
	for(i=0;i<lenCSA;i++){
		var curList = compSkillArr[1][i];
		var cl = curList.length;
		//inner loops compares the top five elements in the user's list w/ the curList.
		//will record the differences in ranks btwn the two lists
		for(j=0;j<5;j++){
			for(k=0;k<cl;k++{
				//does equality operator work on strings in JS?
				if(userSkillList[j] == curList[k]){
					compSkillSum[i]+=Math.abs(i-j);
				}
			}
		}
	}
	
	return quickSort(compSkillSum,compSkillArr[0],0,lenCSA-1);
}

//basically the same algorithm as searchSkillsUser
function searchAttiUser(userAttiList){
	var compAttiArr = db.companyData.find( {}, {workAttitude: 1} ).fetch();
	var lenCAA = compAttiArr[1].length;
	var compAttiSum =  new Array(lenCAA);
	
	for(i=0;i<lenCAA;i++){
		var curList = compAttiArr[1][i];
		var cl = curList.length;
		for(j=0;j<5;j++){
			for(k=0;k<cl;k++{
				//does equality operator work on strings in JS?
				if(userAttiList[j] == curList[k]){
					compAttiSum[i]+=Math.abs(i-j);
				}
			}
		}
	}
	
	return quickSort(compAttiSum,compAttiArr[0],0,lenCAA-1);
}

//my own implementation of quick sort that also sorts the _id list with respect to the best matches
function quickSort(sumList,idList,i,j){
	if(i < j){
		p = partition(sumList,idList,i,j);
		quicksort(sumList,idList,i,p-1);
		quicksort(sumList,idList,p+1,j);
	}
	return idList;
}

function partition(sumList,idList,i,j){
	var val = sumList[i];
	var h =i;
	for (k=i+1;k<=j;k++){
		if(sumList[k]<val){
			h++;
			var temp1 = sumList[h];
			sumList[h]=sumList[k];
			sumList[k]=temp1;
			
			var temp2 = idList[h];
			idList[h] = idList[k];
			idList[k] = temp2;
		}
	}
	var temp3 = sumList[i];
	sumList[i]=sumList[h];
	sumList[h]=temp3;
	
	var temp4 = idList[i];
	idList[i] = idList[h];
	idList[h] = temp4;
	
	return h;
}