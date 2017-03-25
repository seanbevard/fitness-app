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
var weighinno=[];
//var username='';
//variables to store data pulled from Geolocation API -SB
var usersZipCode;
var usersCity;
var usersLongitude;
var usersLatitude;
var usersState;
var usersChanceOfRain;
var weighindata=[];
var myweighinno;
var flag=0;
var weightArray=[];
var dateArray=[];


//creating a variable to store today's date:
var todaysDate = Date.now();
$("#logData").append(moment(todaysDate).format("MM/DD/YY"));
//Updating current users

dataRef.ref().child('users').on("child_added", function(snapshot) {
    var childData = snapshot.val();
    currentusernames.push(childData.username);
    currentdata.push(childData);

    
   // weighindata.push(childata.weighin);

  //  weighindata.push(childData.weighin);

    
});
    
dataRef.ref().child('users/'+localStorage.getItem("username")+'/weighin').on("child_added", function(snapshot) {
   var childData = snapshot.val();
    weighindata.push(childData);   
});
    
    
dataRef.ref('users/'+localStorage.getItem("username")+'/weighinno').on("value", function(snapshot) {
   var childData = snapshot.val();
   console.log("childata is : " + childData);
  myweighinno=(childData);
    if (flag==0){
     weightArray = [parseInt(weighindata[0].weight)];
     dateArray = [moment(weighindata[0].date).format("MM-DD-YY")];
     printTable();
    }
    else
    {     
    var tempDate = weighindata[i].date;
   var currentDate = moment(tempDate).format("ddd");
   console.log (tempDate);
   console.log (currentDate);
        $("#week-stats-table > tbody").append("<tr><td>" + currentDate + "</td><td>" + weighindata[myweighinno-1].weight + "</td><td>"  + weighindata[myweighinno-1].activity + "</td><td>"+ weighindata[myweighinno-1].duration + "</td></tr>");}
});

 

//Retrieving data from database
   function createinfofortyler()
    {var username=  localStorage.getItem("username");
  //JSON.parse()
      for(i=0;i<myweighinno;i++)
      {
          var t =JSON.stringify(weighindata[i]);
         console.log(t);
      }
    }


function writeUserLog() {
    
    var username=  localStorage.getItem("username");
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
  //var myweighinno=localStorage.getItem("weighinno");
   // var myweighinno=weighinno[currentusernames.indexOf(username)];
   
    console.log(myweighinno);
     myweighinno++;
    console.log(myweighinno);
 
  dataRef.ref().child('users/'+username+'/weighin/'+myweighinno).set({  
      
      
                 weight: $('#weight-input').val(),
                 date  : todaysDate,
                 day   : n,
                 activity: $('#activity-input').val(),
                 duration:$('#duration-input').val()
                 
             

 }); 
    dataRef.ref().child('users/'+username ).update({  
      
      
                
                 weighinno: myweighinno
             

 }); 
                        }
  //for (i=1; i<myweighinno; i++) {
 // console.log (weighindate[i].weight)
  //}
// var weightArray = [parseInt(weighindata[0].weight)];
var weightNumer
  function printTable() {
    flag=1;
   
   
   for (i=1; i < myweighinno; i++) {
    var tempDate = weighindata[i].date;
   var currentDate = moment(tempDate).format("ddd");
   var placeDate = moment(tempDate).format("MM-DD-YY");
   // console.log(weighindata);
   // console.log (tempDate);
   // console.log (currentDate);
   // console.log (placeDate);

   // weightArray = [parseInt(weighindata[0].weight)];
   // console.log(weighindata[i].weight);
   weightNumber = parseInt(weighindata[i].weight);
   weightArray.push(weightNumber);
   // console.log(weightArray);

   dateArray.push(placeDate);
   // console.log(dateArray);

   $("#week-stats-table > tbody").append("<tr><td>" + currentDate + "</td><td>" + weighindata[i].weight + "</td><td>"  + weighindata[i].activity + "</td><td>"+ weighindata[i].duration + "</td></tr>");
   }
}
    

 $("#submit-weighin").on("click", function(event) {
    
    event.preventDefault();
    writeUserLog();
    createinfofortyler();
       document.getElementById("weight-input").value="";
       document.getElementById("activity-input").value="";
      document.getElementById("duration-input").value="";
    displayChart();
    //   $('#weight-input').val("");
     //  $('# activity-input').val("");
     //  $('#duration-input').val("") ;   
 
});   
    
    
    



   
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
                 date  : todaysDate,
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
    {var message = "That is empty! Please enter a username";
      $('#signup-alertModal').find('.modal-body p').text(message);
      $('#signup-alertModal').modal('show') 

      // alert("Username cannot be Empty");
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
        window.open("index.html");
        }
    else
        {  
      var message = 'The user already exists, please use a different name.';
      $('#signup-alertModal').find('.modal-body p').text(message);
      $('#signup-alertModal').modal('show') 
        // alert("user already exists....please use a different username");  
        // location.reload(true);
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
    console.log(currentdata,currentusernames,weighinno);
    username= ($('#userName').val());
    
    if(validateUsername($('#userName').val()))
      // Modal script for username not found
        
        $('#signin-alertModal').modal('show');
        
    
    else
       
        {   
            var userobj=currentdata[currentusernames.indexOf(username)];
            localStorage.setItem("userObj",JSON.stringify(userobj));
            localStorage.setItem("username", username);
            localStorage.setItem("weighinno", myweighinno);
            //var data = JSON.parse(localStorage.getItem('userObj'));
            //console.log(data);
        
            window.open("landpage.html"); 
         
            
        }
        
});


$("#signup-new-user").on("click", function(event) {
    
    event.preventDefault();
    window.open("signup.html");                

});
// Timeout must be set on chart so it displays after variables populate
var delay = 3500;
setTimeout(function displayChart(){
    var chartData = {
        labels: dateArray,
        // Need an array returned of each date weight was logged. i.e. 
        // ["01-02-07", "01-03-17"] or var array
        datasets: [{
            data: weightArray,
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
            fontSize: 18,
            fontColor: "#FFA500",
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
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
  }, delay);
};

