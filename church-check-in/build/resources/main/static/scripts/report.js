$(document).ready(function() {
    change_search_type()
})


function Menu() {
    window.location.href = "dashboard.html"
}

function GenerateReport() {
    let dateSelected = $("#searchBegin").val().split("/").join("-");
    if (dateSelected === "") {
        $("#searchBegin").addClass("redBorder")
        return;
    }

    let dateEndSelected = $("#searchEnd").val().split("/").join("-");
    if (!is_search_type_single() && dateEndSelected === "") {
        $("#searchEnd").addClass("redBorder")
        return;
    }

    let reportTableSingle = $("#reportTableSingle")
    reportTableSingle.empty();

    let reportTableRange = $("#reportTableRange")
    reportTableRange.empty();

    $("#searchBegin").removeClass("redBorder")
    if (is_search_type_single()) {
        $.ajax({url: getApiBaseUrl() + "checkin/date/" + dateSelected, success: function(result) {
                if (result.length === 0) {
                    reportTableSingle.append(`<tr><th class="noBorder centerAlign">No results found for ${dateSelected.split("-").reverse().join("/")}</th></tr>`)
                    return;
                }
                reportTableSingle.append(`<tr><th colSpan="3" class="centerAlign">Report for ${dateSelected}</th></tr>`)
                reportTableSingle.append("<tr><th>Name</th><th>Check in time</th><th>Check out time</th></tr>")
                result.forEach((item) => {
                    let checkInTime = new Date(item.checkInTime)
                    let checkOutTime = new Date(item.checkOutTime)
                    let twoDigitCheckInTimeMinutes = checkInTime.getMinutes() < 10 ? `0${checkInTime.getMinutes()}` : checkInTime.getMinutes()
                    let twoDigitCheckOutTimeMinutes = checkOutTime.getMinutes() < 10 ? `0${checkOutTime.getMinutes()}` : checkOutTime.getMinutes()
                    let checkInTimeString = `${checkInTime.getHours()}:${twoDigitCheckInTimeMinutes}`
                    let checkOutTimeString = `${checkOutTime.getHours()}:${twoDigitCheckOutTimeMinutes}`
                    reportTableSingle.append(`<tr><td>${item.person.firstname} ${item.person.lastname}</td><td>${checkInTimeString}</td><td>${checkOutTimeString}</td></tr>`)
                })
                reportTableSingle.append(`<tr><th colspan="3" class="centerAlign">Total: ${result.length}</th></tr>`)
            }
        })
    }
    else {
        console.log("Multiple Range!")
        $.ajax({
            url: getApiBaseUrl() + "checkin/date/range/" + dateSelected + "/" + dateEndSelected,
            success: function (result) {
                console.log(result)
                if (result.length === 0) {
                    reportTableRange.append(`<tr><th class="noBorder centerAlign">No results found for ${dateSelected.split("-").reverse().join("/")} - ${dateEndSelected.split("-").reverse().join("/")}</th></tr>`)
                    return;
                }

                let dateCheckins = []
                let personArray = []
                result.forEach((object) => {
                    let person = object.person
                    let personName = `${person.firstname} ${person.lastname}`

                    let foundName = false
                    personArray.forEach(person => {
                        if (person === personName) {
                            foundName = true
                        }
                    })
                    if (!foundName) {
                        personArray.push(personName)
                    }


                    let date = object.checkInTime.split("T")[0]
                    // check if dateCheckins contains this date
                    let foundMatch = false
                    dateCheckins.forEach(dateObj => {
                        if (dateObj.date === date) {
                            dateObj.people.push(personName)
                            foundMatch = true
                        }
                    })
                    if (!foundMatch) {
                        dateCheckins.push({date: date, people: [personName]})
                    }
                })
                // updated checkin list, now sort by date
                dateCheckins.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date)
                })
                personArray.sort()

                let dateArray = []
                dateCheckins.forEach(date => {
                    dateArray.push(date.date)
                })

                let checkInArray = []
                personArray.forEach(person => {
                    let thisList = []
                    dateCheckins.forEach(date => {
                        let foundMatch = false
                        date.people.forEach(search => {
                            if (person === search) {
                                foundMatch = true
                            }
                        })
                        thisList.push(foundMatch)
                    })
                    checkInArray.push(thisList)
                })

                console.log(dateCheckins)
                console.log(personArray)
                console.log(dateArray)
                console.log(checkInArray)
                let this_row = `<tr><th></th>`
                dateArray.forEach(date => {
                    let this_date = new Date(date)
                    this_row += (`<th>${this_date.toLocaleString('default', {month: 'long'})} ${this_date.getDate()}</th>`)
                })
                this_row += "</tr>"
                reportTableRange.append(this_row)

                for (let i = 0; i < checkInArray.length; i++) {
                    let this_row = `<tr><td>${personArray[i]}</td>`
                    for (let j = 0; j < checkInArray[i].length; j++) {
                        this_row += `<td class="${checkInArray[i][j] ? "grey": "white"} textOnHover">${checkInArray[i][j] ? "Present" : "Absent"}</td>`
                    }
                    this_row += "</tr>"
                    reportTableRange.append(this_row)
                }
            }
        })
    }
}

function change_search_type() {
    $("#reportTableRange").hide()
    $("#reportTableSingle").hide()
    if ($("#searchType").val() === "single") {
        $("#labelSearchBegin").text("Date")

        $("#searchBegin").removeClass("halfInput").css("width", "20%")
        $("#labelSearchEnd").hide()
        $("#searchEnd").hide()

        $("#reportTableSingle").show()
    } else {
        $("#labelSearchBegin").text("Begin Date")
        $("#labelSearchEnd").text("End Date")

        $("#searchBegin").addClass("halfInput")
        $("#labelSearchEnd").show()
        $("#searchEnd").show()

        $("#reportTableRange").show()
    }
}

function is_search_type_single() {
    return $("#searchType").val() === "single"
}