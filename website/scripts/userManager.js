function Search() {
    let search = $("#search").val();
    search = search.replace(" ", "_")
    $.ajax({url: getApiBaseUrl() + "person/" + search, success: function(result)
        {
            let personContainer = $("#personContainer")
            personContainer.empty()
            if (result.length === 0) {
                personContainer.append("<p><b>No results found</b></p>")
                return;
            }
            result.forEach(person => {
                let name = person.firstname + " " + person.lastname
                let searchId = person.id;


                // TODO: loop over all persons returned by function above
                $.ajax({url: getApiBaseUrl() + "relationship/parents/id/" + searchId, success: function(parents) {
                    let tag = ""
                    if (parents.length === 0) {
                        tag += "<div class='border margin checkInContainer'>"
                        tag += "<p><b><i>Person is a parent</i></b></p>"
                        tag += `<br><p><b>${person.firstname} ${person.lastname}</b></p>`
                        tag += `<br><p>Contact: ${person.phone != null ? person.phone : ""} | ${person.email != null ? person.email : ""}</p>`
                    }
                    else {
                        tag += "<div class='border margin checkInContainer'>"
                        tag += `<p><b>${person.firstname} ${person.lastname}</b></p>`
                        tag += `<br><p>Birthday: <b>${person.birthday}</b></p>`
                        tag += `<br><p>Notes: <b>${person.notes}</b></p>`
                        tag += `<br><p>Parents: `
                        parents.forEach((parent) => {
                            tag += `${parent.firstname} ${parent.lastname}, `
                        })
                        tag += "</b></p>"
                        tag += "<br><p>Parent contact info: <b>"
                        parents.forEach((parent) => {
                            tag += `${parent.email !== null ? parent.email + " |" : ""} ${parent.phone !== null ? parent.phone : ""}, `
                        })
                        tag += "</b></p>"
                    }
                    tag += `<br><button onclick="Edit(${person.id})">Edit</button>`
                    tag += "</div>"
                    personContainer.append(tag)

                }})
            })
        }
    })
}


let selectedEditParentId = -1;
let initialParentId = -1;
let editingParent = false;
let selectedId = -1;
function Edit(id) {
    $("#edit").show()
    window.location.hash = "edit"
    $.ajax({url: apiBaseUrl + "person/id/" + id, success: function(person) {
        selectedId = id;
        $.ajax({url: apiBaseUrl + "relationship/isparent/" + id, success: function(isParent) {
                $("#editParent").hide()
                $("#editChild").hide()
                if (isParent) {
                    $("#editParent").show()
                    $("#editFirstName").val(person.firstname)
                    $("#editLastName").val(person.lastname)
                    $("#editEmail").val(person.email)
                    $("#editPhone").val(person.phone)
                    selectedEditParentId = -1;
                    initialParentId = -1;
                    editingParent = true;
                }
                else {
                    $("#editChild").show()
                    $("#editFirstName").val(person.firstname)
                    $("#editLastName").val(person.lastname)
                    $("#editBirthDate").val(person.birthday)
                    $("#editNotes").val(person.notes)
                    $.ajax({url: apiBaseUrl + "relationship/parents/id/" + id, success: function(parents) {
                        let parent = parents[0]
                        selectedEditParentId = parent.id
                        initialParentId = parent.id
                        $("#editParents").val(parent.firstname + " " + parent.lastname)
                        editingParent = false
                    }})
                }
        }})
    }})
}

$("#editParents").on("keyup", function(event) {
    $("#editFloatingWindow").empty()
    let input = $("#editParents").val();
    input = input.replace(" ", "_")
    $.ajax({
        url: getApiBaseUrl() + "person?name=" + input, success: function (persons) {
            let floatingWindow = $("#editFloatingWindow");
            floatingWindow.empty();
            persons.forEach((person) => {
                floatingWindow.append(`<button id="personButton${person.id}">${person.firstname} ${person.lastname}</button>`);
                $(`#personButton${person.id}`).on("click", function () {
                    SetEditParent(person);
                });
            });
            floatingWindow.show();
        }
    });
})

function SetEditParent(person) {
    selectedEditParentId = person.id;
    $("#editParents").val(`${person.firstname} ${person.lastname}`);
    $("#editFloatingWindow").hide();
}

$("#editParents").on("blur", function() {
    if ($("#editFloatingWindow").is(":hover") || $("#editFloatingWindow").is(":focus")) {
        return;
    }
    $("#editFloatingWindow").hide();
})

function Update() {
    let firstname = $("#editFirstName").val();
    let lastname = $("#editLastName").val();
    let email = $("#editEmail").val();
    let phone = $("#editPhone").val();
    let birthday = $("#editBirthDate").val();
    let notes = $("#editNotes").val();

    let person = new Person(firstname, lastname, birthday, notes, email, phone);
    if (editingParent) {

    }
    else {
        if (selectedEditParentId === -1) {
            return;
        }
    }
    $.ajax(
        {
            url: getApiBaseUrl() + "person/update/" + selectedId,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(person),
            success: function(response) {
                if (!editingParent && selectedEditParentId !== initialParentId) {
                    console.warn("Parent changed. Not updated.")
                    let newRelationship = new Relationship(selectedEditParentId, selectedId);
                    let oldRelationship = new Relationship(initialParentId, selectedId);
                    let updateArray = [oldRelationship, newRelationship];
                    $.ajax({
                        url: getApiBaseUrl() + "relationship/update",
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(updateArray),
                        success: function(response) {
                            window.location.href = "dashboard.html";
                        },
                        error: function(error) {
                            // Handle the error here
                            console.warn(error);
                        }
                    });
                }
                else {
                    window.location.href = "dashboard.html";
                }
            },
            error: function(error) {
                // Handle the error here
                console.warn(error);
            }
        }
    )

}

