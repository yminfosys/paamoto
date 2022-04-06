

function getStarted(){
    var mobile=$("#mobile").val().replace(/\s/g, '');
   
    if(mobile.length ==10){
        ///////////Check Exist in bata base///////
        $.post('/user/checkuserexist',{mobile:mobile},function(data){
            console.log(data);
            if(data){

            }else{
                ////////Send Otp/////
                $.post('/user/otpSend',{mobile:mobile},function(res){
                    counDown("divId");
                    console.log(res)
                    if(res.data.Status=="Success"){

                    }else{
                        alert(res.data.Details);
                    }
                    
                })
            }
        })

    }else{
        alert("Enter curect mobile number");
        $("#mobile").focus()

    }
}

function reSendOtp(){
    $.post('/user/sendOtp',{mobile:mobile},function(otp){
                    
    })

}

function userRegister(){

}

function userLogin(){

}

function counDown(){
    $("#countdown").html('01')
}