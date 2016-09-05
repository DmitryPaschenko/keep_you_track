api = {

    init: function () {
        var self = api;

        self.data = {};
        self.data.apiUrl = 'http://127.0.0.1:8000/api/v1/';

        function csrfSafeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", $.cookie('csrftoken'));
                }
            }
        });
    },

    request: {
        get: function (url, onSuccess) {
            var self = api;

            $.get( self.data.apiUrl + url, function(data) {
                onSuccess(data);
            });
        },

        post: function (url, data, onSuccess) {
            var self = api;

            $.ajax({
                type: "POST",
                url: self.data.apiUrl + url,
                data: data,
                success: onSuccess
            });
        },

        put: function (url, data, onSuccess) {
            var self = api;

            $.ajax({
                type: "PUT",
                url: self.data.apiUrl + url,
                data: data,
                success: onSuccess
            });
        },

        remove: function (url, data, onSuccess) {
            var self = api;

            $.ajax({
                type: "DELETE",
                url: self.data.apiUrl + url,
                data: data,
                success: onSuccess
            });
        },
    },


};
