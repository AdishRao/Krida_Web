function result_loadpage()
{   
    var contents = 
    `<div style='background-color:black; width:50px; height:100px;'>
        <img src="" alt="" width="" height="">
    </div>
    <div style='margin-top:8%;padding:0px 10px;'>
        <table id='add_result' style="border: 5px solid teal;">
        </table>
    </div>
    <div class="row center">
        <div class="col s4"></div>
        <div class="col s4">
            <button id="return" class="btn-large waves-effect waves-light btn-small orange darken-2" onClick="option_loadpage()" style="min-width:310px;margin-top:10px;">BACK</button>
        </div>
    </div>
    `;
    document.getElementById("change_ui").innerHTML = contents;
    var inner_contents = 
    `
    <tr class="lighten-5 teal">
        <td>Test Name</td><td>Score</td><td>Assessment</td>
    </tr> 
    `;
    var strid  = '';
    if(initial_vl_value!=-1)
    {
        if (initial_vl_value<20)
        {strid = "Profound Intellectual Disability";}
        else if (initial_vl_value <35)
            {strid = "Severe Intellectual Disability";}
        else if (initial_vl_value <50)
            {strid = "Moderate Intellectual Disability";}
        else if (initial_vl_value < 70)
            {strid = "Mild Intellectual Disability";}
        else if (initial_vl_value < 90)
            {strid = "Borderline Intellectual Disability";}
        else {strid = "Not Intellectual Disability";}
        inner_contents+=
        `
        <tr>
            <td>Vineland Scale</td><td>${initial_vl_value}</td><td>${strid}</td>
        </tr> 
        `;
    }
    if(initial_bst_value!=-1)
    {
        if (initial_bst_value<20)
            {strid = "Profound Intellectual Disability";}
        else if (initial_bst_value <35)
            {strid = "Severe Intellectual Disability";}
        else if (initial_bst_value <50)
            {strid = "Moderate Intellectual Disability";}
        else if (initial_bst_value < 70)
            {strid = "Mild Intellectual Disability";}
        else if (initial_bst_value < 90)
            {strid = "Borderline Intellectual Disability";}
        else {strid = "Not Intellectual Disability";}
        inner_contents+=
        `
        <tr>
            <td>Binet Simon Test</td><td>${initial_bst_value}</td><td>${strid}</td>
        </tr> 
        `;
    }
    if(initial_gdt_value!=-1)
    {
        if (initial_gdt_value<20)
        {strid = "Intellectual Disability";}
        else {strid = "Not Intellectual Disability";}
        inner_contents+=
        `
        <tr>
            <td>Gessel's  Drawing Test</td><td>${initial_gdt_value}</td><td>${strid}</td>
        </tr> 
        `;
    }
    if(initial_rpm_value!=-1)
    {
        if (initial_rpm_value<26)
        {strid = "Intellectual Disability";}
        else {strid = "Not Intellectual Disability";}
        inner_contents+=
        `
        <tr>
            <td>Raven's Progressive Matrix</td><td>${initial_rpm_value}</td><td>${strid}</td>
        </tr> 
        `;
    }
    document.getElementById("add_result").innerHTML = inner_contents;
}