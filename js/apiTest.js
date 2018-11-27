const baseURL = "https://api.pushbullet.com/v2/";
const userURL = baseURL + "chats";
const deviceURL = baseURL + "devices";
const pushURL = baseURL + "pushes";
var tok;

function makeRequest(method, url, parameters) {
    var req = new XMLHttpRequest();

    req.open(method, url, true);
    req.setRequestHeader("Access-Token", tok);
    switch(url) {
        case userURL:
            req.onload = function() {
                var userList = JSON.parse(req.responseText).chats;
                if(req.readyState == 4 && req.status == "200") {
                    for(var i = 0; i < userList.length; i++)
                        document.getElementById("userL").innerHTML += userList[i].with.name + "<br>";
                }
                else {
                    console.error(userList);
                }
            }
            break;
        case deviceURL:
            req.onload = function() {
                var deviceList = JSON.parse(req.responseText).devices;
                if(req.readyState == 4 && req.status == "200") {
                    for(var i = 0; i < deviceList.length; i++)
                        document.getElementById("deviceL").innerHTML += deviceList[i].nickname + "<br>";
                }
                else {
                    console.error(deviceList);
                }
            }
            break;
        case pushURL:
            req.onload = function() {
                var pushList = JSON.parse(req.responseText).pushes;
                if(req.readyState == 4 && req.status == "200") {
                    for(var i = 0; i < pushList.length; i++)
                        document.getElementById("pushL").innerHTML += pushList[i].body + "<br>";
                }
                else {
                    console.error(pushList);
                }
            }
            break;
        req.send();
    }
}

function fillCont() {
    var cont = PushBullet.contacts();
    console.log(cont);
    for(var i = 0; i < cont.contacts.length; i++)
        document.getElementById("cont").innerHTML += cont.contacts[i].name + "<br>";
}

function fillHist() {
    var hist = PushBullet.pushHistory();
    for(var i = 0; i < hist.pushes.length; i++)
        document.getElementById("hist").innerHTML += hist.pushes[i].body + "<br>";
}

function tokenEnter() {
    tok = document.getElementById("token").value.toString();
    makeRequest("GET", userURL, null);
    makeRequest("GET", deviceURL, null);
    makeRequest("GET", pushURL, null);
}

