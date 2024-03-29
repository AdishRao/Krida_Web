var initial_bst_value = -1,
  initial_rpm_value = -1,
  initial_gdt_value = -1,
  initial_vl_value = -1;
var database;
var unique_id;
var val; //Data to be encryted
var hasheduser;
var today;
var userAuthId;
var key;
var iv;
var age;
var rpm_age;
var school;
var bst_age;
var gdt_age;
var vl_age;
var confirmation;
var display_text;

window.onload = login_option();

function login_option() {
  var contents = `

  <nav class=" teal darken-1" role="navigation">
    <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul>
      <li style="float:right"><a href="https://www.vincere-solutions.com/krida" target="_blank">About</a></li>
    </ul>  
    <div class="nav-wrapper container">
        <a href="#!" class="brand-logo"></a>
    </div>
  </nav>
`;
  contents += `

    <div class="ofsets">
    <h1 class="center blue-text">Login</h1>
    <form class="center">
        <div class="center row">
            <div class="col s4"></div>
              <div class="center col s4">
                <div class="input-field col s12 inline">
       
                <input id="email_id" type="email" class="validate">
                <label for="email_id">Email</label>
                <span class="helper-text" data-error="wrong" data-success=""></span>
       
                </div>    
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate">
                  <label for="password">Password</label>
                </div>
                <a id="submit" class="waves-effect waves-dark btn  teal accent-4 lighten-2"  style="margin-top:30px">Submit</a><br/>
                <a id="forgot" class="waves-effect waves-dark btn  red accent-4 lighten-2"  style="margin-top:30px">Forgot Password</a>
            </div>
        </div>
    </form>
    </div>
    `;
  document.getElementById("change_ui").innerHTML = contents;
  var submit = document.getElementById("submit");
  submit.addEventListener("click", login);
  var forgot = document.getElementById("forgot");
  forgot.addEventListener("click", forgot_option);
  // var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, {});
  // var elems = document.querySelectorAll('.tooltipped');
  // var instances = M.Tooltip.init(elems, {});
}

function forgot_option(e) {
  var contents = `


  <nav class=" teal darken-1" role="navigation">
    <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul>
      <li style="float:right"><a href="https://www.vincere-solutions.com/krida" target="_blank">About</a></li>
    </ul>  
    <div class="nav-wrapper container">
        <a href="#!" class="brand-logo"></a>
    </div>
  </nav>
`;
  contents += `

    <div class="ofsets">
    <h1 class="center blue-text">Forgot Password</h1>
    <form class="center">
        <div class="center row">
        <p>A password link will be sent to your registered email</p>
            <div class="col s4"></div>
              <div class="center col s4">
                <div class="input-field col s12 inline" id="input-container">       
                <input id="forgot_email_id" type="email" class="validate">
                <label for="forgot_email_id">Email</label>
                <span class="helper-text" data-error="wrong" data-success=""></span>
       
                </div>    
                <a id="forgot_submit" class="waves-effect waves-dark btn  teal accent-4 lighten-2"  style="margin-top:30px">Send Reset Link</a><br/>
                <!-- <a id="forgot" class="waves-effect waves-dark btn  red accent-4 lighten-2"  style="margin-top:30px">Forgot Password</a> -->
            </div>
        </div>
    </form>
    </div>
    `;
  document.getElementById("change_ui").innerHTML = contents;
  document
    .getElementById("forgot_submit")
    .addEventListener("click", password_reset);
  // var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, {});
  // var elems = document.querySelectorAll('.tooltipped');
  // var instances = M.Tooltip.init(elems, {});
}

async function password_reset(e) {
  var email = document.getElementById("forgot_email_id").value;
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    document.getElementById("input-container").style.display = "none";
    document.getElementsByTagName(
      "p"
    ).innerHTML = `A password link has been sent to ${email}`;
    document.getElementById("forgot_submit").innerHTML = "Go To Login";
    document
      .getElementById("forgot_submit")
      .addEventListener("click", e => login_option());
  } catch (err) {
    if (err.code == "auth/user-not-found") {
      alert("User Not Found");
    }
  }
}

