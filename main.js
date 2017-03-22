// Initialize Firebase
// Initialize Firebase
// Initialize Firebase
var config = {
apiKey: "AIzaSyAH76zucOcrL9PaMukEWaR6DjNnBytNTyI",
authDomain: "fitnessdb-3bffe.firebaseapp.com",
databaseURL: "https://fitnessdb-3bffe.firebaseio.com",
storageBucket: "fitnessdb-3bffe.appspot.com",
messagingSenderId: "187591330918"
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
                 date  : '01-07-2017'
                 
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
            window.open("signup.html"); 
         
            
        }
        
});


$("#signup-new-user").on("click", function(event) {

    window.open("signup.html");                

});


