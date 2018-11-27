function notify(message) {
    var lunaReq =
        webOS.service.request("luna://com.webos.notification",
        {
            method:"createToast",
            parameters:{
                "sourceId":"com.bullet.app",
                "message": message,
                "noaction": true,
                "persistent": false
            },
            onSuccess: function (args) {
                console.log(args);
            },
            onFailure: function (args) {
                console.log(args);
            }
        });
}

function notifyId(idname) {
    notify(document.getElementById(idname).value);
}