/////////////////////////////////

////////////////////////////////
function login(e) {
  e.preventDefault();
  var email = document.getElementById("email_id").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      document.getElementById("change_ui").innerHTML = "";
      key = keygen(password, "aa", 16);
      //console.log(key);
      iv = keygen(password, "aa", 8);
      //console.log(iv);
      hasheddb
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          load_options();
        })
        .catch(function(error) {
          alert("Wrong Email or Password");
        });
    })
    .catch(function(error) {
      alert("Wrong Email or Password");
    });
}

function contact() {
  var cntct_content;
  cntct_content = `

        <nav class=" teal darken-1" role="navigation">
        <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      
        <div class="nav-wrapper container">
          <a class="brand-logo"></a>
        </div>
      </nav>
      <ul class="sidenav nav-center sidenav-fixed invesible-top " id="mobile-nav">
        <li class="tooltipped" data-position="right" data-tooltip="Welcome"><a style="border-radius: 36px; margin-top:8px; margin-right:10px; margin-left:10px; font-size:18px" class="hoverable text-black center teal lighten-2  ">${display_text}</a></li>
        <li><div class="divider"></div></li>
        <li><a href="#!" onClick="load_options()" ><i class="material-icons">add</i>New Student</a></li>
        <li><a href="#!" onClick="load_old()" ><i class="material-icons">people</i>Existing Student</a></li>
        <li><a href="#!" onClick="searchPage()"><i class="material-icons">search</i>Search Record</a></li>
        <li><a href="https://www.vincere-solutions.com/krida" target="_blank"><i class="material-icons">info</i>About</a></li>
        <li class="teal accent-4"><a onClick="contact()" ><i class="material-icons">contact_mail</i>Contact us</a></li>
        <li><div class="divider"></div></li>
      </ul>

      <div class="row center" style="padding-left:220px;padding-top:50px">
        <h1 class="center blue-text">Contact Us</h1>\
        <h5 class="center" style="color:darkcyan">For further queries or information, get in touch with us</h5>\
        <br>
        <a href="mailto:vincere-solutions@gmail.com" class="center btn-large waves-effect waves-light btn-small teal lighten-2">Send us an email</a>
      </div>
      `;
  document.getElementById("change_ui").innerHTML = cntct_content;
  var elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, {});
}

function redefvars() {
  //bst reset
  for (var i = 0; i < 8; i++) {
    bst_questions[i].length = 0;
  }
  bst_question_count = 0;
  bst_basal_age = 2.0;
  bst_additive_age = 0.0;
  bst_correct_no = 0;
  bst_temp_res = [1, 1, 1, 1, 1];
  bst_final_result = 0;
  //gdt reset
  gdt_count = 10;
  gdt_wrong_count = 0;
  gdt_question_count = 1;
  gdt_count_holder = [];
  gdt_final_result = 0;
  //rpm reset
  rpm_result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  rpm_section_no = 0;
  rpm_score = 0;
  rpm_image_no = 1;
  rpm_final_result = 0;
  //vl reset
  vl_last_correct_ques = 0;
  vl_no_of_wrong = 0;
  vl_current_age_question_set = 0;
  vl_res = [];
  vl_social_quotient = 0;
}

