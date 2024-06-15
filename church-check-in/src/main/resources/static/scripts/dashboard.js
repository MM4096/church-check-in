function LogOut() {
    $.ajax({
        url: getBaseUrl() + 'user/logout',
        type: 'GET',
        success: function (result) {
            console.log(result)
            window.location.href = "index.html"
        },
    })
}

function CheckIn() {
    window.location.href = "checkin.html"
}

function UserManager() {
    window.location.href = "userManager.html"
}

function Reports() {
    window.location.href = "report.html"
}

function checkToken() {
    $.ajax({
        url: getBaseUrl() + 'user/check_token',
        type: 'GET',
        success: function (result) {
            console.log(result)
        },
    })
}