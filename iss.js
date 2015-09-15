var request = require("request");

request("http://api.open-notify.org/iss-now.json", function(err, res, body) {
    if (!err) {
        var issInfo = JSON.parse(body);
        
        console.log("The ISS is now at: "+Math.floor(issInfo.iss_position.latitude*100)/100+" x "+Math.floor(issInfo.iss_position.longitude*100)/100);
    }
    else {
        console.log("there was an error: " + err);
    }
});