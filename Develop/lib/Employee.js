
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;

    }
    getName() {
        return this.name;
    }
    getid() {
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole() {
        let currentRole = "Employee";
        return currentRole;
    }
}

module.exports = Employee;