window.onload = function() {
var config = {
    apiKey: "AIzaSyBH2i1Tv_Ih6bnw1WTPICvUWP8HhtF3RFo",
    authDomain: "fitnessapp-b2272.firebaseapp.com",
    databaseURL: "https://fitnessapp-b2272.firebaseio.com",
    storageBucket: "fitnessapp-b2272.appspot.com",
    messagingSenderId: "472516374433"
  };


firebase.initializeApp(config);

var dataRef = firebase.database();
var currentusernames =[];
var currentdata=[];
var kayak=false;
var weighttraining=false;
var bootcamp=false;
var tennis=false;
var treadmill=false;
var dance=false;
var yoga=false;
var spinning=false;
var aerobics=false;
var roller=false;
var cycle=false;
var running=false;
var swim=false;
var hike = false;
//var username='';
//variables to store data pulled from Geolocation API -SB
var usersZipCode;
var usersCity;
var usersLongitude;
var usersLatitude;
var usersState;
var usersChanceOfRain;
//Updating current users

dataRef.ref().child('users').on("child_added", function(snapshot) {
    childData = snapshot.val();
    currentusernames.push(childData.username);
    currentdata.push(childData);
    console.log("hi baby");
});

 
//Retrieving data from database
   function getuserinfo()
    {
    var username=localStorage.getItem("username");
        
        
        var userobj=currentdata[currentusernames.indexOf(username)];
        console.log(userobj);
    }
    /*var childData = snapshot.val();
    if(childData.username==);
    
    interests.push(childData.username);
    interests.push(childData.targetweight);
    interests.push(childData.weight);
    
    
    if(childData.kayak=='true')
        (interests.push('kayak'));
    if(childData.dance=='true')
        (interests.push('dance'));
    if(childData.yoga=='true')
        (interests.push('yoga'));
     if(childData.spinning=='true')
        (interests.push('spinning'));
    if(childData.aerobics=='true')
        (interests.push('aerobics'));
    if(childData.roller=='true')
        (interests.push('rollerblading'));
     if(childData.cycle=='true')
        (interests.push('cycle'));
    if(childData.running=='true')
        (interests.push('running'));
    if(childData.swim=='true')
        (interests.push('swim'));
     if(childData.hike=='true')
        (interests.push('hike'));
    if(childData.treadmill=='true')
        (interests.push('treadmill'));
    if(childData.bootcamp=='yoga')
        (interests.push('bootcamp'));
    if(childData.tennis=='true')
        (interests.push('tennis'));
    if(childData.weights=='yoga')
        (interests.push('weights'));
});*/



function writeUserData() {

    dataRef.ref().child('users/'+$('#name').val()).set({  

        
    
        username     : $('#name').val(),
        
        targetweight : $('#target-weight-entry').val(),

        weight       : $('#weight-entry').val(),
            
        indooractivities: {
            
            dance        : dance,

            yoga         : yoga,

            spinning     : spinning,

            aerobics     : aerobics,
                
            treadmill    : treadmill,

            bootcamp     : bootcamp,
                
            weights      : weighttraining

         },
   
         outdooractivities: {

            kayak        : kayak,

            roller       : roller,

            cycle        : cycle,

            running      : running,

            swim         : swim,

            hike         : hike,

            tennis       : tennis

         },
        
        weighinno        : 1,
             
         weighin          :   {
             
             1:              {
                 weight: $('#weight-entry').val(),
                 date  : '01-07-2017',
                 activity: '',
                 duration:0,
                 
             }
         } 
    

    }); 

}

//function to set new weighins
/*dataRef.ref().child('users/bye/weighin').push().set({
    
  weight: "98",
  date: "10-09-2017"
});*/




$("#submit-button").on("click", function(event) {
      event.preventDefault();
    if($('#name').val()=='')
    {alert("Username cannot be Empty");
        return false;}
        
    
  
     
     //getuserinfo();
    
    if($("#hiking").prop('checked'))
        hike = true;

    if($("#tennis").prop('checked'))
        tennis = true;

    if($("#bootcamp").prop('checked'))
        bootcamp = true;

    if($("#treadmill").prop('checked'))
        treadmill = true;

    if($("#weight").prop('checked'))
        weighttraining = true;

    if($("#swimming").prop('checked'))
        swim= true;

    if($("#kayaking").prop('checked'))
       kayak = true;

    if($("#dancing").prop('checked'))
       dance= true;

    if($("#yoga").prop('checked'))
       yoga = true;

    if($("#spinning").prop('checked'))
       spinning = true;

    if($("#aerobics").prop('checked'))
      aerobics = true;

    if($("#rollerblading").prop('checked'))
      roller = true;

    if($("#cycling").prop('checked'))
      cycle = true;

    if($("#running").prop('checked'))
      running = true;

    if (validateUsername($('#name').val()))
        {
        writeUserData();
        window.open("landpage.html");
        }
    else
        {   
        alert("user already exists....please use a different username");  
        location.reload(true);
        }
});

                       
                       
function validateUsername(name){
    
    function checkuserName(presentName) {

        if(name==presentName)return false;
        else return true;
    }

    var uniqueusername =currentusernames.every(checkuserName);
    
    if(uniqueusername==true)
    return true;
    else
    return false;


}
    
    
 //Check if username is already in use.




$("#submit-username").on("click", function(event) {
    
    event.preventDefault();
    username= ($('#userName').val());
    
    if(validateUsername($('#userName').val()))
   
        alert("You are not registered, please sign up");
    
    else
       
        {
            localStorage.setItem("username", username);
            window.open("landpage.html"); 
         
            
        }
        
});


$("#signup-new-user").on("click", function(event) {

    window.open("signup.html");                

});



    // Logic for sports quote API
    var queryURL = "http://quotes.rest/qod.json?category=sports"
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
    $.ajax({
        url: 'http://freegeoip.net/json/',
        async: false,
        method: 'GET'
    }).done(function(location) {
        usersZipCode = location.zip_code;
        usersCity = location.city;
        usersState = location.region_code;
        usersLongitude = location.longitude;
        usersLatitude = location.latitude;
    });

    //ajax call for weather -SB
    $.ajax({
            url: "https://api.darksky.net/forecast/" + "8c7c81eec838047ee423275f144c553b" + "/" + usersLatitude + "," + usersLongitude,
            async: false,
            method: "GET"
        })
        .done(function(response) {
            //storing chance of rain to use elsewhere -SB
            usersChanceOfRain = response.currently.precipProbability * 100;
            $("#weather").append("<h3>Current Weather In<br> " + usersCity + ", " + usersState + "</h1>");
            $("#weather").append("Current Conditions: " + response.currently.summary + "<br>");
            $("#weather").append("Temperature: " + Math.round(response.currently.temperature) + "°F<br>");
            $("#weather").append("Chance of rain: " + usersChanceOfRain + "%");

            //code for weather icons -SB
            var skycons = new Skycons({ "color": "#222" });
            //alert(currentWeatherIcon);
            skycons.add("weatherIcon", response.currently.icon);

           // $("#weather").prepend("<canvas id='" + response.currently.icon + "'width='128' height='128'></canvas>");
            skycons.play();
        });


    // Create dataset for chart from variables

    var chartData = {
        labels: ["01-02-17", "01-03-17", "01-05-17", "01-07-17"],
        // Need an array returned of each date weight was logged. i.e. 
        // ["01-02-07", "01-03-17"] or var array
        datasets: [{
            data: ["120", "118", "115", "114"],
            // Need array of weights that were input or var array
            fill: false,
            backgroundColor: "gold",
            pointBorderColor: "purple",
            pointHoverBorderWidth: 2,
            tension: 0.1,

        }]


    };
    // Different optons to adjust chart created
    var options = {

        title: {
            display: true,
            text: "Your Weight Loss Over Time",
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };


    // Initialize chart
    var ctx = document.getElementById("myChart");

    // Create line chart
    var myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options
    })
};

