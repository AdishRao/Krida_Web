var vl_SA_mapping = [
  0,
  0.06,
  0.12,
  0.18,
  0.24,
  0.3,
  0.35,
  0.41,
  0.47,
  0.53,
  0.59,
  0.65,
  0.71,
  0.77,
  0.83,
  0.89,
  0.94,
  1.0,
  1.06,
  1.12,
  1.18,
  1.24,
  1.3,
  1.35,
  1.41,
  1.47,
  1.53,
  1.59,
  1.65,
  1.71,
  1.77,
  1.83,
  1.89,
  1.94,
  2.0,
  2.1,
  2.2,
  2.3,
  2.4,
  2.5,
  2.6,
  2.7,
  2.8,
  2.9,
  3.0,
  3.2,
  3.3,
  3.5,
  3.7,
  3.8,
  4.0,
  4.2,
  4.3,
  4.5,
  4.7,
  4.8,
  5.0,
  5.2,
  5.4,
  5.6,
  5.8,
  6.0,
  6.3,
  6.5,
  6.8,
  7.0,
  7.2,
  7.4,
  7.6,
  7.8,
  8.0,
  8.3,
  8.5,
  8.8,
  9.0,
  9.3,
  9.7,
  10.0,
  10.3,
  10.5,
  10.8,
  11.0,
  11.3,
  11.7,
  12.0,
  12.6,
  13.2,
  13.8,
  14.4,
  15.0
];
var vl_text_data;
var vl_last_correct_ques = 0;
var vl_no_of_wrong = 0;
var vl_ques_range = [0, 17, 34, 44, 50, 56, 61, 65, 70, 74, 77, 81, 84, 89, 89];
var vl_current_age_question_set = 0;
var vl_res = [];
var vl_social_quotient = 0;
async function vl_load_ques() {
  var resp = await fetch('static/VL/vlques.txt');
  vl_text_data = await resp.text();
  vl_text_data = vl_text_data.split('\n');
  vl_display();
}

function vl_display() {
  var contents = '';
  vl_res = [];
  var j = 0;
  for (
    var i = vl_ques_range[vl_current_age_question_set];
    i < vl_ques_range[vl_current_age_question_set + 1];
    i++
  ) {
    contents += `
            <div id = "questioncontainer" style = "padding: 5px 0px;" class = "center">
                <p style="font-size:20px;">${vl_text_data[i]}</p>
                <div class="row">
                    <div class="col s12">
                        <button id ="ye${j}" class="btn waves-effect waves-light btn-small teal darken-2" value='yes' onClick="vl_set_result(this.id)">yes</button>
                        <button id ="no${j}" class="btn waves-effect waves-light btn-small orange lighten-3" value='no' onClick="vl_set_result(this.id)">no</button>
                    </div>
                </div>
                <hr style = "border: 1px solid black;">
            </div>
        `;
    j += 1;
    vl_res.push(1);
  }
  contents += `<div class = "center"><input type = "submit" id = "ques_submit" class="waves-effect waves-light btn-large" onClick="vl_calc_res(this.id)"/></div>`;
  document.getElementById('change_ui').innerHTML = contents;
}

function vl_set_result(clicked_id) {
  var val = clicked_id.slice(0, 2);
  var ques = parseInt(clicked_id.slice(2));

  if (val == 'ye') {
    vl_res[ques] = 1;
    document.getElementById(`no${ques}`).className =
      'btn waves-effect waves-light btn-small orange lighten-3';
    document.getElementById(clicked_id).className =
      'btn waves-effect waves-light btn-small teal darken-2';
  } else {
    vl_res[ques] = 0;
    document.getElementById(`ye${ques}`).className =
      'btn waves-effect waves-light btn-small teal lighten-3';
    document.getElementById(clicked_id).className =
      'btn waves-effect waves-light btn-small orange darken-2';
  }
}

function vl_calc_res(id) {
  window.scrollTo(0, 0);

  var j = vl_ques_range[vl_current_age_question_set];
  var flag = false;

  // xhttp request
  vlResponse = RequestJSON("getVlCalcRes", `vl_ques_range=${vl_ques_range}&vl_current_age_question_set=${vl_current_age_question_set}&vl_res=${vl_res}&vl_no_of_wrong=${vl_no_of_wrong}&flag=${flag}&j=${j}&vl_last_correct_ques=${vl_last_correct_ques}`);

  vl_ques_range = vlResponse.vl_ques_range;
  vl_current_age_question_set = vlResponse.vl_current_age_question_set;
  vl_res = vlResponse.vl_res;
  vl_no_of_wrong = vlResponse.vl_no_of_wrong;
  flag = (vlResponse.flag==true);
  j = vlResponse.j;
  vl_last_correct_ques = vlResponse.vl_last_correct_ques;

  console.log(typeof(flag));
  if (vl_current_age_question_set < 13) {
    if (flag == true) {
      vl_display();
    }
  }
  
  if (flag == false || vl_current_age_question_set >= 13) {
    // xhttp request
    vlResponse = RequestJSON("getVlSocialQuotient", `vl_ques_range=${vl_ques_range}&vl_current_age_question_set=${vl_current_age_question_set}&vl_no_of_wrong=${vl_no_of_wrong}&vl_last_correct_ques=${vl_last_correct_ques}&vl_social_quotient=${vl_social_quotient}&vl_age=${vl_age}`);

    vl_ques_range = vlResponse.vl_ques_range;
    vl_current_age_question_set = vlResponse.vl_current_age_question_set;
    vl_no_of_wrong = vlResponse.vl_no_of_wrong;
    vl_last_correct_ques = vlResponse.vl_last_correct_ques;
    vl_final_score = vlResponse.vl_final_score;
    vl_no_correct = vlResponse.vl_no_correct;
    vl_social_quotient = vlResponse.vl_social_quotient;
    vl_age = vlResponse.vl_age;
  
    initial_vl_value = vl_social_quotient;
  
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
          vineland: vl_social_quotient
        });

      var encid = encrypt(val, unique_id, key, iv);
      database
        .ref(
          'School/'+school+'/Details/' +
            encid +
            '/tests/' +
            (today.getFullYear() +
              '-' +
              (today.getMonth() + 1) +
              '-' +
              today.getDate())
        )
        .update({
          vineland: encrypt(val, vl_social_quotient.toString(), key, iv)
        });
    }
      option_loadpage();
  }
}