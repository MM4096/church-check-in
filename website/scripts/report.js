function Menu() {
    window.location.href = "dashboard.html"
}

function GenerateReport() {
    let dateSelected = $("#search").val().split("/").join("-");
    if (dateSelected === "") {
        $("#search").addClass("redBorder")
        return;
    }
    $("#search").removeClass("redBorder")
    $.ajax({url: getApiBaseUrl() + "checkin/date/" + dateSelected, success: function(result) {
            let reportTable = $("#reportTable")
            reportTable.empty();
            if (result.length === 0) {
                reportTable.append(`<tr><th class="noBorder centerAlign">No results found for ${dateSelected.split("-").reverse().join("/")}</th></tr>`)
                return;
            }
            reportTable.append(`<tr><th colSpan="3" class="centerAlign">Report for ${dateSelected}</th></tr>`)
            reportTable.append("<tr><th>Name</th><th>Check in time</th><th>Check out time</th></tr>")
            result.forEach((item) => {
                let checkInTime = new Date(item.checkInTime)
                let checkOutTime = new Date(item.checkOutTime)
                let twoDigitCheckInTimeMinutes = checkInTime.getMinutes() < 10 ? `0${checkInTime.getMinutes()}` : checkInTime.getMinutes()
                let twoDigitCheckOutTimeMinutes = checkOutTime.getMinutes() < 10 ? `0${checkOutTime.getMinutes()}` : checkOutTime.getMinutes()
                let checkInTimeString = `${checkInTime.getHours()}:${twoDigitCheckInTimeMinutes}`
                let checkOutTimeString = `${checkOutTime.getHours()}:${twoDigitCheckOutTimeMinutes}`
                reportTable.append(`<tr><td>${item.person.firstname} ${item.person.lastname}</td><td>${checkInTimeString}</td><td>${checkOutTimeString}</td></tr>`)
            })
            reportTable.append(`<tr><th colspan="3" class="centerAlign">Total: ${result.length}</th></tr>`)
        }
    })
}