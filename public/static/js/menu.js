function option_loadpage()
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
            <div style="margin-top:15%;">
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
                <button id="new_child" class="btn-large waves-effect waves-light btn-small orange darken-2" onClick="load_options()" style="min-width:310px;margin-top:10px;">New Student</button>

            </div>
        </div>
    `;
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
