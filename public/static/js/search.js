function searchPage() {
  document.body.style.backgroundColor = 'white';
  var contents = `

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
      <a style="border-radius: 36px; margin-top:8px; margin-right:10px; margin-left:10px; font-size:18px" class=" hoverable text-black center teal lighten-2  ">${display_text}</a>
      </li>
      <li><div class="divider"></div></li>
      <li><a href="#!" onClick="load_options()" ><i class="material-icons">add</i>New Student</a></li>
      <li><a href="#!" onClick="load_old()" ><i class="material-icons">people</i>Existing Student</a></li>
      <li class="teal accent-4"><a  onClick="searchPage()"><i class="material-icons">search</i>Search Record</a></li>
      <li><a href="https://www.vincere-solutions.com/krida" target="_blank"><i class="material-icons">info</i>About</a></li>
      <li><a href="#!" onClick="contact()" ><i class="material-icons">contact_mail</i>Contact Us</a></li>
      <li><div class="divider"></div></li>      
    </ul>

        <div style="margin-top:0.5%;">

        <!--  --> 
  <div class="ofset">
    <div class="row" style="margin:0px;">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><a class="active" href="#test1">Search by Name</a></li>
          <li class="tab col s6"><a  href="#test2">Search by Date</a></li>
        </ul>
        <div class="container">
          <div class="  row center">
            <div  id="test1" class=" row center-align">
              <br>
              <div class="input-field col s5">
                <input id="last_name" type="text" class="validate">
                <label class="" for="last_name">Name</label>
              </div>       
              <div class="input-field col s5">
                <input id = "birthdate" type="text"  class="datepicker">
                <label class="" for="birthdate">Date Of Birth</label>       
              </div> 
              <div class="col s2">
                <a id="searchRecord" class="btn-large waves-effect waves-light "  ><i class="tiny material-icons">search</i></a>
              </div>
          </div>
      <!--  -->    
          <div id="test2" class=" row center-align">
            <br>
            <div class="input-field col s5">
              <select id ="year">
                <option value="" selected>None</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
        

              </select>       
              <label>Sort by Year</label>   
            </div>  
            <div class="input-field col s5">
              <select  id ="month">
                <option value=""  selected>None</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>      
              <label>Sort by Month</label>    
            </div> 
            <div class="col s2"  >
              <a id="c" class="btn-large waves-effect waves-light " "><i class="tiny material-icons">search</i></a>
            </div>
          </div>
          <!--  -->  
      </div>
    </div>
  </div>

    `;

  contents += `
  <br>
  <br>
  <br>
  <div class=" " style ="margin:10%; " >
    <div class="card-panel">
      <div class="">
        <table class="centered bordered highlight  table-status-sheet">
          <thead>
            <tr >
              <th class="center">Name</th>
              <th class="center">DOB</th>
            </tr>
          </thead>
        <tbody id ="table">
          
        </tbody>
      </table>
     <h5 style="text-align: center;" id="enter">Please enter Search criteria</h5> 
    </div>
  </div>
  </div>

    `;

  document.getElementById('change_ui').innerHTML = contents;
  document.getElementById('table').style.height = '0px';
  var elemsS = document.querySelectorAll('select');
  M.FormSelect.init(elemsS, {});

  var el = document.querySelectorAll('.tabs');
  M.Tabs.init(el, {});

  var elems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(elems, {
    format: 'yyyy-mm-dd',
    showClearBtn: true,
    i18n: {
      clear: 'remove'
    }
  });

  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {});

  var elems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(elems, {});

  var submit = document.getElementById('searchRecord');
  submit.addEventListener('click', searchByNameDOB);
  var getdates = document.getElementById('c');
  getdates.addEventListener('click', filterByDate);
}

async function filterByDate(e) {
  e.preventDefault();
  await getData();
}
async function getData() {
  var database = firebase.database();
  var year = document.getElementById('year').value;
  var month = document.getElementById('month').value;

  var details = null;
  console.log('year: ' + year + ' month: ' + month);
  if (year != '' && month == '') {
    details = await database
      .ref(`School/${school}/dates/${year}`)
      .once('value', () => {});
    var tb = document.getElementById('table');
    tb.style.height = '450px';
    var elemsS = tb.querySelectorAll('tr');
    elemsS.forEach(e => {
      e.remove();
    });
    // console.log(details.val());
    details.forEach(dd => {
      console.log(dd.val());
      var keyw = Object.keys(dd.val());
      keyw.forEach(ss => {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        //   var td3 = document.createElement('td');
        // console.log('---------------------------->\n');
        // console.log(ss);
        ss = decrypt(val, ss, key, iv);
        // console.log('---------------------------->\n');
        // console.log(ss);
        // console.log('---------------------------->\n');

        var split = ss.split(':');
        td1.appendChild(document.createTextNode(split[0]));
        td2.appendChild(document.createTextNode(split[1]));
        //   td3.appendChild(document.createTextNode(details.val().DOB));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.addEventListener('click', function() {
          showReport(ss);
        });
        //   tr.appendChild(td3);
        tb.appendChild(tr);
      });
      document.getElementById('enter').remove();
      document.getElementById('table').style.height = '450px';
    });
    year = '';
    month = '';
  } else if (year != '' && month != '') {
    details = await database
      .ref(`School/${school}/dates/${year}/${month}`)
      .once('value', () => {});
    var tb = document.getElementById('table');
    tb.style.height = '450px';
    document.getElementById('enter').style.display = 'none';
    var elemsS = tb.querySelectorAll('tr');
    elemsS.forEach(e => {
      e.remove();
    });

    var keyw = Object.keys(details.val());
    // console.log("Keys: "+key);
    keyw.forEach(e => {
      console.log('---------------------------->\n' + e);
      e = decrypt(val, e, key, iv);
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      var td2 = document.createElement('td');
      var a = document.createElement('a');
      a.href = '#';
      a.style.color = 'black';
      //   var td3 = document.createElement('td');
      var split = e.split(':');
      td1.appendChild(document.createTextNode(split[0]));
      td2.appendChild(document.createTextNode(split[1]));
      //   td3.appendChild(document.createTextNode(details.val().DOB));
      tr.appendChild(td1);
      tr.appendChild(td2);
      a.appendChild(tr);
      tr.addEventListener('click', function() {
        showReport(e);
      });
      //   tr.appendChild(td3);
      tb.appendChild(a);
    });
  }
}

