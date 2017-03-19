$(document).ready(function (){
// Initialize Firebase
var config = {
    apiKey: "AIzaSyADUXNZCMOCE9GAHJ2yKKCJku5h_Lw_P58",
    authDomain: "trains-75ac7.firebaseapp.com",
    databaseURL: "https://trains-75ac7.firebaseio.com",
    storageBucket: "trains-75ac7.appspot.com",
    messagingSenderId: "418082769442"
};
firebase.initializeApp(config);
var db = firebase.database();

var name, destination, firstTrain, frequency, nextArrival, minsAway, currentTime, diffTime, tRemainder;

$("#add-train").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    frequency = $("#freq-input").val().trim();
    currentTime = moment();
    console.log("current time: " + moment(currentTime).format("HH:mm"));

    diffTime = currentTime.diff(moment(firstTrainConverted, "minutes"));
    console.log("difference in time: " + diffTime);

    tRemainder = diffTime % frequency;
    console.log("remainder: " + tRemainder);

    minsAway = frequency - tRemainder;
    console.log("minutes til train: " + minsAway);

    nextArrival = moment().add(minsAway, "minutes");
    var nextArrivalConverted = moment(nextArrival).format("HH:mm");
    console.log("next arrival time: " + nextArrivalConverted);




    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minsAway: minsAway,
        nextArrivalConverted: nextArrivalConverted
    };

    db.ref().push(newTrain);
    console.log(newTrain);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");



    return false;
}); // end #add-train click listener

db.ref().on("child_added", function(snapshot) {
    console.log("snapshot: " + JSON.stringify(snapshot.val()));

    var tName = snapshot.val().name;
    var tDest = snapshot.val().destination;
    var tTime = snapshot.val().firstTrain;
    var tFreq = snapshot.val().frequency;
    var tNextArrival = snapshot.val().nextArrivalConverted;
    var tMinsAway = snapshot.val().minsAway;


    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + tNextArrival + "</td><td>" + tMinsAway + "</td></tr>");

});







}); // end document.ready