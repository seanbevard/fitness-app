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



//creating a variable to store today's date:
var todaysDate = Date.now();
$("#logData").append(moment(todaysDate).format("MM/DD/YY"));
//Updating current users

dataRef.ref().child('users').on("child_added", function(snapshot) {
    var childData = snapshot.val();
    currentusernames.push(childData.username);
    currentdata.push(childData);
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
  
  //var myweighinno=localStorage.getItem("weighinno");
   // var myweighinno=weighinno[currentusernames.indexOf(username)];
   
    console.log(myweighinno);
     myweighinno++;
    console.log(myweighinno);
 
  dataRef.ref().child('users/'+username+'/weighin/'+myweighinno).set({  
      
      
                 weight: $('#weight-input').val(),
                 date  : todaysDate,
                 activity: $('#activity-input').val(),
                 duration:$('#duration-input').val()
                 
             

 }); 
    dataRef.ref().child('users/'+username ).update({  
      
      
                
                 weighinno: myweighinno
             

 }); 
                        }
    
 $("#submit-weighin").on("click", function(event) {
    
    event.preventDefault();
    writeUserLog();
    createinfofortyler();
       document.getElementById("weight-input").value="";
       document.getElementById("activity-input").value="";
      document.getElementById("duration-input").value="";
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
        window.open("index.html");
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
    console.log(currentdata,currentusernames,weighinno);
    username= ($('#userName').val());
    
    if(validateUsername($('#userName').val()))
   
        alert("You are not registered, please sign up");
    
    else
       
        {   
            var userobj=currentdata[currentusernames.indexOf(username)];
            var myweighinno=weighinno[currentusernames.indexOf(username)];
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