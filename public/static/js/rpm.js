var rpm_result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var rpm_answers = [
  [4, 5, 1, 2, 6, 3, 6, 2, 1, 3, 5, 4],
  [2, 6, 1, 2, 1, 3, 5, 6, 4, 3, 4, 5],
  [8, 2, 3, 8, 7, 4, 5, 1, 7, 6, 1, 2],
  [3, 4, 3, 7, 8, 6, 5, 4, 1, 2, 5, 6],
  [7, 6, 8, 2, 1, 5, 2, 4, 1, 6, 3, 5]
];
var rpm_section_no = 0;
var rpm_score = 0;
var rpm_image_no = 1;
var rpm_final_result = 0;

function rpm_display_set_lower() {
  var rpm_content = '';
  for (var rpm_ques_num = 1; rpm_ques_num < 13; rpm_ques_num++) {
    rpm_content += `<div style="padding:30px 0px;" id="ques_seperator">
        <div id="ques${rpm_ques_num}" style="clear: both; padding: 15px 0px;" class="question">
            <div style="float: left; width: 50%; padding:30px 0px 45px;" ><img src="static/RPM/A${rpm_image_no}.png" id="img${rpm_ques_num}" width="700px" height="500px"/></div>
            <div style="float: right; width:50%; margin-top:120px;" class="center">

                <h5>Choose The Right Pattern</h5>
                <table style="margin-top: 130px;">
                    <tr>
                        <td class="center"><button id ="ans${rpm_ques_num}1" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=1 onClick="rpm_set_result(this.id)">1</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}2" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=2 onClick="rpm_set_result(this.id)">2</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}3" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=3 onClick="rpm_set_result(this.id)">3</button></td>
                    </tr>
                    <tr>
                        <td class="center"><button id ="ans${rpm_ques_num}4" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=4 onClick="rpm_set_result(this.id)">4</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}5" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=5 onClick="rpm_set_result(this.id)">5</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}6" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=6 onClick="rpm_set_result(this.id)">6</button></td>
                    </tr>
                </table>
            </div>
        </div>
        </div>
        <hr style="border: 1px solid black;clear: both;"/>`;
    rpm_image_no += 1;
  }
  rpm_content += `<div class="center" style="padding:50px 0px 10px;">
        <input id="${rpm_section_no}submit" class="waves-effect waves-light btn-large" type="submit" onClick="rpm_calc_res(this.id)"/>
    </div>`;
  document.getElementById('change_ui').innerHTML = rpm_content;
}

function rpm_display_set_higher() {
  var rpm_content = '';
  for (var rpm_ques_num = 1; rpm_ques_num < 13; rpm_ques_num++) {
    rpm_content += `<div style="padding:30px 0px" id="ques_seperator">
        <div id="ques${rpm_ques_num}" style="clear: both; padding: 15px 0px;" class="question">
            <div style="float: left; width: 50%; padding:30px 0px 45px;" ><img src="static/RPM/A${rpm_image_no}.png" id="img${rpm_ques_num}" width="700px" height="500px"/></div>
            <div style="float: right; width:50%; margin-top:120px;" class="center">
                <h5>Choose The Right Pattern</h5>
                <table style="margin-top: 130px;">
                    <tr>
                        <td class="center"><button id ="ans${rpm_ques_num}1" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=1 onClick="rpm_set_result(this.id)">1</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}2" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=2 onClick="rpm_set_result(this.id)">2</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}3" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=3 onClick="rpm_set_result(this.id)">3</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}4" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=4 onClick="rpm_set_result(this.id)">4</button></td>
                    </tr>
                    <tr>
                        <td class="center"><button id ="ans${rpm_ques_num}5" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=5 onClick="rpm_set_result(this.id)">5</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}6" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=6 onClick="rpm_set_result(this.id)">6</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}7" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=7 onClick="rpm_set_result(this.id)">7</button></td>
                        <td class="center"><button id ="ans${rpm_ques_num}8" class="waves-effect waves-light btn-large teal lighten-3" style="width: 100px; height: 60px;" value=8 onClick="rpm_set_result(this.id)">8</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <hr style="border: 1px solid black;clear: both;"/>`;
    rpm_image_no += 1;
  }
  rpm_content += `<div class="center" style="padding:50px 0px 10px;">
        <input id="${rpm_section_no}submit" class="waves-effect waves-light btn-large" type="submit" onClick="rpm_calc_res(this.id)"/>
    </div>`;
  document.getElementById('change_ui').innerHTML = rpm_content;
}

function rpm_nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

async function rpm_cal_final_res() {
  var encid = encrypt(val, unique_id, key, iv);
  window.scrollTo(0, 0);
  if (rpm_score == 0) {
    if(test_email!='test@gmail.com')
    {
      database
        .ref(
          '' + school + '/Details/' +
            encid +
            '/tests/' +
            (today.getFullYear() +
              '-' +
              (today.getMonth() + 1) +
              '-' +
              today.getDate())
        )
        .update({
          rpm: encrypt(val, rpm_score.toString(), key, iv)
        });
      initial_rpm_value = 0;
    }
    option_loadpage();
  }
  const rpm_q = await fetch('static/RPM/rpmresult.csv');
  const rpm_data = await rpm_q.text();
  var rpm_rows = rpm_data.split('\n').slice(2);
  rpm_rows.forEach(row => {
    const column = row.split(',');
    if (column[0] == rpm_score) {
      rpm_final_result = column[rpm_age - 5];
    }
  });
  initial_rpm_value = rpm_final_result;
  if(test_email!='test@gmail.com')
  {
    hasheddatabase
      .ref(
        ''+
          hasheduser +
          '/tests/' +
          (today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate())
      )
      .update({
        rpm: rpm_final_result
      });

    database
      .ref(
        'School/'+school +'/Details/' +
          encid +
          '/tests/' +
          (today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate())
      )
      .update({
        rpm: encrypt(val, rpm_final_result.toString(), key, iv)
      });
  }
  option_loadpage();
}

function rpm_calc_res(clicked_id) {
  
  // xhttp request
  rpm_score = Number(RequestText("getRpmScore", `rpm_result=${rpm_result}&rpm_answers=${rpm_answers}&rpm_section_no=${rpm_section_no}&rpm_score=${rpm_score}`));
  
  rpm_result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  window.scrollTo(0, 0);
  rpm_section_no += 1;
  if (rpm_section_no < 2) {
    rpm_display_set_lower();
  } else if (rpm_section_no < 5) {
    rpm_display_set_higher();
  } else {
    rpm_cal_final_res();
  }
}

function rpm_set_result(clicked_id) {
  var rpm_ques = parseInt(clicked_id.slice(3, clicked_id.length - 1)) - 1;
  var rpm_val = clicked_id[clicked_id.length - 1];
  rpm_result[rpm_ques] = parseInt(rpm_val);
  var id = clicked_id.slice(0, clicked_id.length - 1);
  if (rpm_section_no < 2) {
    for (var i = 1; i < 7; i++) {
      var set_id = id.concat(i);
      document.getElementById(set_id).className =
        'waves-effect waves-light btn-large teal lighten-3';
    }
  } else {
    for (var i = 1; i < 9; i++) {
      var set_id = id.concat(i);
      document.getElementById(set_id).className =
        'waves-effect waves-light btn-large teal lighten-3';
    }
  }
  document.getElementById(clicked_id).className =
    'waves-effect waves-light btn-large teal darken-2';
}