async function load_options() {
  database = firebase.database();
  const userid = await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userAuthId = user.uid;
    } else {
      console.error("not logged in");
    }
  });

  const userid2 = await hasheddb.auth().onAuthStateChanged(function(user) {
    if (user) {
      userAuthId2 = user.uid;
    } else {
      console.error("not logged in");
    }
  });

  await database.ref(`/user/${userAuthId}`).once("value", function(data) {
    school = data.val().node;
    val = data.val().encry;
    confirmation = data.val().confirmation;
    display_text = school;
  });

  var page_content;
  //REINITIALIZING ALL VARIABLES
  redefvars();
  document.body.style.backgroundColor = "white";
  page_content = `
  <nav class=" teal darken-1" role="navigation">
    <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul>
    </ul>  
    <div class="nav-wrapper container">
        <a href="#!" class="brand-logo"></a>
    </div>
  </nav>

  <ul class="sidenav nav-center sidenav-fixed invesible-top " id="mobile-nav">
    <li class="tooltipped" data-position="right" data-tooltip="Welcome">
    <a style="border-radius: 36px; margin-top:8px; margin-right:10px; margin-left:10px; font-size:18px" class="hoverable text-black center teal lighten-2  ">${display_text}</a>
    </li>
    <li><div class="divider"></div></li>
    <li class="teal accent-4"><a href="#!" onClick="load_options()" ><i class="material-icons">add</i>New Student</a></li>
    <li ><a href="#!" onClick="load_old()" ><i class="material-icons">people</i>Existing Student</a></li>
    <li ><a  onClick="searchPage()"><i class="material-icons">search</i>Search Record</a></li>
    <li><a href="https://www.vincere-solutions.com/krida" target="_blank"><i class="material-icons">info</i>About</a></li>
    <li><a href="#!" onClick="contact()" ><i class="material-icons">contact_mail</i>Contact us</a></li>
    <li><div class="divider"></div></li>      
  </ul>
  <div class="ofset">
    <h1 class="center blue-text">Enter Student Detail</h1>\
    <form class="center">\
        <div class="center row"><div class="col s4"></div><div class="center col s4">\
            <input type="text" placeholder="Full Name" id="Name"/>\
            <input type="text" placeholder="Gender" id="Gender"/>\
            <input type="date" placeholder="DOB - Age [6-9]" id="DOB"/>\
            <input type="submit" id="new_student" class="btn-large waves-effect waves-light btn-small teal lighten-2"/>\
        </div></div>\
    </form>
  </div>
    `;
  document.body.style.backgroundColor = "white";
  document.getElementById("change_ui").innerHTML = page_content;
  new_student = document.getElementById("new_student");
  new_student.addEventListener("click", add_student);
  var elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, {});
}

