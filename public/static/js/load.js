var initial_bst_value = -1,
  initial_rpm_value = -1,
  initial_gdt_value = -1,
  initial_vl_value = -1;
var test_email='None';
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
var storageRef;

window.onload = login_option();

function isMobileTablet(){
  var check = false;
  (function(a){
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
          check = true;
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

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
                <a id="guestlogin" class="waves-effect waves-dark btn  orange accent-4 lighten-2"  style="margin-top:30px">Login as Guest</a><br/> `+//TODO: remove guest button
                `<a id="forgot" class="waves-effect waves-dark btn  red accent-4 lighten-2"  style="margin-top:30px">Forgot Password</a>
            </div>
        </div>
    </form>
    </div>
    `;
  document.getElementById('change_ui').innerHTML = contents;
  var submit = document.getElementById('submit');
  submit.addEventListener('click', login);

  //TODO: Remove login as guest
  var loginasguest = document.getElementById('guestlogin');
  loginasguest.addEventListener('click', login_with_guest);

  var forgot = document.getElementById('forgot');
  forgot.addEventListener('click', forgot_option);

  if (isMobileTablet())
  {
    alert("This application was designed for desktop computers, you may face design errors!")
  }

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
  document.getElementById('change_ui').innerHTML = contents;
  document
    .getElementById('forgot_submit')
    .addEventListener('click', password_reset);
  // var elems = document.querySelectorAll('.sidenav');
  // var instances = M.Sidenav.init(elems, {});
  // var elems = document.querySelectorAll('.tooltipped');
  // var instances = M.Tooltip.init(elems, {});
}

async function password_reset(e) {
  var email = document.getElementById('forgot_email_id').value;
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    document.getElementById('input-container').style.display = 'none';
    document.getElementsByTagName(
      'p'
    ).innerHTML = `A password link has been sent to ${email}`;
    document.getElementById('forgot_submit').innerHTML = 'Go To Login';
    document
      .getElementById('forgot_submit')
      .addEventListener('click', e => login_option());
  } catch (err) {
    if (err.code == 'auth/user-not-found') {
      alert('User Not Found');
    }
  }
}

//TODO: Remove guest login
function login_with_guest(e) {
  e.preventDefault();
  var email = 'test@gmail.com';
  var password = 'testlogin';
  test_email = 'test@gmail.com';
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      document.getElementById('change_ui').innerHTML = '';
      key = keygen(password, 'aa', 16);
      //console.log(key);
      iv = keygen(password, 'aa', 8);
      //console.log(iv);
      hasheddb
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          load_options();
        })
        .catch(function(error) {
          alert('Wrong Email or Password');
        });
    })
    .catch(function(error) {
      alert('Wrong Email or Password');
    });
}

function login(e) {
  e.preventDefault();
  var email = document.getElementById('email_id').value;
  var password = document.getElementById('password').value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
      document.getElementById('change_ui').innerHTML = '';
      key = keygen(password, 'aa', 16);
      //console.log(key);
      iv = keygen(password, 'aa', 8);
      //console.log(iv);
      hasheddb
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(firebaseUser) {
          load_options();
        })
        .catch(function(error) {
          alert('Wrong Email or Password');
        });
    })
    .catch(function(error) {
      alert('Wrong Email or Password');
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
  document.getElementById('change_ui').innerHTML = cntct_content;
  var elems = document.querySelectorAll('.tooltipped');
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
      console.error('not logged in');
    }
  });

  //---Hashed DB
  // const userid2 = await hasheddb.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     userAuthId2 = user.uid;
  //   } else {
  //     console.error("not logged in");
  //   }
  // });

  await database.ref(`/user/${userAuthId}`).once('value', function(data) {
    school = data.val().node;
    val = data.val().encry;
    confirmation = data.val().confirmation;
    display_text = school;
  });

  var page_content;
  //REINITIALIZING ALL VARIABLES
  redefvars();
  document.body.style.backgroundColor = 'white';
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
            <input type="date" placeholder="DOB(DD/MM/YYYY) - Age [6-9]" id="DOB"/>\
            <input style="margin-top:10px;" type="file" id="Photo"/>\
            <input style="margin-top:20px;" type="submit" id="new_student" class="btn-large waves-effect waves-light btn-small teal lighten-2"/>\
        </div></div>\
    </form>
  </div>
    `;
  document.body.style.backgroundColor = 'white';
  document.getElementById('change_ui').innerHTML = page_content;
  new_student = document.getElementById('new_student');
  new_student.addEventListener('click', add_student);
  var elems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(elems, {});
}

function add_student(e) {
  e.preventDefault();
  var temp = 0;
  var name = document.getElementById('Name').value;
  var gender = document.getElementById('Gender').value;
  var dob = document.getElementById('DOB').value;
  var dob = dob.replace(/\//g, '-');
  var dob_split = dob.split('-');
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
    M.toast({ html: 'Age should be between 6 and 9!' });
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

    unique_id = name + ':' + year + '-' + month + '-' + date;
    
    //store photo to firebase
    var photo = document.getElementById("Photo").files[0];
    console.log("photo");
    console.log(photo);
    storageRef = firebase.storage().ref('img/'+photo.name);
    storageRef.put(photo);
   
  //TODO: Remove guest login
  if(test_email!='test@gmail.com')
  {
    hasheddatabase = hasheddb.database();
    hasheduser = CryptoJS.SHA256(unique_id);
    hasheduser = hasheduser.toString();

    hasheddatabase.ref('' + hasheduser).set({
      DOB: dob,
      Gender: gender
    });
  }

    var encid = encrypt(val, unique_id, key, iv);
    var enc_age = encrypt(val, age.toString(), key, iv);
    var enc_dob = encrypt(val, dob.toString(), key, iv);
    var enc_gen = encrypt(val, gender.toString(), key, iv);


    //TODO: Remove guest
    if(test_email!='test@gmail.com')
    {
      database.ref('School/' + school + '/Details/' + encid).update({
        Age: enc_age,
        DOB: enc_dob,
        Gender: enc_gen
      });

      database
        .ref(
          'School/' +
            school +
            '/dates/' +
            today.getFullYear() +
            '/' +
            (today.getMonth() + 1)
        )
        .update(JSON.parse(`{ "${encid}": true }`));

      database
        .ref('School/' + school + '/All Names/')
        .update(JSON.parse(`{ "${encid}": true }`));
    }
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
  document.getElementById('change_ui').innerHTML = page_content;
  existing_student = document.getElementById('existing_student');
  existing_student.addEventListener('click', add_existing_studInfo);
  var elems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(elems, {});
}

function add_existing_studInfo(e) {
  e.preventDefault();
  var name = document.getElementById('Name').value;
  var dob = document.getElementById('DOB').value;
  var dob = dob.replace(/\//g, '-');
  var dob_split = dob.split('-');
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

  unique_id = name + ':' + year + '-' + month + '-' + date;
  var encid = encrypt(val, unique_id, key, iv);
  database = firebase.database();
  0;
  hasheddatabase = hasheddb.database();
  var ref = database.ref('School/' + school + '/Details');
  ref.once('value').then(function(snapshot) {
    var b = snapshot.child(encid).exists(); // true
    if (b == true) {
      //updating age
      var updates = {};
      updates['School/' + school + '/Details/' + encid + '/Age'] = encrypt(
        val,
        age.toString(),
        key,
        iv
      );
      database.ref().update(updates);

      database
        .ref(
          'School/' +
            school +
            '/dates/' +
            today.getFullYear() +
            '/' +
            (today.getMonth() + 1)
        )
        .update(JSON.parse(`{ "${encid}": true }`));

      option_loadpage();
    } else {
      alert("Student doesn't exist");
    }
  });
}
