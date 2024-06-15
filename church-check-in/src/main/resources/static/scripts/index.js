$(document).ready(function() {
    $.ajax({
        url: getBaseUrl() + "user/check_token",
        type: "GET",
        contentType: 'application/json',
        success: function(result) {
            window.location.href = "dashboard.html"
        }
    })
})


function Login() {
    let usernameInput = $("#username");
    let passwordInput = $("#password");
    let username = usernameInput.val();
    let password = passwordInput.val();
    $.ajax({
        url: getBaseUrl() + `user/authenticate?username=${username}&password=${password}`,
        type: 'GET',
        contentType: 'application/json',
        success: function(result) {
            console.log(result)
            if (result === false) {
                usernameInput.addClass("redBorder")
                passwordInput.addClass("redBorder")
            }
            else {
                console.log("Success!")
                window.location.href = "dashboard.html"
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 401) {
                usernameInput.addClass("redBorder")
                passwordInput.addClass("redBorder")
            }
        }
    })
}