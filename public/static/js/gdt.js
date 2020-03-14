var gdt_count = 10;
var gdt_wrong_count = 0;
var gdt_question_count = 1;
var gdt_count_holder = [];
var gdt_agegroup = [11, 13, 17, 20, 24];
var gdt_final_result = 0;

function gdt_load_ques() {
  var gdt_content = '';
  var gdt_inital_questions = [
    'Palmer hold on writing instruments?',
    'Spontaneous scribble?',
    'Purposive horizontal scribble?',
    'Makes dots?',
    'Tripod hold on writing instruments?',
    'Purposive vertical scribble?',
    'Imitates vertical strokes?',
    'Extends tail to dots in different directions?',
    'Imitates horizontal strokes?',
    'Traces outline of objects/ palm on paper?'
  ];
  for (var i = 0; i < gdt_inital_questions.length; i++) {
    gdt_content += `
            <div id = "question${i}" style = "padding: 20px 0px;" class = "center">
                <div class = "row" style="margin-bottom: 5px">
                    <div class ="col s3"></div>
                    <div class ="col s4">
                    <p style="font-size:20px;"> ${gdt_inital_questions[i]}</p>
                    </div>
                    <div class ="col s4" style="padding-top:15px">
                            <button id ="${i}" class="btn waves-effect waves-light btn-small orange lighten-3" onClick="gdt_set_result(this.id)">no</button>
                    </div>
                </div>
            </div>
        `;
  }
  gdt_content += `
    <div class="row">
        <div class="col s6"></div>
        <div class = "center">
            <input type = "submit" id = "submit" class="waves-effect waves-light btn-large" onClick="gdt_display()"/>
        </div>
    </div>
    `;
  document.getElementById('change_ui').innerHTML = gdt_content;
}
function gdt_set_result(clicked_id) {
  gdt_count -= 1;
  document.getElementById(clicked_id).className =
    'btn waves-effect waves-light btn-small orange darken-2';
}
function gdt_display() {
  window.scrollTo(0, 0);
  var gdt_contents = '';
  for (var i = 1; i <= gdt_agegroup[gdt_age - 6]; i++) {
    gdt_contents += `
        <div id = "question${i}" style = "padding: 5px 0px;" class = "center">
            <div style="float:left; width:70%;">
                <img src = "static/GDT/GDT${i}.png" width=600px height=600px />
                
            </div> 
            <div style="float:right; width:30%;">
                <button id ="y${i}" class="btn waves-effect waves-light btn-small teal darken-3" onClick="gdt_set_result_image(this.id)" style="margin-top:260px;">yes</button>
                <button id ="n${i}" class="btn waves-effect waves-light btn-small orange lighten-3" onClick="gdt_set_result_image(this.id)" style="margin-top:260px;">no</button>
            </div>
        </div> 
        `;
    gdt_count_holder.push(1);
  }
  gdt_contents += `
    <div style = "padding: 5px 0px;" class = "center">
        <div style="float:left; width:70%;">
        </div> 
        <div style="float:right; width:30%;">
            <input type = "submit" id = "submit2" class="waves-effect waves-light btn-large" onClick="gdt_finish()"/>
        </div>
    </div> 
    `;
  document.getElementById('change_ui').innerHTML = gdt_contents;
}
function gdt_set_result_image(click_id) {
  var gdt_val = click_id[0];
  var gdt_number = click_id.slice(1);
  if (gdt_val == 'y') {
    gdt_count_holder[gdt_number] = 1;
    document.getElementById(click_id).className =
      'btn waves-effect waves-light btn-small teal darken-3';
    document.getElementById(`n${gdt_number}`).className =
      'btn waves-effect waves-light btn-small orange lighten-3';
  } else {
    gdt_count_holder[gdt_number] = 0;
    document.getElementById(click_id).className =
      'btn waves-effect waves-light btn-small orange darken-2';
    document.getElementById(`y${gdt_number}`).className =
      'btn waves-effect waves-light btn-small teal lighten-3';
  }
}
async function gdt_finish() {
  
  gdt_count = await invokeCloudFunction("getGdtFinish", `gdt_agegroup=${gdt_agegroup}&gdt_age=${gdt_age}&gdt_count_holder=${gdt_count_holder}&gdt_wrong_count=${gdt_wrong_count}&gdt_count=${gdt_count}`);

  window.scrollTo(0, 0);
  var encid = encrypt(val, unique_id, key, iv);
  if (gdt_count == 0) {
    database
      .ref(
        ''+ school + '/Details/' +
          encid +
          '/tests/' +
          (today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate())
      )
      .update({
        gdt: encrypt(val, gdt_count, key, iv)
      });
    gdt_final_result = 0;
    option_loadpage();
  }
  const gdt_q = await fetch('static/GDT/GDT.csv');
  const gdt_data = await gdt_q.text();
  var gdt_rows = gdt_data.split('\n').slice(2);
  gdt_rows.forEach((row, index) => {
    const column = row.split(',');
    if (index == gdt_count) {
      gdt_final_result = column[gdt_age - 3];
    }
  });

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
      gdt: gdt_final_result
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
      gdt: encrypt(val, gdt_final_result, key, iv)
    });
  initial_gdt_value = gdt_final_result;
  option_loadpage();
}
