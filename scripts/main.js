const x = document.getElementById("demo");
    
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 1000; // Distance in km
    return d;
    }

function deg2rad(deg) {
    return deg * (Math.PI/180)
    }

function getLocation(callback_func, target_lat, target_long) {
    
    function func(callback_func) {
        callback_func(target_lat, target_long);
    }
    
    if (navigator.geolocation) {
    navigator.geolocation.watchPosition(func);
    } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + "<br>Distance from altona: " + getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, -37.78007, 144.76596);
}


function checkPosition(position, target_lat, target_long) {
    distance = getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, target_lat, target_long)

    if ((distance < 5) && (distance > -5)){
        document.getElementById("nextpage").style.display = "inline-block";
    }
    else {
        document.getElementById("distance_text").textContent="<br>Distance from location: " + distance + " meters";
    }
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude + "<br>Distance from altona: " + getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, -37.78007, 144.76596);
}