function CancelEdit() {
    $("#edit").hide();
}

function Clear() {
    $("#search").val("")
    $("#personContainer").empty().append("<p><b>Search for a name</b></p>")
}

function Back() {
    window.location.href = "dashboard.html"
}

let cachedPersonInput = ""
let selectedParent = null;
$("#parents").on("keyup", function(event) {
    let input = $("#parents").val();
    if (input === cachedPersonInput) {
        return;
    }
    cachedPersonInput = input;
    input = input.replace(" ", "_")
    $.ajax({url: getApiBaseUrl() + "person?name=" + input, success: function(persons) {
            let floatingWindow = $("#floatingWindow");
            floatingWindow.empty();
            persons.forEach((person) => {
                floatingWindow.append(`<button id="personButton${person.id}">${person.firstname} ${person.lastname}</button>`);
                $(`#personButton${person.id}`).on("click", function() {
                    SetParent(person);
                });
            });
            floatingWindow.append(`<button onclick="ShowParentCreate()">Create person</button>`)
            floatingWindow.show();
        }});
});

$("#parents").on("blur", function() {
    if ($("#floatingWindow").is(":hover") || $("#floatingWindow").is(":focus")) {
        return;
    }
    $("#floatingWindow").hide();
});

function SetParent(person) {
    selectedParent = person;
    $("#parents").val(`${person.firstname} ${person.lastname}`);
    $("#floatingWindow").hide();
}

function ShowParentCreate() {
    $("#floatingWindow").hide();
    $("#parentCreate").show();

    let currentInput = $("#parents").val();
    currentInput = currentInput.split(" ");
    $("#parentFirstname").val(currentInput[0]);
    $("#parentLastname").val(currentInput.length > 1 ? currentInput[1] : "");

    $("#parents").prop("disabled", true);
}

function UpdateParentName() {
    let firstname = $("#parentFirstname").val();
    let lastname = $("#parentLastname").val();
    $("#parents").val(`${firstname} ${lastname}`);
}

$("#parentFirstname").on("keyup", function() {
    UpdateParentName();
})

$("#parentLastname").on("keyup", function() {
    UpdateParentName();
})

function CancelParent() {
    $("#parentCreate").hide();
    $("#parents").prop("disabled", false);
}

function CreateParent() {
    let firstnameInput = $("#parentFirstname");
    let lastnameInput = $("#parentLastname");
    let emailInput = $("#parentEmail");
    let phoneInput = $("#parentPhone");

    let firstname = firstnameInput.val();
    let lastname = lastnameInput.val();
    let email = emailInput.val();
    let phone = phoneInput.val();

    firstnameInput.removeClass("redBorder");
    lastnameInput.removeClass("redBorder");
    emailInput.removeClass("redBorder");
    phoneInput.removeClass("redBorder");

    if (firstname === "") {
        firstnameInput.addClass("redBorder");
        return;
    }
    if (email === "" && phone === "") {
        emailInput.addClass("redBorder");
        phoneInput.addClass("redBorder");
        return;
    }

    let person = new Person(firstname, lastname, "", "", email, phone);

    $.ajax({
        url: getApiBaseUrl() + "person/create",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(person),
        success: function(response) {
            SetParent(response);
            $("#parentCreate").hide();
            $("#parents").prop("disabled", false);
        },
        error: function(error) {
            // Handle the error here
            console.log(error);
        }
    });
}

function CreateChild() {
    let firstnameInput = $("#firstname");
    let lastnameInput = $("#lastname");
    let birthdayInput = $("#birthdate");
    let notesInput = $("#notes");

    let firstname = firstnameInput.val();
    let lastname = lastnameInput.val();
    let birthday = birthdayInput.val();
    let notes = notesInput.val();

    console.log(birthday)

    firstnameInput.removeClass("redBorder");
    lastnameInput.removeClass("redBorder");
    birthdayInput.removeClass("redBorder");
    notesInput.removeClass("redBorder");

    if (firstname === "") {
        firstnameInput.addClass("redBorder");
        return;
    }
    if (lastname === "") {
        lastnameInput.addClass("redBorder");
        return;
    }
    if (birthday === undefined) {
        birthdayInput.addClass("redBorder");
        return;
    }
    if (selectedParent === null || selectedParent === undefined || $("#parents").val() === "") {
        $("#parents").addClass("redBorder");
        return;
    }

    let child = new Person(firstname, lastname, birthday, notes);
    let parentId = selectedParent.id;

    $.ajax({
        url: getApiBaseUrl() + "person/create",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(child),
        success: function(response) {
            console.log(response.id)
            let relationship = new Relationship(parentId, response.id);
            console.log(JSON.stringify(relationship))
            $.ajax({
                url: getApiBaseUrl() + "relationship/create",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(relationship),
                success: function(response) {
                    window.location.href = "dashboard.html";
                },
                error: function(error) {
                    // Handle the error here
                    console.log(error);
                }
            });
        },
        error: function(error) {
            // Handle the error here
            console.log(error);
        }
    });
}

function ClearCreate() {
    $("#firstname").val("")
    $("#lastname").val("")
    $("#birthdate").val("")
    $("#notes").val("")
    $("#parents").val("")
    selectedParent = null;
}