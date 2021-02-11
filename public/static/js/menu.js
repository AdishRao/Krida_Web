function option_loadpage()
{
    //const storageRef = firebase.storage().ref();
    storageRef.getDownloadURL().then((url) => {
        var img = document.getElementById('myimg');
        img.setAttribute('src', url);
    })
    .catch((error) => {
        console.log("image not retrieved");
        console.log(error);
    });

    var contents = 
    `
    <nav class=" teal darken-1" role="navigation">
        <a href="#" data-target="mobile-nav" class="sidenav-trigger">
            <i class="material-icons">menu</i>
        </a>
        <ul>
            <li style="float:right">
                <a href="https://www.vincere-solutions.com/krida" target="_blank">About</a>
            </li>
        </ul>  
        <div class="nav-wrapper container">
            <a href="#!" class="brand-logo"></a>
        </div>
    </nav>

    <div style='margin: auto; margin-top: 5%; width:500px; height:100px;'>
        <div style="width:40%; float:left">
            <img id="myimg" src="" alt="" style= "width:100px; height:100px; float:right;">
        </div>
        <div style="width:60%; float:right; padding-left:10%;">
            <p>Kid's nameeeeeeeeee</p> 
            <p>Kid's age</p>
        </div>
    </div>

    <div style="margin-top:8%;">
        <div class="row center">
            <div class="col s2"></div>
            <div class="col s4">
                    <button id="bst" class="btn-large waves-effect waves-light btn-small teal lighten-2" onClick="bst_load_ques()" style="min-width:310px;">Binet Simon Test</button>
            </div>
            <div class="col s4">
                    <button id="vineland" class="btn-large waves-effect waves-light btn-small teal lighten-2" onClick="vl_load_ques()" style="min-width:310px;">Vineland Scale</button>
            </div>
        </div>
        <div class="row center">
            <div class="col s2"></div>
            <div class="col s4">
                    <button id="gdt" class="btn-large waves-effect waves-light btn-small teal lighten-2" onClick="gdt_load_ques()" style="min-width:310px;">Gessel's Drawing Test</button>
            </div>
            <div class="col s4">
                <button id="rpm" class="btn-large waves-effect waves-light btn-small teal lighten-2" onClick="rpm_display_set_lower()" style="min-width:310px;">Ravens Progressive Matrix</button>
            </div>
        </div>
    </div>
    `;
    if(confirmation == 1){
        contents+=
        `
            <br/>
            <br/>
            <div class="row center">
                <div class="col s4"></div>
                <div class="col s4">
                    <button id="result" class="btn-large waves-effect waves-light btn-small orange lighten-2" onClick="result_loadpage()" style="min-width:310px;">Result</button>
                </div>
            </div>
            <div class="row center">
                <div class="col s4"></div>
                <div class="col s4">
                    <button id="new_child" class="btn-large waves-effect waves-light btn-small orange darken-2" onClick="confirm()" style="min-width:310px;margin-top:10px;">HOME</button>

                </div>
            </div>
        `;
    }
    else{
        contents+=
        `
            <br/>
            <br/>
            <div class="row center">
                <div class="col s4"></div>
                <div class="col s4">
                    <button id="result" class="btn-large waves-effect waves-light btn-small orange lighten-2" onClick="result_loadpage()" style="min-width:310px;">Result</button>
                </div>
            </div>
            <div class="row center">
                <div class="col s4"></div>
                <div class="col s4">
                    <button id="new_child" class="btn-large waves-effect waves-light btn-small orange darken-2" onClick="load_options()" style="min-width:310px;margin-top:10px;">HOME</button>

                </div>
            </div>
        `;
    }

    document.getElementById("change_ui").innerHTML = contents;
    if(initial_bst_value==-1&&initial_gdt_value==-1&&initial_vl_value==-1&&initial_rpm_value==-1)
    {
        document.getElementById("result").setAttribute("disabled",'true');
    }
    if(initial_bst_value!=-1)
    {
        document.getElementById("bst").setAttribute("disabled",'true');
    }
    if(initial_gdt_value!=-1)
    {
        document.getElementById("gdt").setAttribute("disabled",'true');
    }
    if(initial_rpm_value!=-1)
    {
        document.getElementById("rpm").setAttribute("disabled",'true');
    }
    if(initial_vl_value!=-1)
    {
        document.getElementById("vineland").setAttribute("disabled",'true');
    }
}

function confirm()
{
    var contents =
    `
    <nav class=" teal darken-1" role="navigation">
        <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul>
        <li style="float:right"><a href="https://www.vincere-solutions.com/krida" target="_blank">About</a></li>
        </ul>  
        <div class="nav-wrapper container">
            <a href="#!" class="brand-logo"></a>
        </div>
    </nav>
    <h3 style="padding-top:15%; padding-bottom:1.5%; text-align:center;" >Does the patient have Intellectual Disablity?</h3>
    <div class="row center">
    <div class="col s4"></div>
    <div class="col s2">
            <button id="yes" class="btn-large waves-effect waves-light btn-small teal lighten-2" value = 1 onClick ="load_options()" style="min-width:200px; min-height:50px;font-size:18px;">Yes</button>
    </div>
        <div class="col s2">
            <button id="no" class="btn-large waves-effect waves-light btn-small teal lighten-2" value = 0 onClick ="load_options()" style="min-width:200px; min-height:50px; font-size:18px;">No</button>
        </div>
    </div>
    `;

    document.getElementById("change_ui").innerHTML = contents;
    var yes = document.getElementById('yes');
    var no = document.getElementById('no');
    yes.addEventListener("click", function(){
        console.log(yes.value);
        hasheddatabase
        .ref(
        'School/' + school + '/' + 
        hasheduser +
        '/tests/' +
        (today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate())
        )
        .update({
            has_id: yes.value
          });
      });

      no.addEventListener("click", function(){
        console.log(no.value);
        hasheddatabase
        .ref(
        'School/' + school + '/' + 
        hasheduser +
        '/tests/' +
        (today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate())
        )
        .update({
            has_id: no.value
          });
      });

}