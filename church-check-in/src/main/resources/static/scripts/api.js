const baseUrl = 'http://localhost:8081/';
const apiBaseUrl = baseUrl + 'api/v1/';

function getApiBaseUrl() {
  return apiBaseUrl;
}

function getBaseUrl() {
    return baseUrl;
}

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    let request = settings.url
    let status = jqxhr.status
    if (status === 401) {
        if (!request.includes(getBaseUrl() + 'user/')) {
            window.location.href = "index.html"
        }
    }
    else if (status === 403) {
        alert("You do not have permission to access this resource")
    }
    else if (status === 404) {
        alert("Resource not found")
    }
    else {
        alert("An error occurred (status code " + status + ")")
    }
})

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
})