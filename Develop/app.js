const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamarray = [];

//create a role selecter to send user to questions in respective role 
//roles:
//Manager
//Engineer
//Intern
startQuestions(); 
function startQuestions() {
    inquirer.prompt([
        {
            type:"list",
            name:"role",
            message:"What is your role?",
            choices:["Manager","Engineer","Intern","Done"]
        } //Done just in for testing
    ]).then(async function roleSelect(answers){
        if (answers.role === "Manager"){
            managerQuestions();
        } else if (answers.role === "Engineer"){
            engineerQuestions();
        } else if (answers.role === "Intern"){
            internQuestions();
        } else if (answers.role === "Done"){
            renderHTML();
        }
    })
};
//questions for the manager
async function managerQuestions(){
    console.log("Manager Prompt");
    inquirer.prompt([
        {
            type:"input",
            name: "managername",
            message:"What is your name?"
        },
        {
            type:"input",
            name: "managerofficenum",
            message:"What is your office number?"
        },
        {
            type:"input",
            name: "managerid",
            message:"What is your ID?"
        },
        {
            type:"input",
            name: "managercontact",
            message:"your Email?"
        },  
    ]).then( answers => {
        const manager = new manager(answers.managername, answers.managerofficenum, answers.managerid, answers.managercontact);
        console.log(manager)
        teamarray.push(manager);
        startQuestions();
    })
};

async function engineerQuestions(){
    console.log("Engineer Prompt");
    inquirer.prompt([
        {
            type:"input",
            name:"engineername",
            message:"What is your name?",
        },
        {
            type:"input",
            name:"engineerofficenum",
            message:"what is your office number?",
        },
        {
            type:"input",
            name:"engineergithub",
            message:"What is your GitHub profile?",
        }
    ]).then( answers => {
        const engineer = new engineer(answers.engineername, answers.engineerofficenum, answers.engineergithub);
        console.log(engineer);
        teamarray.push(engineer);
        startQuestions();
    })
};

async function internQuestions(){
    console.log("Intern Prompt");
    inquirer.prompt([
        {
            type:"input",
            name:"internname",
            message:"What is your name?"
        },
        {
            type:"input",
            name:"internofficenum",
            message:"What is your office number?"
        },
        {
            type:"input",
            name:"internschool",
            message:"What school did you attend?"
        },
    ]).then( answers =>{
        const intern = new intern(answers.internname, answers.internofficenum, answers.internschool);
        console.log(intern);
        teamarray.push(intern);
        startQuestions();
    })
};

function renderHTML(){
    const html = render(teamarray);
    fs.writeFile(outputPath,html,"uft-8", function(err){
    if (err) throw err;
    console.log("Team page created!")
});
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

