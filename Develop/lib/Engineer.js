const Employee = require("./Employee");

class Engineer extends Employee{
    constructor (name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getGithub(){
        return this.github;
    }
    getRole() {
        let currentRole = "Engineer";
        return currentRole;
    }
}
module.exports = Engineer;