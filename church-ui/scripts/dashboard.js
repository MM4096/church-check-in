function LogOut() {
    localStorage.setItem("username", "")
    localStorage.setItem("password", "")
    window.location.href = "index.html"
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