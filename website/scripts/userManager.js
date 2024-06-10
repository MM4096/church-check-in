function Search() {
    let search = $("#search").val();
    $("#resultsBar").show();
    $("#searchBar").hide();
    $("#results").val("Search Results for: " + search)
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
                                    
                                    <div class="dataItem" style="display: none">
                                        <p class="dataLabel">Notes </p>
                                        <label>
                                            <input class="data notesInput" value="${person.notes}">
                                        </label>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Parent 1 </p>
                                        <div class="parentDropdown data">
                                            <label>
                                                <input class="parent1input" onfocus="showDropdown(${person.id}, 0)" onblur="hideDropdown(${person.id}, 0)" onkeyup="searchParent(${person.id}, 0)" value="${parents[0].firstname} ${parents[0].lastname}" data-parentid="${parents[0].id}" data-prevparentid="${parents[0].id}">
                                            </label>
                                            <div class="parentDropdownContent">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Phone Number </p>
                                        <label>
                                            <input class="data parent1contact" value="${parents[0].phone}" data-parentid="${parents[0].id}" disabled="disabled">
                                        </label>
                                    </div>
                                    
                                    <div class="dataItem" style="display: none;">
                                        <p class="dataLabel">Parent 2 </p>
                                        <div class="parentDropdown data">
                                            <label>
                                                <input class="parent2input" onfocus="showDropdown(${person.id}, 1)" onblur="hideDropdown(${person.id}, 1)" onkeyup="searchParent(${person.id}, 1)" value="${parents.length > 1 ? parents[1].firstname + ' ' + parents[1].lastname : ''}" data-parentid="${parents.length > 1 ? parents[1].id : -1}" data-prevparentid="${parents.length > 1 ? parents[1].id : -1}">
                                            </label>
                                            <div class="parentDropdownContent">
                                            </div>
                                        </div>
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

function clearSearch() {
    $("#resultsBar").hide();
    $("#searchBar").show();
    $("#resultsList").empty();
    $("#search").val("");
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
    let parent;
    if (index !== -1) {
        parent = $("#searchResult" + index);
    }
    else {
        parent = $("#createPerson")
    }
    let button = parent.children("img").first();
    button.attr("onclick", "Shrink(" + index + ")");
    button.removeClass("rotate")

    let dataSection = parent.children(".personData");
    dataSection.removeClass("noHeight");
    dataSection.children().show();

    if (index === -1) {
        setOptions();
    }

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
    let parent;
    if (index !== -1) {
        parent = $("#searchResult" + index);
    }
    else {
        parent = $("#createPerson")
    }
    let button = parent.children("img").first();
    button.attr("onclick", `Expand(${index})`);
    button.addClass("rotate");

    let dataSection = parent.children(".personData");
    dataSection.addClass("noHeight");
    dataSection.children().hide();
}

function Save(index, isParent) {
    let objectParent;
    if (index == -1) {
        objectParent = $("#createPerson");
    }
    else {
        objectParent = $("#searchResult" + index);
    }
    let nameInput = objectParent.find(".nameInput");

    let splitName = nameInput.val().split(" ");
    if (splitName.length < 2) {
        // throw an error somehow
        console.error("Name must have at least two parts")
        return;
    }

    console.log(`parent type is a ${typeof isParent}, value is ${isParent}`)

    if (isParent === undefined) {
        console.warn("isParent is undefined. not continuing.")
        return
    }

    let person = new Person(splitName[0], splitName[1]);
    if (isParent) {
        console.log("is parent")
        let phoneInput = objectParent.find(".phone");
        person.phone = phoneInput.val();
        if (index == -1) {
            person.phone = objectParent.find(".contact").val()
            CreatePerson(person);
        }
        else {
            // update parent
            $.ajax({
                url: getApiBaseUrl() + "person/update/" + index,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(person),
                success: function(response) {
                    // updated parent
                    // ALL OPERATIONS COMPLETED
                    console.log("Success!")
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }
    }
    else {
        let birthdayInput = objectParent.find(".dateInput");
        let notesInput = objectParent.find(".notesInput");

        let parent1Input = objectParent.find(".parent1input");
        let parent1Contact = objectParent.find(".parent1contact");
        let parent1id = parent1Input.attr("data-parentid");
        let prevparent1id = parent1Input.attr("data-prevparentid");
        let parent1 = new Person(parent1Input.val().split(" ")[0], parent1Input.val().split(" ")[1]);
        parent1.phone = parent1Contact.val();

        let parent2Input = objectParent.find(".parent2input");
        let parent2Contact = objectParent.find(".parent2contact");
        let parent2id = parent2Input.attr("data-parentid");
        let prevparent2id = parent2Input.attr("data-prevparentid");
        let parent2 = new Person(parent2Input.val().split(" ")[0], parent2Input.val().split(" ")[1]);
        parent2.phone = parent2Contact.val();

        person.birthday = birthdayInput.val();
        person.notes = notesInput.val();

        if (index == -1) {
            CreatePerson(person, function() {AfterChildCreate(parent1id, prevparent1id, parent2id, prevparent2id, parent2Input, person, index, true);});
        }
        else {
            AfterChildCreate(parent1id, prevparent1id, parent2id, prevparent2id, parent2Input, person, index);
        }
    }
}

function AfterChildCreate(parent1id, prevparent1id, parent2id, prevparent2id, parent2Input, person, index, forceCreateParent = false) {

    // since parents cannot be updated, update relationships instead

    // parent 1 changed, update relationship to new parent 1
    if (forceCreateParent || parent1id != prevparent1id) {
        let relationship = new Relationship(prevparent1id, index);
        let newRelationship = new Relationship(parent1id, index);
        $.ajax({
            url: getApiBaseUrl() + "relationship/update",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify([relationship, newRelationship]),
            success: function(response) {
                // updated parent
            },
            error: function(error) {
                console.error(error);
            }
        });
    }
    // parent 2 changed, update relationship to new parent 2
    if (forceCreateParent || parent2id != prevparent2id) {
        if (prevparent2id == -1) {
            // relationship doesn't exist yet
            let newRelationship = new Relationship(parent2id, index);
            $.ajax({
                url: getApiBaseUrl() + "relationship/create",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newRelationship),
                success: function(response) {
                    // created parent & added relationship
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }
        else {
            let relationship = new Relationship(prevparent2id, index);
            let newRelationship = new Relationship(parent2id, index);
            $.ajax({
                url: getApiBaseUrl() + "relationship/update",
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify([relationship, newRelationship]),
                success: function(response) {
                    // updated parent
                },
                error: function(error) {
                    console.error(error);
                }
            });
        }
    }
    // parent 2 changed, parent doesn't exist yet
    else if (parent2id === -1 && parent2Input.val() !== "") {
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

    // update child
    UpdatePerson(person, index);
}

function UpdatePerson(person, personId, onSuccess = function(){console.log("Success!")}) {
    $.ajax({
        url: getApiBaseUrl() + "person/update/" + personId,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(person),
        success: function() {
            onSuccess();
        },
        error: function(error) {
            console.error(error);
        }
    });
}

function CreatePerson(person, onSuccess = function(){console.log("Success!")}) {
    $.ajax({
        url: getApiBaseUrl() + "person/create",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(person),
        success: function() {
            onSuccess();
        },
        error: function(error) {
            console.error(error);
        }
    });

}

function showDropdown(index, whichDropdown) {
    let parent;
    if (index === -1) {
        parent = $("#createPerson")
    }
    else {
        parent = $("#searchResult" + index);
    }
    parent.find(".parentDropdownContent").eq(whichDropdown).show();
}

function hideDropdown(index, whichDropdown) {
    let parent;
    if (index === -1) {
        parent = $("#createPerson")
    }
    else {
        parent = $("#searchResult" + index);
    }
    let dropdown = parent.find(".parentDropdownContent").eq(whichDropdown);
    let hasFocus = dropdown.find(":focus").length > 0
    // console.log($(document).find(":focus"))
    if (!hasFocus) {
        dropdown.delay(200).hide(0);
    }
}

function setParent(personIndex, whichParent, parentId) {
    console.log("Setting parent!")
    whichParent++;
    let parent;
    if (personIndex === -1) {
        parent = $("#createPerson")
    }
    else {
        parent = $("#searchResult" + index);
    }
    let parentInput = parent.find(".parent" + whichParent + "input");
    let parentContact = parent.find(".parent" + whichParent + "contact");
    if (parentId < 0) {
        parentInput.val("");
        parentContact.val("");
    }
    else {
        $.ajax({
            url: getApiBaseUrl() + "person/id/" + parentId, success: function(person) {
                parentInput.val(person.firstname + " " + person.lastname);
                parentContact.val(person.phone);
            }
        })
    }
    parentInput.attr("data-parentid", parentId);
}

function searchParent(personIndex, whichDropdown) {
    let parent;
    if (personIndex === -1) {
        parent = $("#createPerson")
    }
    else {
        parent = $("#searchResult" + personIndex);
    }
    let parentInput = parent.find(".parent" + (whichDropdown + 1) + "input");
    let parentName = parentInput.val();
    let dropdown = parent.find(".parentDropdownContent").eq(whichDropdown);
    parentName = parentName.replace(" ", "_")
    if (parentName.length < 3) {
        dropdown.empty();
        dropdown.append(`<button onclick="setParent(${personIndex}, ${whichDropdown}, -1)" class="altButton">Clear Field</button>`)
        return;
    }
    $.ajax({
        url: getApiBaseUrl() + "person?name=" + parentName, success: function(persons) {
            dropdown.empty();
            persons.forEach((person) => {
                dropdown.append(`<button id="personButton${person.id}" onclick="setParent(${personIndex}, ${whichDropdown}, ${person.id})">${person.firstname} ${person.lastname}</button>`);
            });
            dropdown.append(`<button onclick="setParent(${personIndex}, ${whichDropdown}, -1)" class="altButton">Clear Field</button>`)
            dropdown.show();
        }
    });
}

function setOptions() {
    let selectedOption = $("#personType").find(":selected").attr("value");
    let parentSection = $("#parentSection");
    let childSection = $("#childSection");
    let saveButton = $("#createPerson").find(".saveButton");
    console.log(saveButton.length)

    parentSection.hide();
    childSection.hide();

    if (selectedOption === "parent") {
        console.log("Parent")
        parentSection.show();
        saveButton.off("click")
        saveButton.on("click", function() {
            Save(-1, true);
        })
    }
    else if (selectedOption === "child") {
        console.log("Child")
        childSection.show();
        saveButton.off("click")
        saveButton.on("click", function() {
            Save(-1, false);
        })
    }
}