var config = {
    apiKey: "AIzaSyBGcd4aShuIqikXXPS3o-DpRrLT-KHPgxY",
    authDomain: "train-b0433.firebaseapp.com",
    databaseURL: "https://train-b0433.firebaseio.com",
    projectId: "train-b0433",
    storageBucket: "train-b0433.appspot.com",
    messagingSenderId: "326424987608"
  };
  firebase.initializeApp(config);

$('body').on('click', '#add-train', function(event) {
    event.preventDefault();

    var name = $('#name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var first = $('#first-input').val().trim();
    var freq = $('#frequency-input').val().trim();

    var newTrain = {
        Name: name,
        Destination: destination,
        First: first,
        Frequency: freq,
    };

    database.ref().push(newTrain);
    $('#name-input').val('');
    $('#destination-input').val('');
    $('#first-input').val('');
    $('#frequency-input').val('');

});
database.ref().on('child_added', function(childSnapshot) {
    
    var name = childSnapshot.val().Name;
    var destination = childSnapshot.val().Destination;
    var first = childSnapshot.val().First;
    var firstFormat = "HH:mm";
    var convertedFirst = moment(first, firstFormat).subtract(1, "years");
    console.log("First train: " + convertedFirst);
    var first12 = moment(convertedFirst).format("hh:mm a");
    var freq = childSnapshot.val().Frequency;
    console.log("Frequency: " + freq);
    var currentTime = moment();
    console.log("Current time: " + currentTime);
    var timeDiff = moment().diff(moment(convertedFirst), "minutes");
    console.log("Time difference: " + timeDiff);
    var remainder = timeDiff % freq;
    console.log("Remainder: " + remainder);
    var minAway = freq - remainder;
    console.log("Minutes until next train: " + minAway);
    var nextArrival = moment().add(minAway, "minutes");
    console.log("Next arrival: " + nextArrival);
    var nextArrivalConverted = moment(nextArrival).format("hh:mm a");



    $('#train-table > tbody').append('<tr><td>' + name + '</td><td>' + destination + '</td><td>' + freq + '</td><td>' + nextArrivalConverted + '</td><td>' + minAway + '</td></tr>')
})