const apiBaseUrl = 'http://localhost:8081/api/v1/';

function getApiBaseUrl() {
  return apiBaseUrl;
}

function getPersons() {
    $.ajax({url: apiBaseUrl + 'persons', success: function(result)
        {
        return result;
        }
    })
}