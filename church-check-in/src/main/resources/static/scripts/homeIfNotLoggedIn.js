$(document).ready(function() {
    console.log("ready")
    $.ajax( {
        url: getBaseUrl() + 'user/check_token',
        type: 'GET',
        success: function(result) {
            console.log(result)
            if (result === false) {
                window.location.href = "index.html"
            }
        },
    })
})