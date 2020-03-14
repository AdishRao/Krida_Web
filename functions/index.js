// Project Console: https://console.firebase.google.com/project/krida-db/overview

const functions = require('firebase-functions');

var rpm_answers = [
    [4, 5, 1, 2, 6, 3, 6, 2, 1, 3, 5, 4],
    [2, 6, 1, 2, 1, 3, 5, 6, 4, 3, 4, 5],
    [8, 2, 3, 8, 7, 4, 5, 1, 7, 6, 1, 2],
    [3, 4, 3, 7, 8, 6, 5, 4, 1, 2, 5, 6],
    [7, 6, 8, 2, 1, 5, 2, 4, 1, 6, 3, 5]
];

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

exports.getGdtFinish = functions.https.onRequest((request, response) => {
    response.set('Access-control-Allow-Origin', '*');
    
    //console.log("query: ", request.query);
    
    var gdt_agegroup = request.query.gdt_agegroup.split(',').map(Number);
    var gdt_age = Number(request.query.gdt_age);
    var gdt_count_holder = request.query.gdt_count_holder.split(',').map(Number);
    var gdt_wrong_count = Number(request.query.gdt_wrong_count);
    var gdt_count = Number(request.query.gdt_count);

    /*console.log("gdt_agegroup", gdt_agegroup);
    console.log("gdt_age", gdt_age);
    console.log("gdt_count_holder", gdt_count_holder);
    console.log("gdt_wrong_count", gdt_wrong_count);
    console.log("gdt_count", gdt_count);*/

    for (var i = 1; i <= gdt_agegroup[gdt_age - 6]; i++) {
        if (gdt_count_holder[i] === 0) {
          gdt_wrong_count += 1;
        }
       }
    gdt_count = gdt_count + gdt_agegroup[gdt_age - 6] - gdt_wrong_count;     
    //console.log("new gdt_count",gdt_count)
    
    response.send(gdt_count.toString());
});


exports.getRpmScore = functions.https.onRequest((request, response) => {
    response.set('Access-control-Allow-Origin', '*');
    
    console.log("query: ", request.query);
    
    var rpm_result = request.query.rpm_result.split(',').map(Number);
    var rpm_section_no = Number(request.query.rpm_section_no);
    var rpm_score = Number(request.query.rpm_score);

    // console.log("rpm_result", rpm_result);
    // console.log("rpm_answers", rpm_answers);
    // console.log("rpm_section_no", rpm_section_no);
    // console.log("rpm_score", rpm_score);

    for (var i = 0; i < 12; i++) {
        if (rpm_result[i] === rpm_answers[rpm_section_no][i]) {
          rpm_score += 1;
        }
      }
    console.log("rpm_score", rpm_score);    

    response.send(rpm_score.toString());
});

exports.getVlCalcRes = functions.https.onRequest((request, response) => {
  response.set('Access-control-Allow-Origin', '*');
  
  //console.log("query: ", request.query);
  
  var vl_ques_range = request.query.vl_ques_range.split(',').map(Number);
  var vl_current_age_question_set = Number(request.query.vl_current_age_question_set);
  var vl_res = request.query.vl_res.split(',').map(Number);
  var vl_no_of_wrong = Number(request.query.vl_no_of_wrong);
  var flag = (request.query.flag === "true");
  var j = Number(request.query.j);
  var vl_last_correct_ques = Number(request.query.vl_last_correct_ques);


  // console.log("vl_ques_range", vl_ques_range);
  // console.log("vl_current_age_question_set", vl_current_age_question_set);
  // console.log("vl_res", vl_res);
  // console.log("vl_no_of_wrong", vl_no_of_wrong);
  // console.log("flag", flag);
  // console.log("j", j);
  // console.log("vl_last_correct_ques", vl_last_correct_ques);


  // BUSINESS LOGIC
  for (
    var i = 0;
    i <
    vl_ques_range[vl_current_age_question_set + 1] -
      vl_ques_range[vl_current_age_question_set];
    i++
  ) {
    if (vl_res[i] === 0) {
      vl_no_of_wrong += 1;
    } else {
      flag = true;
      vl_last_correct_ques = j;
    }
    j += 1;
  }
  vl_current_age_question_set += 1;
  
  var res = {
    "vl_ques_range" : vl_ques_range,
    "vl_current_age_question_set" : vl_current_age_question_set,
    "vl_res" : vl_res,
    "vl_no_of_wrong" : vl_no_of_wrong,
    "flag" : flag,
    "j" : j,
    "vl_last_correct_ques": vl_last_correct_ques
  }

  //console.log("res", res);

  response.send(JSON.stringify(res));
});