function add_student(e) {
  e.preventDefault();
  var temp = 0;
  var name = document.getElementById("Name").value;
  var gender = document.getElementById("Gender").value;
  var dob = document.getElementById("DOB").value;
  var dob = dob.replace(/\//g, "-");
  var dob_split = dob.split("-");
  // age = document.getElementById("Age").value;
  today = new Date();
  console.log(today);
  console.log(dob_split);
  for (var i = 0; i < 3; i++) {
    if (dob_split[i].length == 4) {
      var year = dob_split[i];
      break;
    }
  }
  age = today.getFullYear() - year;
  var month = dob_split[1];
  var m = today.getMonth() - month;
  if (i == 0) {
    var date = dob_split[2];
  } else {
    var date = dob_split[0];
  }
  if (m < 0 || (m === 0 && today.getDate() < date)) {
    age--;
  }

  if (age > 9 || age < 6) {
    temp = 1;
    M.toast({ html: "Age should be between 6 and 9!" });
  }

  if (temp != 1) {
    rpm_age = age;
    bst_age = age;
    gdt_age = age;
    vl_age = age;
    initial_bst_value = -1;
    initial_rpm_value = -1;
    initial_gdt_value = -1;
    initial_vl_value = -1;

    unique_id = name + ":" + year + "-" + month + "-" + date;

    hasheddatabase = hasheddb.database();
    hasheduser = CryptoJS.SHA256(unique_id);
    hasheduser = hasheduser.toString();

    hasheddatabase.ref("School/" + school + "/" + hasheduser).set({
      DOB: dob
    });

    var encid = encrypt(val, unique_id, key, iv);

    database.ref("School/" + school + "/Details/" + encid).set({
      Age: age
    });
    database
      .ref(
        "School/" +
          school +
          "/dates/" +
          today.getFullYear() +
          "/" +
          (today.getMonth() + 1)
      )
      .update(JSON.parse(`{ "${encid}": true }`));

    database
      .ref("School/" + school + "/All Names/")
      .update(JSON.parse(`{ "${encid}": true }`));

    option_loadpage();
  } else load_options();
}

function load_old() {
  var page_content;
  redefvars();
  page_content = `
  <nav class=" teal darken-1" role="navigation">
  <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
  <ul>
  </ul>  
  <div class="nav-wrapper container">
      <a href="#!" class="brand-logo"></a>
  </div>
</nav>

<ul class="sidenav nav-center sidenav-fixed invesible-top " id="mobile-nav">
  <li class="tooltipped" data-position="right" data-tooltip="Welcome">
  <a style="border-radius: 36px; margin-top:8px; margin-right:10px; margin-left:10px; font-size:18px" class="hoverable text-black center teal lighten-2  ">${display_text}</a>
  </li>
  <li><div class="divider"></div></li>
  <li><a onClick="load_options()" ><i class="material-icons">add</i>New Student</a></li>
  <li class="teal accent-4"><a href="#!" onClick="load_old()" ><i class="material-icons">people</i>Existing Student</a></li>
  <li ><a  onClick="searchPage()"><i class="material-icons">search</i>Search Record</a></li>
  <li><a href="https://www.vincere-solutions.com/krida" target="_blank"><i class="material-icons">info</i>About</a></li>
  <li><a onClick="contact()" ><i class="material-icons">contact_mail</i>Contact us</a></li>
  <li><div class="divider"></div></li>      
</ul>
    <div style="margin-top:0.5%;">
<div class="ofset">
    <h1 class="center blue-text">Enter Student Detail</h1>
    <form class="center">
        <div class="center row"><div class="col s4"></div><div class="center col s4">
            <input type="text" placeholder="Full Name" id="Name"/>
            <input type="date" placeholder="DOB - Age [6-9]" id="DOB"/>
            <input type="submit" id="existing_student" class="btn-large waves-effect waves-light btn-small teal lighten-2"/>
        </div></div>
    </form>

    </div>
    </div>
    `;
  document.getElementById("change_ui").innerHTML = page_content;
  existing_student = document.getElementById("existing_student");
  existing_student.addEventListener("click", add_existing_studInfo);
  var elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, {});
}

function add_existing_studInfo(e) {
  e.preventDefault();
  var name = document.getElementById("Name").value;
  var dob = document.getElementById("DOB").value;
  var dob = dob.replace(/\//g, "-");
  var dob_split = dob.split("-");
  today = new Date();
  console.log(today);
  console.log(dob_split);
  for (var i = 0; i < 3; i++) {
    if (dob_split[i].length == 4) {
      var year = dob_split[i];
      break;
    }
  }
  age = today.getFullYear() - year;
  var month = dob_split[1];
  var m = today.getMonth() - month;
  if (i == 0) {
    var date = dob_split[2];
  } else {
    var date = dob_split[0];
  }
  if (m < 0 || (m === 0 && today.getDate() < date)) {
    age--;
  }

  rpm_age = age;
  bst_age = age;
  gdt_age = age;
  vl_age = age;
  initial_bst_value = -1;
  initial_rpm_value = -1;
  initial_gdt_value = -1;
  initial_vl_value = -1;

  unique_id = name + ":" + year + "-" + month + "-" + date;
  var encid = encrypt(val, unique_id, key, iv);
  database = firebase.database();
  0;
  hasheddatabase = hasheddb.database();
  var ref = database.ref("School/" + school + "/Details");
  ref.once("value").then(function(snapshot) {
    var b = snapshot.child(encid).exists(); // true
    if (b == true) {
      //updating age
      var updates = {};
      updates["School/" + school + "/Details/" + encid + "/Age"] = age;

      database.ref().update(updates);
      // hasheddatabase.ref().update(hashedupdates);

      database
        .ref(
          "School/" +
            school +
            "/dates/" +
            today.getFullYear() +
            "/" +
            (today.getMonth() + 1)
        )
        .update(JSON.parse(`{ "${encid}": true }`));

      option_loadpage();
    } else {
      alert("Student doesn't exist");
    }
  });
}
