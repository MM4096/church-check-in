class Person {
    constructor(firstname, lastname = "", birthday = "", notes = "", email = "", phone = "") {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.notes = notes;
        this.email = email;
        this.phone = phone;
    }
}

class Relationship {
    constructor(parentId, childId) {
        this.parentId = parentId;
        this.childId = childId;
    }
}

class CheckInRequest {
    constructor(personId, checkInTime = null, checkOutTime = null) {
        this.personId = personId;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }
}