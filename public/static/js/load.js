var initial_bst_value = -1, initial_rpm_value = -1, initial_gdt_value = -1, initial_vl_value = -1;
var database;
var unique_id;
var today;
var age;
var rpm_age;
var bst_age;
var gdt_age;
var vl_age;
window.onload = login_option();
var submit = document.getElementById("submit");
submit.addEventListener('click',login);
function login_option()
{
    var contents =
    `
    <h1 class="center blue-text">Login</h1>
    <form class="center">
        <div class="center row">
            <div class="col s4"></div>
            <div class="center col s5">
                <input type="email" placeholder="Email" id="email_id"/>
                <input type="password" placeholder="Password" id="password"/>
                <input type="submit" id="submit" class="btn-large waves-effect waves-light btn-small teal lighten-2"/>
            </div>
        </div>
    </form>
    `;
    document.getElementById("change_ui").innerHTML = contents;
}
function login(e)
{
    e.preventDefault();
    var email = document.getElementById("email_id").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
        document.getElementById("change_ui").innerHTML="";
        load_options();
    })
    .catch(function(error) {
        alert("Wrong Email or Password")
    });
}

function load_options()
{
    var page_content; 
    page_content = 
    '<h1 class="center blue-text">Enter Student Detail</h1>\
    <form class="center">\
        <div class="center row"><div class="col s4"></div><div class="center col s5">\
            <input type="text" placeholder="Full Name" id="Name"/>\
            <input type="number" placeholder="Age [6-9]" id="Age" min="6" max="9"/>\
            <input type="text" placeholder="Gender" id="Gender"/>\
            <input type="date" placeholder="DOB" id="DOB"/>\
            <input type="submit" id="new_student" class="btn-large waves-effect waves-light btn-small teal lighten-2"/>\
        </div></div>\
    </form>'
    document.getElementById("change_ui").innerHTML=page_content;
    new_student = document.getElementById("new_student");
    new_student.addEventListener('click',add_student);
}

function add_student(e)
{
    e.preventDefault();
    var name = document.getElementById("Name").value;
    age = document.getElementById("Age").value;
    rpm_age = age;
    bst_age = age;
    gdt_age = age;
    vl_age = age;
    initial_bst_value = -1; 
    initial_rpm_value = -1;
    initial_gdt_value = -1; 
    initial_vl_value = -1;
    var gender = document.getElementById("Gender").value;
    var dob = document.getElementById("DOB").value;
    var dob = dob.replace(/\//g, "-");
    unique_id = name+dob;
    var current_test = 0;
    database = firebase.database();
    database.ref('Student/' + unique_id).set({
        "name" : name,
        "age" : age,
        "gender" : gender,
        "dob" : dob
    });
    database.ref(unique_id).set({
    "name" : name,
    "age" : age,
    "gender" : gender,
    "dob" : dob
    });
    today = new Date();
    database.ref(unique_id+'/'+(today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear())).set({
    rpm: -1,
    bst: -1,
    vineland: -1,
    gdt: -1
    });
    option_loadpage();
}