async function searchByNameDOB(e) {
  e.preventDefault();
  var name = document.getElementById('last_name').value;
  var date = document.querySelector('.datepicker').value;
  var collection = `${name}:${date}`;
  await setDetails(collection);
}

async function setDetails(entry) {
  var database = firebase.database();
  var encid = encrypt(val, entry, key, iv);
  var details = await database
    .ref(`School/${school}/All Names/${encid}`)
    .once('value', () => {}, err);
  console.log(details.val());
  if (details.val() != true) {
    console.log('Person does not exist');
    Materialize.toast('Person does not exist', 2000, 'rounded');
    return;
  } else {
    var tb = document.getElementById('table');
    var elemsS = tb.querySelectorAll('tr');
    elemsS.forEach(e => {
      e.remove();
    });
    var splits = entry.split(':');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    // var td3 = document.createElement('td');
    td1.appendChild(document.createTextNode(splits[0]));
    td2.appendChild(document.createTextNode(splits[1]));
    //  td3.appendChild(document.createTextNode(details.val().DOB));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.addEventListener('click', function() {
      showReport(entry);
    });
    // tr.appendChild(td3);
    tb.appendChild(tr);
    document.getElementById('enter').style.display = 'none';
    document.getElementById('table').style.height = '450px';
  }

  function err() {
    console.error('Error has occured with getDate firebase callback');
  }
}

async function showReport(e) {
  console.log('Called with ' + e);
  body =
    `
    <nav class=" teal darken-1" role="navigation">
    <a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul>
            <li><a class="active" onclick="load_options()">Home</a></li>
            <li><a onclick="contact()">Contact</a></li>
            <li style="float:right"><a href="https://www.vincere-solutions.com/krida">About</a></li>
    </ul>  
    <div class="nav-wrapper container">
        <a href="#!" class="brand-logo"></a>
    </div>
  </nav>

  <div style='margin: auto; margin-top: 1%; width:500px; height:100px;'>
        <div style="width:40%; float:left">
        <img id="myimg" src="" alt="" style= "width:100px; height:100px; float:right;">
        </div>
        <div style="width:60%; float:right; padding-left:10%;">
            <p>Name: ` + e.split(":")[0] +`</p> 
            <p>DOB: ` + e.split(":")[1] +`</p>
        </div>
    </div>

  <div class="container" style="margin-top: 20px; border: 3px solid teal; background: white;">
      <!-- <h5 style="padding: 0.5em 0.7em; margin: 0em">Test Scores</h5>
      <div class="divider" style="height: 7px;"></div> -->
      <table>
      <thead style="width:100%; background-color: #B9E5E0;">
          <tr style="padding: 0.2em 1.2em;">
              <th>Test Date</th>
              <th>BST</th>
              <th>GDT</th>
              <th>RPM</th>
              <th>Vineland</th>
          </tr>
          </thead>
          <tbody>`;

  var database = firebase.database();
  var testdata = await database
    .ref('School/' + school + '/Details/' + encrypt(val, e, key, iv) + '/tests')
    .once('value', () => {});
  var keys = Object.keys(testdata.val());
  testdata = testdata.val();

  keys.forEach(q => {
    testdata[q].bst =
      testdata[q].bst == undefined
        ? -1
        : decrypt(val, testdata[q].bst, key, iv);
    testdata[q].gdt =
      testdata[q].gdt == undefined
        ? -1
        : decrypt(val, testdata[q].gdt, key, iv);
    testdata[q].rpm =
      testdata[q].rpm == undefined
        ? -1
        : decrypt(val, testdata[q].rpm, key, iv);
    testdata[q].vineland =
      testdata[q].vineland == undefined
        ? -1
        : decrypt(val, testdata[q].vineland, key, iv);
    body +=
      `
  <tr>
                    <td style="overflow: hidden;">` +
      q +
      `</td>
                    <td style="overflow: hidden;">` +
      (testdata[q].bst == -1 ? "N/A" : testdata[q].bst) +
      `</td>
                    <td style="overflow: hidden;">` +
      (testdata[q].gdt == -1 ? "N/A" : testdata[q].gdt) +
      `</td>
                    <td style="overflow: hidden;">` +
      (testdata[q].rpm == -1 ? "N/A" : testdata[q].rpm) +
      `</td>
                    <td style="overflow: hidden;">` +
      (testdata[q].vineland == -1 ? "N/A" : testdata[q].vineland) +
      `</td>
                </tr>
  `;
  });

  body += `
 </tr>
 </tbody>
 </table>
</div>
<button id="new_child" class="btn-large waves-effect waves-light btn-small orange darken-2"  onClick="searchPage()" style="min-width:310px;margin-top:30px; font-size: 20px; display: block; margin-left: auto; margin-right: auto; background: #00897B !important">Back</button>
`;

  // document.body.style.backgroundColor = '#AACAB8';
  document.getElementById('change_ui').innerHTML = body;
}
