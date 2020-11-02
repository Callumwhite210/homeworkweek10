// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require ("./Employee");

class Manager extends Employee {
    constructor (name, id, email, officenum) {
        super(name, id, email);
        this.officenum = officenum;
    }
    getOfficenum() {
        return this.officenum;
    }
    getRole() {
        let currentRole = "Manager";
        return currentRole;
    }
}
module.exports = Manager;