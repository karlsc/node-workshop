var prompt = require('prompt');

prompt.start();

prompt.get(['name', 'city'], function (err, result) {
    if(!err){
        console.log('Command-line input received:');
        console.log('  Name: ' + result.name);
        console.log('  City: ' + result.city);
        return getLocationData(result.city);
    } else {
        console.log("There was an error: " + err);
    }
});

function getLocationData(yourCity){
    
    var request = require('request');

    request("https://maps.googleapis.com/maps/api/geocode/json?address="+yourCity, function(err, res,body){
    
        if (!err) {
            var addressInfo = JSON.parse(body);
            console.log("You are from "+yourCity+" and your location is at: "+Math.floor(addressInfo.results[0].geometry.location.lat*100)/100+" x "+Math.floor(addressInfo.results[0].geometry.location.lng*100)/100);
            return getIssData(addressInfo.results[0].geometry.location.lat,addressInfo.results[0].geometry.location.lng);
        } else {
            console.log("There was an error: " + err);
        }
    });
}

function getIssData(lat1,lon1){
    
    var request = require('request');
    
    request("http://api.open-notify.org/iss-now.json", function(err, res, body) {
    
        if (!err) {
            var issInfo = JSON.parse(body);
            console.log("The ISS is now at: "+Math.floor(issInfo.iss_position.latitude*100)/100+" x "+Math.floor(issInfo.iss_position.longitude*100)/100);
            return distanceBetweenYouAndIss(lat1,lon1,issInfo.iss_position.latitude,issInfo.iss_position.longitude);
        } else {
            console.log("There was an error: " + err);
        }
    });
}

function distanceBetweenYouAndIss(lat1,lon1,lat2,lon2){
    
    var R = 6371000; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    
        console.log(d);
}