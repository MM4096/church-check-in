function Login() {
    let username = $("#username").val();
    let password = $("#password").val();
    localStorage.setItem("username", username)
    localStorage.setItem("password", password)
    if (username === "admin" && password === "admin") {
        $("#username").removeClass("redBorder")
        $("#password").removeClass("redBorder")
        window.location.href = "dashboard.html"
    } else {
        $("#username").addClass("redBorder")
        $("#password").addClass("redBorder")
    }
}