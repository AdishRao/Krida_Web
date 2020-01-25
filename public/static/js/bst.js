var bst_image_present = [1, 1, 0, 1, 1, 1, 0, 0];
var bst_question_count = 0;
var bst_basal_age = 2.0;
var bst_additive_age = 0.0;
var bst_questions = [[], [], [], [], [], [], [], []];
var bst_correct_no = 0;
var bst_temp_res = [1, 1, 1, 1, 1];
var bst_final_result = 0;

async function bst_load_ques() {
  const q = await fetch('static/BST/bst.csv');
  const data = await q.text();
  var rows = data.split('\n').slice(1);

  rows.forEach(row => {
    const column = row.split(',');
    for (var i = 0; i < 8; i++) {
      bst_questions[i].push(column[i]);
    }
  });
  bst_disp_questions();
}
function bst_disp_questions() {
  var bst_temp_questions = bst_questions[bst_question_count];
  var bst_contents = '';
  bst_contents += `
        <div id = "bst_image" style="float:right;width:40%;margin-top:100px;"></div>
        <div id = "bst_questions" style="float:left;width:60%"></div>

    `;
  document.getElementById('change_ui').innerHTML = bst_contents;
  var inner_contents = '';
  for (var i = 0; i < bst_temp_questions.length; i++) {
    if (bst_temp_questions[i] != '') {
      inner_contents += `
                <p style="font-size:20px;padding:15px;">${bst_temp_questions[i]}</p>
                <div class="row">
                    <div class="col s8">
                        <button id ="ye${i}" class="btn waves-effect waves-light btn-small teal darken-2" value='yes' onClick="bst_set_result(this.id)">yes</button>
                        <button id ="no${i}" class="btn waves-effect waves-light btn-small orange lighten-3" value='no' onClick="bst_set_result(this.id)">no</button>
                    </div>
                </div>
            `;
    }
  }
  inner_contents += `<div class = "center"><input type = "submit" id = "ques_submit" class="waves-effect waves-light btn-large" onClick="bst_calc_res(this.id)"/></div>`;
  document.getElementById('bst_questions').innerHTML = inner_contents;
  if (bst_image_present[bst_question_count] == 1) {
    document.getElementById(
      'bst_image'
    ).innerHTML = `<img src='static/BST/age${bst_question_count +
      3}.png' width="70%"/>`;
  }
}
function bst_set_result(clicked_id) {
  var val = clicked_id.slice(0, 2);
  var ques = parseInt(clicked_id.slice(2));

  if (val == 'ye') {
    bst_temp_res[ques] = 1;
    document.getElementById(`no${ques}`).className =
      'btn waves-effect waves-light btn-small orange lighten-3';
    document.getElementById(clicked_id).className =
      'btn waves-effect waves-light btn-small teal darken-2';
  } else {
    bst_temp_res[ques] = 0;
    document.getElementById(`ye${ques}`).className =
      'btn waves-effect waves-light btn-small teal lighten-3';
    document.getElementById(clicked_id).className =
      'btn waves-effect waves-light btn-small orange darken-2';
  }
}
function bst_calc_res(clicked_id) {
  window.scrollTo(0, 0);
  var flag = false;
  var all_correct = true;
  if (bst_question_count != 1) {
    var limit = 5;
  } else {
    var limit = 4;
  }
  for (var i = 0; i < limit; i++) {
    if (bst_temp_res[i] == 1) {
      flag = true;
    }
    if (bst_temp_res[i] == 0) {
      all_correct = false;
    }
  }
  if (flag == false || bst_question_count == 7) {
    bst_display_result();
  } else {
    if (all_correct == true) {
      bst_basal_age += 1;
    } else if (bst_question_count == 1) {
      for (var i = 0; i < 4; i++) {
        if (bst_temp_res[i] == 1) {
          bst_additive_age += 3;
        }
      }
    } else {
      for (var i = 0; i < 5; i++) {
        if (bst_temp_res[i] == 1) {
          bst_additive_age += 2.4;
        }
      }
    }
    bst_question_count += 1;
    bst_disp_questions();
  }
}

//Is this function even used?  -_-
function bst_display_result() {
  while (bst_additive_age >= 12) {
    bst_basal_age += 1;
    bst_additive_age -= 12;
  }
  bst_final_result =
    ((bst_basal_age * 12 + bst_additive_age) / (bst_age * 12)) * 100;
  initial_bst_value = bst_final_result;

  hasheddatabase
    .ref(
      'Details/' +
        hasheduser +
        '/tests/' +
        (today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate())
    )
    .update({
      bst: bst_final_result
    });
  var encid = encrypt(val, unique_id, key, iv);
  database
    .ref(
      'School/Amaatra School/Details/' +
        encid +
        '/tests/' +
        (today.getFullYear() +
          '-' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate())
    )
    .update({
      bst: encrypt(val, bst_final_result.toString(), key, iv)
    });
  window.scrollTo(0, 0);
  option_loadpage();
}
