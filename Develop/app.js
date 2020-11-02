const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//links to the team html
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//collects all team members as objects 
let teamarray = [];

//create a role selecter to send user to questions in respective role 
//roles:
//Manager
//Engineer
//Intern
 
function startQuestions() {
    inquirer.prompt([
        {
            type:"list",
            name:"role",
            message:"What is your role?",
            choices:["Manager","Engineer","Intern","Create HTML"]
        }
    ]).then(async function roleSelect(answers){
        if (answers.role === "Manager"){
            managerQuestions();
        } else if (answers.role === "Engineer"){
            engineerQuestions();
        } else if (answers.role === "Intern"){
            internQuestions();
        } else if (answers.role === "Create HTML"){
            renderHTML();
        }
    }).catch(error => {
        console.log(error);
    })
};
//Questions for the manager
async function managerQuestions(){
    inquirer.prompt([
        {
            type:"input",
            name: "name",
            message:"What is your name?"
        },
        {
            type:"input",
            name: "id",
            message:"What is your ID?"
        },
        {
            type:"input",
            name: "email",
            message:"your Email?"
        }, 
        {
            type:"input",
            name: "officeNumber",
            message:"What is your office number?"
        }
    ]).then( answers =>{

        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamarray.push(manager);

        startQuestions();

    }).catch(error => {
        console.log(error);
    })
};
//Engineer Questions
async function engineerQuestions(){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"What is your name?",
        },
        {
            type:"input",
            name: "id",
            message:"What is your ID?"
        },
        {
            type:"input",
            name: "email",
            message:"your Email?"
        }, 
        {
            type:"input",
            name:"github",
            message:"What is your GitHub username?",
        }
    ]).then( answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamarray.push(engineer);

        startQuestions();

    }).catch(error => {
        console.log(error);
    })
};
//intern Questions
async function internQuestions(){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"What is your name?"
        },
        {
            type:"input",
            name: "id",
            message:"What is your ID?"
        },
        {
            type:"input",
            name: "email",
            message:"your Email?"
        }, 
        {
            type:"input",
            name:"school",
            message:"What school did you attend?"
        },
    ]).then( answers =>{
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamarray.push(intern);

        startQuestions();

    }).catch(error => {
        console.log(error);
    })
};
//Creates HTML within output folder
function renderHTML(){
    let html = render(teamarray);
    fs.writeFile (outputPath, html, function(err){
        if (err) throw err;
    console.log("Team page has been created!");
});
}

startQuestions();
