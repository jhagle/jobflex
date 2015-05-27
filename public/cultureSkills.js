/**
 * Created by Stephan on 5/27/2015.
 */


/*****Arrays that return cultural attitudes towards work and skills needed for jobs.**************************
******There are 21 entries for cultural attitudes and 19 entries for skills. These arrays can be called*******
******by using 'require(./cultureSkills.js)' in the javascript page in which it is needed.********************
******The exports module will make any methods in this document available to**********************************
******the document which requires it. The syntax will be 'cultureSkills.method'.*****************************/

var exports = module.exports = {};

/*****************Cultural attitudes array*****************/

var cultureArray = [
        "Creative",
        "Logical",
        "Problem Solver",
        "Good Listener",
        "Oral Communicator",
        "Flexibility in Scheduling",
        "People Skills",
        "Punctual",
        "Accurate",
        "Efficient",
        "Multi-tasker",
        "Analytical",
        "Planner",
        "Researcher",
        "Team Leader",
        "Team Member",
        "Stamina",
        "Like Fast Pace",
        "Relationship Builder",
        "UX/UI",
        "Teacher/Mentor"
]

/***************************************************/

/*****************Job skills array*****************/

var skillArray = [
        "Project Management",
        "Tech Writing",
        "Programming Scripts",
        "Programming Java",
        "Programming C/C++/C# etc",
        "Programming Python, Ruby, Web2Py",
        "Database",
        "UI/UX",
        "Algorithms",
        "Debugging",
        "System Design",
        "Business Analysis",
        "Web Development",
        "Mobile Development",
        "OS",
        "System Architecture",
        "System Integration",
        "AI",
        "Game Programming"
]

/***************************************************/

/*******Make methods available to other files******/

exports.cultureArray = cultureArray;
exports.skillArray = skillArray;

/*************************************************/