exports.getVlSocialQuotient = functions.https.onRequest((request, response) => {
  response.set('Access-control-Allow-Origin', '*');
  
  //console.log("query: ", request.query);
  
  var vl_ques_range = request.query.vl_ques_range.split(',').map(Number);
  var vl_current_age_question_set = Number(request.query.vl_current_age_question_set);
  var vl_no_of_wrong = Number(request.query.vl_no_of_wrong);
  var vl_final_score = Number(request.query.vl_final_score);
  var vl_no_correct = Number(request.query.vl_no_correct);
  var vl_social_quotient = Number(request.query.vl_no_correct);
  var vl_age = Number(request.query.vl_age);
  var vl_last_correct_ques = Number(request.query.vl_last_correct_ques);

  /*console.log("vl_ques_range", vl_ques_range);
  console.log("vl_current_age_question_set", vl_current_age_question_set);
  console.log("vl_no_of_wrong", vl_no_of_wrong);
  console.log("vl_final_score", vl_final_score);
  console.log("vl_no_correct", vl_no_correct);
  console.log("vl_social_quotient", vl_social_quotient);
  console.log("vl_age", vl_age);
  console.log("vl_last_correct_ques", vl_last_correct_ques);*/

  // BUSINESS LOGIC
  vl_no_of_wrong =
  vl_no_of_wrong -
  (vl_ques_range[vl_current_age_question_set + 1] -
    1 -
    vl_last_correct_ques);
vl_final_score = vl_SA_mapping[vl_last_correct_ques - vl_no_of_wrong + 1];
vl_no_correct = vl_last_correct_ques - vl_no_of_wrong + 1;
vl_social_quotient = (vl_final_score / vl_age) * 100;

  var res = {
    "vl_ques_range" : vl_ques_range,
    "vl_current_age_question_set" : vl_current_age_question_set,
    "vl_no_of_wrong" : vl_no_of_wrong,
    "vl_final_score" : vl_final_score,
    "vl_no_correct" : vl_no_correct,
    "vl_social_quotient" : vl_social_quotient,
    "vl_age" : vl_age,
    "vl_last_correct_ques": vl_last_correct_ques
  }

  //console.log("res", res);

  response.send(JSON.stringify(res));
});

exports.getBstFinalResult = functions.https.onRequest((request, response) => {
  response.set('Access-control-Allow-Origin', '*');
  
  //console.log("query: ", request.query);
  
  var bst_basal_age = Number(request.query.bst_basal_age);
  var bst_age = Number(request.query.bst_age);
  var bst_additive_age = Number(request.query.bst_additive_age);
  
  /*console.log("bst_basal_age", bst_basal_age);
  console.log("bst_age", bst_age);
  console.log("bst_additive_age", bst_additive_age);*/
  
  // BUSINESS LOGIC
  while (bst_additive_age >= 12) {
    bst_basal_age += 1;
    bst_additive_age -= 12;
  }
  bst_final_result =
    ((bst_basal_age * 12 + bst_additive_age) / (bst_age * 12)) * 100;

  var res = {
    "bst_basal_age" : bst_basal_age,
    "bst_age" : bst_age,
    "bst_additive_age" : bst_additive_age,
    "bst_final_result" : bst_final_result
  }

  //console.log("res", res);

  response.send(JSON.stringify(res));
});

exports.getBstFlag = functions.https.onRequest((request, response) => {
  response.set('Access-control-Allow-Origin', '*');
  
  //console.log("query: ", request.query);
  
  var bst_question_count = Number(request.query.bst_question_count);
  var bst_temp_res = request.query.bst_temp_res.split(',').map(Number);
  
  /*console.log("bst_question_count", bst_question_count);
  console.log("bst_temp_res", bst_temp_res);*/
  
  // BUSINESS LOGIC
  flag = false;
  all_correct = true;
  var limit;

  if (bst_question_count !== 1) {
    limit = 5;
  } else {
    limit = 4;
  }
  for (var i = 0; i < limit; i++) {
    if (bst_temp_res[i] === 1) {
      flag = true;
    }
    if (bst_temp_res[i] === 0) {
      all_correct = false;
    }
  }

  var res = {
    "flag" : flag,
    "all_correct" : all_correct
  }

  //console.log("res", JSON.stringify(res));

  response.send(JSON.stringify(res));
});

exports.getBstCalcRes = functions.https.onRequest((request, response) => {
  response.set('Access-control-Allow-Origin', '*');
  
  //console.log("query: ", request.query);
  
  var all_correct = false;
  if (request.query.all_correct.localeCompare("true") === 0){
    all_correct = true;
  }
  var bst_question_count = Number(request.query.bst_question_count);
  var bst_temp_res = request.query.bst_temp_res.split(',').map(Number);
  var bst_basal_age = Number(request.query.bst_basal_age);
  var bst_additive_age = Number(request.query.bst_additive_age);
  
  /*console.log("all_correct", all_correct);
  console.log("bst_question_count", bst_question_count);
  console.log("bst_temp_res", bst_temp_res);
  console.log("bst_basal_age", bst_basal_age);
  console.log("bst_additive_age", bst_additive_age);*/

  var i;
  // BUSINESS LOGIC
  if (all_correct === true) {
    bst_basal_age += 1;
  } else if (bst_question_count === 1) {
    for (i = 0; i < 4; i++) {
      if (bst_temp_res[i] === 1) {
        bst_additive_age += 3;
      }
    }
  } else {
    for (i = 0; i < 5; i++) {
      if (bst_temp_res[i] === 1) {
        bst_additive_age += 2.4;
      }
    }
  }
  bst_question_count += 1;

  var res = {
    "bst_basal_age" : bst_basal_age,
    "bst_additive_age" : bst_additive_age,
    "bst_question_count" : bst_question_count,
    "all_correct" : all_correct
  }

  //console.log("res", JSON.stringify(res));

  response.send(JSON.stringify(res));
});