const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employeeArray = [];
function questions() {
    inquirer.prompt(
        [


            {
                type: "input",
                name: "name",
                message: "name:"
            },

            {
                type: "input",
                name: "email",
                message: "email:"
            },

            {
                type: "input",
                name: "id",
                message: "ID:"
            },

            {
                type: "list",
                name: "role",
                message: "Role:", choices: ["Manager", "Intern", "Engineer"]
            },


        ])
        .then(data => {
            switch (data.role) {
                case "Manager":
                    createManager(data);
                    break;

                case "Intern":
                    createIntern(data);
                    break;
                case "Engineer":
                    createEngineer(data);
                    break;
                default:
                    break;
            }
           let directory = path.resolve(__dirname,"output");
           let team = path.join(directory,"team.html")
            writeToFile(team);
           
        }

        )
};

function createManager(prevData) {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "officeNumber",
                message: "Office Number:"
            },
          
        ]
    ).then((managerData) => {
        const newManager = new Manager(prevData.name, prevData.id, prevData.email , managerData.officeNumber);
        employeeArray.push(newManager);
    })

}

function createIntern() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "school",
                message: "School:"
            },
        ]
    ).then((InternData) => {
        const newIntern = new Intern(prevData.name, prevData.id, prevData.email , InternData.school);
        employeeArray.push(newIntern);
    })
}

function createEngineer() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "github",
                message: "GitHub Username:"
            },
        ]
    ).then((engineerData) => {
        const newEngineer = new Engineer(prevData.name, prevData.id, prevData.email , engineerData.github);
        employeeArray.push(newEngineer);
    })
}

function writeToFile(fileName) {
    fs.writeFile(fileName, render(employeeArray), function (err) {
        if (err) throw err;
        console.log("saved");
    })
}

questions();

