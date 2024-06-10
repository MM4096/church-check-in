function Search() {
    let search = $("#search").val();
    search = search.replace(" ", "_")
    $.ajax({url: getApiBaseUrl() + "person/" + search, success: function(result)
    {
        let resultList = $("#resultsList")
        resultList.empty()
        if (result.length === 0) {
            resultList.append("<p><b>No results found</b></p>")
            return;
        }
        result.forEach(person => {
            let name = person.firstname + " " + person.lastname
            let searchId = person.id;


            // TODO: loop over all persons returned by function above
            $.ajax({
                url: getApiBaseUrl() + "relationship/parents/id/" + searchId, success: function (parents) {
                    let tag = ""
                    if (parents.length === 0) {
                        // parent
                        // region data
                        console.log("Here!")
                        tag = `<div class="searchResult" id="searchResult${person.id}">
                        <img src="images/arrow.png" alt="expand" class="rotate expand" onclick="Expand(${person.id})">
                            <p class="name"><b>${person.firstname} ${person.lastname}</b></p>
                            <br>
                                <div class="personData noHeight">
                                    <div class="dataItem" style="display: none">
                                        <p class="dataLabel">Name </p>
                                        <label>
                                            <input class="data nameInput" value="${person.firstname} ${person.lastname}">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Phone Number </p>
                                        <label>
                                            <input class="data phone" value="${person.phone}">
                                        </label>
                                    </div>
                                    <button onclick="Save(${person.id}, true)" class="saveButton">Save</button>
                                </div>
                            </div>`
                        // endregion
                    } else {
                        // region data
                        tag = `<div class="searchResult" id="searchResult${person.id}">
                        <img src="images/arrow.png" alt="expand" class="rotate expand" onclick="Expand(${person.id})">
                            <p class="name"><b>${person.firstname} ${person.lastname}</b></p>
                            <br>
                                <div class="personData noHeight">
                                    <div class="dataItem" style="display: none">
                                        <p class="dataLabel">Name </p>
                                        <label>
                                            <input class="data nameInput" value="${person.firstname} ${person.lastname}">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none">
                                        <p class="dataLabel">Birthday </p>
                                        <label>
                                            <input class="data dateInput" type="date" value="${person.birthday}">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Parent 1 </p>
                                        <label>
                                            <input class="data parent1input" value="${parents[0].firstname} ${parents[0].lastname}" data-parentid="${parents[0].id}">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Phone Number </p>
                                        <label>
                                            <input class="data parent1contact" value="${parents[0].phone}" data-parentid="${parents[0].id}" disabled="disabled">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Parent 2 </p>
                                        <label>
                                            <input class="data parent2input" value="${parents.length > 1 ? parents[1].firstname + ' ' + parents[1].lastname : ''}" data-parentid="${parents.length > 1 ? parents[1].id : -1}">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Phone Number </p>
                                        <label>
                                            <input class="data parent2contact" value="${parents.length > 1 ? parents[1].phone : ''}" data-parentid="${parents.length > 1 ? parents[1].id : -1}" disabled="disabled">
                                        </label>
                                    </div>

                                    <button onclick="Save(${person.id}, false)" class="saveButton">Save</button>
                                </div>

                    </div>`
                        // endregion
                    }
                    resultList.append(tag);
                    resultList.children().each(function() {
                        let nameInput = $(this).find(".nameInput");
                        let nameDisplay = $(this).find(".name");

                        nameInput.on("keyup", function() {
                            nameDisplay.text(nameInput.val());
                            nameDisplay.css("font-weight", "bold");
                        });
                    })
                }
            })
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

// $("#editParents").on("keyup", function(event) {
//     $("#editFloatingWindow").empty()
//     let input = $("#editParents").val();
//     input = input.replace(" ", "_")
//     $.ajax({
//         url: getApiBaseUrl() + "person?name=" + input, success: function (persons) {
//             let floatingWindow = $("#editFloatingWindow");
//             floatingWindow.empty();
//             persons.forEach((person) => {
//                 floatingWindow.append(`<button id="personButton${person.id}">${person.firstname} ${person.lastname}</button>`);
//                 $(`#personButton${person.id}`).on("click", function () {
//                     SetEditParent(person);
//                 });
//             });
//             floatingWindow.show();
//         }
//     });
// })

function SetEditParent(person) {
    selectedEditParentId = person.id;
    $("#editParents").val(`${person.firstname} ${person.lastname}`);
    $("#editFloatingWindow").hide();
}

// $("#editParents").on("blur", function() {
//     if ($("#editFloatingWindow").is(":hover") || $("#editFloatingWindow").is(":focus")) {
//         return;
//     }
//     $("#editFloatingWindow").hide();
// })

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

function Expand(index) {
    let parent = $("#searchResult" + index);
    let button = parent.children("img").first();
    button.attr("onclick", "Shrink(" + index + ")");
    button.removeClass("rotate")

    let dataSection = parent.children(".personData");
    dataSection.removeClass("noHeight");
    dataSection.children().show();

    // shrink everything else
    let searchResults = $("#resultsList");
    searchResults.children().each(function() {
        if ($(this).attr("id") !== `searchResult${index}`) {
            let id = $(this).attr("id").replace("searchResult", "");
            Shrink(id);
        }
    })

}

function Shrink(index) {
    let parent = $("#searchResult" + index);
    let button = parent.children("img").first();
    button.attr("onclick", `Expand(${index})`);
    button.addClass("rotate");

    let dataSection = parent.children(".personData");
    dataSection.addClass("noHeight");
    dataSection.children().hide();
}

function Save(index, isParent) {
    console.log("here")
    let objectParent = $("#searchResult" + index);
    let nameInput = objectParent.find(".nameInput");

    let splitName = nameInput.val().split(" ");
    if (splitName.length < 2) {
        // throw an error somehow
        console.error("Name must have at least two parts")
        return;
    }

    let person = new Person(splitName[0], splitName[1]);
    if (isParent) {
        let phoneInput = objectParent.find(".phone");
        person.phone = phoneInput.val();
        // update parent
        $.ajax({
            url: getApiBaseUrl() + "person/update/" + index,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(person),
            success: function(response) {
                // updated parent
                // ALL OPERATIONS COMPLETED
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    else {
        let birthdayInput = objectParent.find(".dateInput");

        let parent1Input = objectParent.find(".parent1input");
        let parent1Contact = objectParent.find(".parent1contact");
        let parent1id = parent1Input.attr("data-parentid");
        let parent1 = new Person(parent1Input.val().split(" ")[0], parent1Input.val().split(" ")[1]);
        parent1.phone = parent1Contact.val();

        let parent2Input = objectParent.find(".parent2input");
        let parent2Contact = objectParent.find(".parent2contact");
        let parent2id = parent2Input.attr("data-parentid");
        let parent2 = new Person(parent2Input.val().split(" ")[0], parent2Input.val().split(" ")[1]);
        parent2.phone = parent2Contact.val();

        person.birthday = birthdayInput.val();

        if (parent2id === -1) {
            // parent doesn't yet exist, create parent 2
            $.ajax({
                url: getApiBaseUrl() + "person/create",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(parent2),
                success: function(response) {
                    parent2id = response.id;
                    let relationship = new Relationship(parent2id, index);
                    $.ajax({
                        url: getApiBaseUrl() + "relationship/create",
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(relationship),
                        success: function(response) {
                            // created parent & added relationship
                        },
                        error: function(error) {
                            console.error(error);
                        }
                    });
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }
        else {
            // update parent 1, 2 and child
            UpdatePerson(parent1, parent1id);
            UpdatePerson(parent2, parent2id);
            UpdatePerson(person, index);
        }
    }
}

function UpdatePerson(person, personId) {
    $.ajax({
        url: getApiBaseUrl() + "person/update/" + personId,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(person),
        success: function(response) {
            // updated child
        },
        error: function(error) {
            console.error(error);
        }
    });
}

function showDropdown(index, whichDropdown) {
    let parent = $("#searchResult" + index);
    parent.find(".parentDropdownContent").eq(whichDropdown).show();
}

function hideDropdown(index, whichDropdown) {
    let parent = $("#searchResult" + index);
    let dropdown = parent.find(".parentDropdownContent").eq(whichDropdown);
    let hasFocus = dropdown.find(":focus").length > 0
    // console.log($(document).find(":focus"))
    if (!hasFocus) {
        // dropdown.delay(2000).hide();
    }
}

function setParent(personIndex, whichParent, parentId) {
    console.log("Setting parent!")
    let parent = $("#searchResult" + personIndex);
    let parentInput = parent.find(".parent" + whichParent + "input");
    let parentContact = parent.find(".parent" + whichParent + "contact");
    parentInput.val(parentId);
    parentContact.val(parentId);
    parentInput.attr("data-parentid", parentId);
}