//I made a function to load ajax calls, so we can call the function on page load -SB

//edit:  put this in it's own .js file so it doesn't break other pages -SB
function load_ajax() {
   // Logic for sports quote API
    var queryURL = "https://quotes.rest/qod.json?category=sports"
        // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
            // Storing an array of results in the results variable
            var results = response.contents;
            // Get the quote data from the object
            var data = results.quotes[0];

            // Check the object returned
            console.log(data);


            // Creating a div with the class "item"
            var quoteDiv = $("<div class='item'>");

            // Storing the result item's rating
            var quote = data.quote;
            var author = data.author;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p id='quote-item'>").text(quote + " - " + author);


            // Appending the paragraph we created 
            quoteDiv.append(p);


            // Prepending the quoteDiv to the display
            $("#quote-display").prepend(quoteDiv);

        });


    //adding ajax code to get location from IP address -SB
    //also now pulling latitude/longitude to pass it to DarkSky (weather) -SB
     document.getElementById("map_canvas1").innerHTML='<object width="300" height="250" type="text/html" data="weather.html" ></object>';
    //ajax call for weather -SB
    $.ajax({
        url: 'https://freegeoip.net/json/',
        method: 'GET'
    }).done(function(location) {
        usersZipCode = location.zip_code;
        usersCity = location.city;
        usersState = location.region_code;
        usersLongitude = location.longitude;
        usersLatitude = location.latitude;

    $.ajax({
            url: "https://crossorigin.me/https://api.darksky.net/forecast/" + "8c7c81eec838047ee423275f144c553b" + "/" + usersLatitude + "," + usersLongitude,
            method: "GET"
        })
        .done(function(response) {
            //storing chance of rain to use elsewhere -SB
            usersChanceOfRain = response.currently.precipProbability * 100;
            $("#weatherdetails").append("<h4>Current Weather In<br> " + usersCity + ", " + usersState + "</h1>");
            $("#weatherdetails").append("Conditions: " + response.currently.summary + "<br>");
            $("#weatherdetails").append("Temperature: " + Math.round(response.currently.temperature) + "°F<br>");
            $("#weatherdetails").append("Chance of rain: " + usersChanceOfRain + "%<br>");

            //code for weather icons -SB
            var skycons = new Skycons({ "color": "#222" });
            skycons.add("weatherIcon", response.currently.icon);
            skycons.play();
        });
            });
}

//load ajax stuff after page loads so we can use dom elements
//this fixes the bug where we had to set async to false --SB
 window.onload = function(){
  load_ajax();
 }