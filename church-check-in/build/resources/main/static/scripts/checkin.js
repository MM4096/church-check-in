function Back() {
    window.location.href = "dashboard.html"
}

function Search() {
    let search = $("#search").val();
    search = search.replace(" ", "_")
    $.ajax({
        url: getApiBaseUrl() + "person?name=" + search, success: function (result) {
            let resultsList = $("#resultsList")
            resultsList.empty()
            if (result.length === 0) {
                resultsList.append("<p><b>No results found</b></p>")
            } else {
                $.ajax({
                    url: getApiBaseUrl() + "checkin/notcheckedout", success: function (list) {
                        let checkInAllIds = [];
                        result.forEach((obj) => {
                            let foundNotCheckedOut = false
                            list.forEach((person) => {
                                if (person.person.id === obj.id) {
                                    foundNotCheckedOut = true;
                                }
                            })

                            let buttonType = "";
                            let buttonText = "";
                            let buttonClass = "";
                            if (foundNotCheckedOut) {
                                buttonType = `CheckOut(${obj.id})`;
                                buttonText = "Check Out";
                                buttonClass = "class = 'altButton'";
                            } else {
                                buttonType = `CheckIn(${obj.id})`;
                                buttonText = "Check In";
                                checkInAllIds.push(obj.id);
                            }
                            resultsList.append(`<div class="searchResult">
                                            <p class="name"><b>${obj.firstname} ${obj.lastname}</b></p>
                                            <p class="year">Year 4</p>
                                            <button onclick="${buttonType}" ${buttonClass}>${buttonText}</button>
                                        </div>`);
                            // bar stuff
                            $("#searchBar").hide();
                            $("#resultsBar").show();
                            $("#results").val(`Search results for ${search}`)
                        })
                        if (checkInAllIds.length > 1) {
                            resultsList.append(`<button onclick="CheckInAll([${checkInAllIds}])" class="altButton">Check In All</button>`)
                        }
                    }
                })
            }
        }
    })
}


function ClearSearch() {
    $("#search").val("")
    $("#searchBar").show();
    $("#resultsBar").hide();
    $("#resultsList").empty();
}

function CheckIn(id) {
    let checkin = new CheckInRequest(id, Date.now())
    $.ajax({
        url: getApiBaseUrl() + "checkin/checkin",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(checkin),
        success: function (response) {
            Search();
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function CheckInWithoutRefresh(id) {
    let checkin = new CheckInRequest(id, Date.now())
    $.ajax({
        url: getApiBaseUrl() + "checkin/checkin",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(checkin),
        success: function (response) {
            console.log("success!")
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function CheckInAll(ids) {
    ids.forEach((id) => {
        CheckInWithoutRefresh(id);
    })
    Search();
}

function CheckOut(id) {
    let checkout = new CheckInRequest(id, null, Date.now())
    $.ajax({
        url: getApiBaseUrl() + "checkin/checkout",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(checkout),
        success: function (response) {
            Search();
        },
        error: function (error) {
            console.error(error);
        }
    });
}