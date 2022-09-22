function cityandprice(){ 
    $("#cityPriceModule").html('<div class="col-md-10  col-md-offset-1 ">\
    <div class="panel panel-success">\
          <div class="panel-heading">\
                <h3 class="panel-title">City And Price List</h3>\
          </div>\
          <div id="cityPriceList" class="panel-body">\
            <div class="row">\
                <div class=" col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
                    <div class="form-group" style="width: 75%;">\
                        <select name="" id="cityList" class="form-control" onchange="getCityPriceList()" >\
                        <option value="">Select City</option>\
                        </select>\
                    </div>\
                    <button type="button" class="btn btn-primary" onclick="creatNewCityInit()">Create New City</button>\
                </div>\
            </div>\
         </div>\
    </div>\
</div>')
cityList()
}


function cityList(){
    $.post('/admin/cityList',{},function(data){
       data.forEach(val => {
           $("#cityList").append('<option value="'+val.city+'">'+val.city+'</option>')
       }); 
    })
}


function creatNewCityInit(){
    $("#cityPriceList").html('<div class=" col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">\
                <div class="col-sm-6">\
                    <label>City Name :</label>\
                    <input type="text"  id="city" class="form-control" value="" placeholder="City Name"  >\
                </div>\
                <div class="col-sm-6">\
                    <label>In Which Branch :<button type="button" class="btn btn-xs btn-success" onclick="creatNewBranchInit()">Create New Branch</button></label>\
                    <select name="" id="branch" class="form-control" >\
                    <option value="">Select Branch</option>\
                    </select>\
                </div>\
                <div class="col-sm-2" style="margin-top: 20px;">\
                <button type="button" class="btn btn-success" onclick="creatNewCity()">Create</button>\
                </div>\
            </div>');
            branchList();
}

function creatNewCity(){
    var data = $("#branch").val().toString().split(",");
    var branch=data[0];
    var state=data[1];
    var country=data[2];
    var city =$("#city").val().trim();
    if(city){

        $.post('/admin/newCity',{
            branch:branch,
            country:country,
            state:state,
            city:city
        },function(res){
            cityandprice();
        })

    }else{
        alert("enter city")
    }


}

function branchList(){
    $.post('/admin/branch',{},function(data){
        console.log(data)
       data.forEach(val => {
           $("#branch").append('<option value="'+val.branch+','+val.state+','+val.country+'">'+val.branch+'</option>')
       }); 
    })
}

function creatNewBranchInit(){
    $("#cityPriceList").html('<div class=" col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">\
                <div class="col-sm-12">\
                    <label>Branch Name :</label>\
                    <input type="text"  id="branchName" class="form-control" value="" placeholder="Branch Name"  >\
                </div>\
                <div class="col-sm-12">\
                    <label>State :</label>\
                    <input type="text"  id="stateName" class="form-control" value="West Bengal" placeholder="State Name"  >\
                </div>\
                <div class="col-sm-12">\
                    <label>Country :</label>\
                    <input type="text"  id="countryName" class="form-control" value="India"  >\
                </div>\
                <div class="col-sm-12" style="margin-top: 20px;">\
                <button type="button" class="btn btn-success" onclick="creatNewBranch()">Create</button>\
                </div>\
            </div>')
}



function creatNewBranch(){
    var branchName=$("#branchName").val().trim(); 
    var stateName=$("#stateName").val().trim(); 
    var countryName=$("#countryName").val().trim(); 
    if(branchName && stateName && countryName){
        $.post('/admin/addNewBranch',{
            branch:branchName,
            country:countryName,
            state:stateName,
        },function(data){
           if(data=="ok"){
            creatNewCityInit();
           }else{
               alert("Branch Exist")
           } 
        })
    }else{
        alert("Enter Branch")
    }
    
}