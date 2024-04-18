function Back() {
    window.location.href = "dashboard.html"
}

function Search() {
    let search = $("#search").val();
    search = search.replace(" ", "_")
    $.ajax({url: getApiBaseUrl() + "person?name=" + search, success: function(result)
        {
            let personContainer = $("#personContainer")
            personContainer.empty()
            if (result.length === 0) {
                personContainer.append("<p><b>No results found</b></p>")
            }
            else {
                $.ajax({url: getApiBaseUrl() + "checkin/notcheckedout", success: function(list) {
                    result.forEach((obj) => {
                        let foundNotCheckedOut = false
                        list.forEach((person) => {
                            if (person.person.id === obj.id) {
                                foundNotCheckedOut = true;
                            }
                        })

                        let buttonType = "";
                        let buttonText = "";
                        if (foundNotCheckedOut) {
                            buttonType = `CheckOut(${obj.id})`
                            buttonText = "Check Out"
                        }
                        else {
                            buttonType = `CheckIn(${obj.id})`
                            buttonText = "Check In"
                        }
                        personContainer.append(`<div class="border margin checkInContainer"><p><b>${obj.firstname} ${obj.lastname}</b></p><button onclick="${buttonType}">${buttonText}</button></div>`)
                    })
                }})
            }
        }
    })
}


function Clear() {
    $("#search").val("")
    $("#personContainer").empty().append("<p><b>Start searching</b></p>")
}

function CheckIn(id) {
    let checkin = new CheckInRequest(id, Date.now())
    $.ajax({
        url: getApiBaseUrl() + "checkin/checkin",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(checkin),
        success: function(response) {
            Search();
        },
        error: function(error) {
            console.error(error);
        }
    });
}

function CheckOut(id) {
    let checkout = new CheckInRequest(id, null, Date.now())
    $.ajax({
        url: getApiBaseUrl() + "checkin/checkout",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(checkout),
        success: function(response) {
            Search();
        },
        error: function(error) {
            console.error(error);
        }
    });
}