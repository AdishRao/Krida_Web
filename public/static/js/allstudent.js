function all_student(){
  var contents =
  `
  <ul>
            <li><a class="active" onclick="welcome_page()">Home</a></li>
            <li><a onclick="contact()">Contact</a></li>
            <li style="float:right"><a href="https://www.vincere-solutions.com/krida">About</a></li>
  </ul>

  <h1 class="center blue-text">Students who have taken tests</h1>

  <p id = "studentname" class="center black-text" style="font-size:40px;min-width:310px;">

  </p>
  `;
  // var name =  firebase.database().ref().child("name");
  // name.on('value',function(snapshot){
  //   console.log(snapshot.value());
  // });
//   name.once('value', function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var childKey = childSnapshot.key;
//     var childData = childSnapshot.val();
//     console.log(childData);
//     // ...
//   });
// });
  database = firebase.database();
  console.log("Okay")
  var ref = database.ref();
  // console.log(ref);

  ref.on('value', gotData, errData);
  document.getElementById("change_ui").innerHTML = contents;

}

function gotData(data){
  // console.log(data.val());
  var student = data.val();
  var key = Object.keys(student);
  console.log(key);
  // var heading = '<h1 class="center blue-text">Students who have taken tests</h1>'
  // document.write(heading)
  for(var i=0;i<key.length;i++){
    var k = key[i];
    var name = student[k].name;
    console.log(name);
    // document.write(name + "<br/>"
    // var temm += name + "\n";
    // );
    // var li = document.createElement('li', name);
    // li.parent('studentname');
    document.getElementById('studentname').innerHTML += "<button class='btn-large waves-effect waves-light btn-small' style='min-width:310px;background-color:#0089ec;font-weight:bold'>" + name + "</button>" + "</br>" + "</br>" ;
  }
}

function errData(err){
  console.log('Error!');
  console.log(err);
}
