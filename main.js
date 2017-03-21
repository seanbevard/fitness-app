// Wrapping function in onload method
window.onload = function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAH76zucOcrL9PaMukEWaR6DjNnBytNTyI",
        authDomain: "fitnessdb-3bffe.firebaseapp.com",
        databaseURL: "https://fitnessdb-3bffe.firebaseio.com",
        storageBucket: "fitnessdb-3bffe.appspot.com",
        messagingSenderId: "187591330918"
    };
    firebase.initializeApp(config);

    //variables to store data pulled from Geolocation API -SB
    var usersZipCode;
    var usersCity;
    var usersLongitude;
    var usersLatitude;
    var usersState;
    var usersChanceOfRain;

    var dataRef = firebase.database();
    var userId = 0;
    var maxusers = 10;
    var currentusers = [];
    var currentusernames = [];
    updateCurrentUsers();

    function updateCurrentUsers() {
        // Adds values to the currentusers array;
        dataRef.ref().child('users').on("child_added", function(snapshot) {


            var childData = snapshot.val();
            console.log("snapshot is : " + snapshot.val());
            currentusers.push(childData.userId);
            currentusernames.push(childData.username);
            console.log("currentusers array in child added: " + currentusers);

        });





        // Removes values from the currentusers array;
        /*dataRef.ref().child('users').on("child_removed", function(snapshot) {

                                         var itemRemoved = snapshot.val().userid;
                                         console.log("child_removed is : " + itemRemoved);
                                         console.log("currentusers array in child removed: " + currentusers);
                                         var index = currentusers.indexOf(itemRemoved);
                                         currentusers.splice(index, 1);
                                          removechatpairs(itemRemoved);
                                            
                                            
                              });*/
    }







    function writeUserData(userId, name, weight, activity1, activity2, activity3) {

        console.log("inside write function");
        dataRef.ref().child('users/' + userId).set({
            userId: userId,
            username: name,
            weight: weight,
            activity1: activity1,
            activity2: activity2,
            activity3: activity3
        });

    }

    function removeUserData(userid) {

        console.log("inside removeUserData"); 
        dataRef.ref().child('users/' + userid).remove()
        console.log("UserData removed");

    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function assignUniqueId() {
        var IsValid = false;
        while (IsValid == false) {
            var Id = getRandomInt(1, maxusers);
            console.log("id is:" + Id);

            function checkuserId(presentId) {
                console.log("id is:" + Id + " presentId is: " + presentId);
                //return Id != presentId;
                if (Id == presentId) return false;
                else return true;
            }

            console.log("currentusers in assignunique id is : " + currentusers);
            var result = currentusers.every(checkuserId);
            console.log("currentusers.every(checkuserId) = " + result);
            if (result == true) {
                console.log("new id is : " + Id);
                userId = Id;
                writeUserData(Id, $('#name').val(), $('#weight-entry').val(), 'running', 'swimming', 'skating');
                IsValid = true;
            } else {
                console.log("uh oh id is duplicated :" + Id);
                if (currentusers.length == maxusers) {
                    console.log("max no of users reached");
                    IsValid = true;
                }
            }


        }

    }

    //Assign New Id
    /*function pair() {
                    while(unpairedusers.length>=2)
                    {
                       var element1 = unpairedusers.pop();
                       var element2=unpairedusers.pop();
                       gameon(element1,element2);        

                    }
        
    function gameon(element1,element2){
                        
                      dataRef.ref().child('users/'+ element1).set({  
                           opponent : element2;
                           chathistory : '';
                                              });
                     dataRef.ref().child('users/'+ element2).set({  
                           opponent : element1;
                           chathistory : '';
                                              });
                    
                    
                    
                    }*/

    /*$("##send-button").on("click", function(event) {

                               event.preventDefault();
                               console.log($('#send-button').val());
                               dataRef.ref().child('users/'+ myId).set({
                               chathistory : 'whatever is captured'
                                              });
                                                        });*/


    /*$(window).on('beforeunload', function ()
        {    
        
            removeUserData(userId);
            
           
           alert("hi");
            return false;
        });*/


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



    // When submit button is clicked
    $("#submit-button").on("click", function(event) {

        event.preventDefault();
        alert("clicked");

        function checkuserId(presentId) {
            console.log("id is:" + $('#name').val() + " presentId is: " + presentId);
            //return Id != presentId;
            if ($('#name').val() == presentId) return false;
            else return true;
        }
        var uniqueusername = currentusernames.every(checkuserId);
        if (uniqueusername == true)
            assignUniqueId();
        else {
            alert("username already in use.....plz use a diff userid");
            location.reload();
        }




    });



    // var somObj=snapshot.val();
    //  console.log("snapshot is : " + snapshot);
    // console.log("snapshot.val() is : " + snapshot.val());
    //  console.log("snapshot.users is : " + snapshot.val().username );
    //currentusers.push(somObj.users.1);
    //  console.log("currentusers is " + currentusers);




    /*var pairedusers=[];
    var unpairedusers=[];
    var session=[];
     dataRef.ref().on("child_added", function(snapshot) {
          var somObj=snapshot.val();
         currentusers.push(somObj.name);
         
       
        console.log("currentusers is "+currentusers);
         
         
        
         
        if(somObj.paired==false)
        {
            unpairedusers.push(somObj.name);
            
            
        }
         else
        pairedusers.push(somObj.name);
         
       });   
         if(unpairedusers.length>1)
             for (var i =0;i<(unpairedusers.length-1);i=i+2)
             {   dataRef.ref().on("value", function(snapshot) {
                 unpairedusers[i];unpairedusers[i+1]}
             console.log(somObj);
       console.log(somObj.name);
          console.log(somObj.wins);
          console.log(somObj.losses);
          
        }, function(errorObject) {
          console.losomObjg("Errors handled: " + errorObject.code);
        });
    */

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
