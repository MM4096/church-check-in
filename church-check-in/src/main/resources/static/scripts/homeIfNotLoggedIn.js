$(function() {
    if (localStorage.getItem("username") !== "admin" || localStorage.getItem("password") !== "admin") {
        window.location.href = "index.html"
    }
})