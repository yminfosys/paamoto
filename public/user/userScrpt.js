$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();
    if(allredyloginuserID){
        $("#login").css({"display":"none"});
        $("#main-content").css({"display":"block"});
        $("#map-content").css({"display": "block"});;
    }else{
        $("#login").css({"display":"block"});
        $("#main-content").css({"display":"none"});
        $("#map-content").css({"display": "none"});
    }

   

})

function getStarted(){
    var mobile=$("#mobile").val().replace(/\s/g, '');
    
    if(mobile.length ==10){
        ///////////Check Exist in bata base///////
        $("#getStarted").html('<button  type="button" id="btnLogin" class="btn btn-block btn-default"><img style="height: 30px; width: 30px;" src="/images/gif/progress.gif"></button>');
        $.post('/user/checkuserexist',{mobile:mobile},function(data){
            
            if(data){
                $("#login-password").css({"display":"block"});
                $("#getStarted").css({"display":"none"})
                $("#myCity").html('I am in '+data.city+'')
                $("#emailaddress").val(data.email);

            }else{
                ////////Send Otp/////
                $.post('/user/otpSend',{mobile:mobile},function(res){
                    
                    console.log(res)
                    if(res.data.Status=="Success"){
                        $("#otp1").val(res.otp)
                        $("#otp-content").css({"display":"block"});
                        $("#getStarted").css({"display":"none"})
                        counDown("countdown",2);
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
    if(Number($("#countdown").text().replace(":",""))>0){
        alert("Please wait up to 2 miutes");
    }else{
        var mobile=$("#mobile").val().replace(/\s/g, '');
        $.post('/user/otpSend',{mobile:mobile},function(res){
            if(res.data.Status=="Success"){
                $("#otp1").val(res.otp)
                alert("Otp send successfully")
                counDown("countdown",2);
            }else{
                alert(res.data.Details);
            }         
        });
    }

}

function userRegister(){
    var mobile=$("#mobile").val().replace(/\s/g, '');
    var otp=$("#otp").val().replace(/\s/g, '');
    var otp1=$("#otp1").val().replace(/\s/g, '');
    var userName=$("#userName").val();
    var password=$("#password").val();
    var email=$("#email").val();
    var reffrom=$("#reffrom").val();
    var refby=$("#refby").val();
    var out=$("#city").val().split(",");

    var city=out[0];
    var state=out[1];
    var country=out[2];
   

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(otp==otp1){
        if(userName.length < 2){
            alert('Enter Valid Name');
            $("#userName").focus()
            return
          }
          if(password.length < 6){
            alert('Password must be 6 to 18 character');
            $("#password").focus()
            return
          }
          if (reg.test(email) == false) 
          {
              alert('Invalid Email Address');
              $("#email").focus();
              return 
          }
            
          if (city.length < 2) 
          {
              alert('Select Your City');
              $("#city").focus();
              return 
          }
        /////////Save User////
        $("#userRegister").html('<button  type="button" id="btnLogin" class="btn btn-block btn-default"><img style="height: 30px; width: 30px;" src="/images/gif/progress.gif"></button>');
        $.post('/user/newuser',{
            userName:userName,email:email,password:password,mobile:mobile,
            reffrom:reffrom,refby:refby,otp:otp,city:city,state:state,country:country
        },function(data){
            if(data){
                alert("Registration Success")
                $("#otp-content").css({"display":"none"});
                $("#login-password").css({"display":"block"});

            }
          })

    }else{
        alert("OTP mismatch")
        $("#otp").focus();
    }




}

function userlogin(){
    
    var psw=$("#psw").val();
    var  mobile=$("#mobile").val();
    $("#userlogin").html('<button  type="button" id="btnLogin" class="btn btn-block btn-default"><img style="height: 30px; width: 30px;" src="/images/gif/progress.gif"></button>');
    $.post('/user/userlogin',{psw:psw,mobile:mobile},function(match){
        if(match){
            //////////Procede to map/////
            $("#login").css({"display":"none"});
            $("#main-content").css({"display":"block"});
            $("#map-content").css({"display": "block"});

        }else{
            /////////Passwor Not Match/////
            alert("Password Not Match Try Again")
            $("#userlogin").html('<button onclick="userlogin()" type="button" id="btnLogin" class="btn btn-block btn-default">Login <i class="fa fa-arrow-right" aria-hidden="true"></i></button>');
            $("#psw").val('')
            $("#psw").focus();
        }
    })


}

function forgetpassword(){
    $("#forgetpassword").html('<span onclick="forgetpassword()" style="padding: 1vh; border-radius: 5vh; color: #FFF; border: 2px solid rgb(14, 5, 9); background-color: rgb(63, 13, 13);"><img style="height: 30px; width: 30px;" src="/images/gif/progress.gif"></span>')
    var emailaddress=$("#emailaddress").val();
    $.post('/user/emailSend',{emailaddress:emailaddress},function(res){
        console.log(res);
        $("#login-password").css({"display":"none"})
        $("#changePassword").css({"display":"block"})
        $("#verifyOTP").val(res.otp)

        alert("OTP Send to "+emailaddress+" email address check it")
        counDown("countdown1",2);
    })

}

function changereSendOtp(){
    var emailaddress=$("#emailaddress").val();

    if(Number($("#countdown1").text().replace(":",""))>0){
        alert("Please wait up to 2 miutes");
    }else{
        $.post('/user/emailSend',{emailaddress:emailaddress},function(res){
            console.log(res);
            $("#changePassword").css({"display":"block"})
            $("#verifyOTP").val(res.otp)
    
            alert("OTP Send to "+emailaddress+" email address check it")
            counDown("countdown1",2);
        })
    }
    
}

function counDown(div,tim){
    clearInterval(timer);
        var timer;
        var count = 60*tim; 
        timer=setInterval(function(){
            count=count-1;
            var min=parseInt(count/60);
            var sec=(count % 60);
            if(sec < 10){
                sec='0'+sec+'';
            }
            $("#"+div+"").html(''+min+':'+sec+'')
            if(count < 0){
                clearInterval(timer);
                $("#"+div+"").html('0:00')
            }
        },1000);
    }


    function refferenceCall(){  
        var ref=$("#reffrom").val();
        if(ref=="News" || ref=="1"){
          $("#ref-by-content").css({"display": "none"})
        }else{
          $("#ref-by-content").css({"display": "block"})
        }
      }


      function profileNave(){
        $("#profile-nave").css({"display": "block"})

        $("#main-content").css({"display": "none"})
        $("#map-content").css({"display": "none"})
      }

      function closeaProfileNave(){
        $("#profile-nave").css({"display": "none"})
        $("#main-content").css({"display": "block"})
        $("#map-content").css({"display": "block"})

      }

      function logout(){
        $.post('/user/logout',{},function(data){
            window.location.href ='/user'
        })
      }

   function dropLocation(){
    if($("#picuplocation").val().length > 5){
        $("#main-content").css({"display": "none"});
        $("#main-content-2").css({"display": "block"});
        $("#map-area").css({"height": "80vh", "position": "absolute","top":"22vh"});
    }else{
        alert("Please wait while  Loding....")
    }
    

   }  
   
   function backpage(page){
        switch (page){

            case 1:
                alert("1")
                $("#main-content").css({"display": "block"});
                $("#map-content").css({"display": "block"});
                $("#map-area").css({"height": "20vh","position": "relative", "top":"0"});
                $("#main-content-2").css({"display": "none"});
                break;
            case 2:
                alert("2")
                $("#main-content-2").css({"display": "block"});
                $("#map-area").css({"height": "80vh", "position": "absolute","top":"22vh"});
                $("#main-content-3").css({"display": "none"});  
                break;
            case 3: 
                    /////
                    alert("3")
                    $("#main-content-2").css({"display": "block"});
                    break;

        }

   }

   var timerr;
   function searchdown(searchmod){
    clearTimeout(timerr)
    }

    var arrayDistinc=[];
    function searchup(searchmod){
        clearTimeout(timerr)
        timerr=setTimeout(function(){
            $("#searchList").css({"display":"block"});
            if(searchmod==2){
                ///////Drop location
                arrayDistinc=[]; 
                    $.post('/user/searchfromBuffer',{ serchText:$("#droplocation").val()},  function(data){
                        if(data.length > 0){
                        $("#placeList").html('<a class="list-group-item active"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; Serch Result</a>')
                        data.forEach( async function(val){
                            var b=arrayDistinc.indexOf(val.formated_address);
                                    if(b < 0){
                                    arrayDistinc.push(val.formated_address);
                                    if(arrayDistinc.length < 4){
                                        await $("#placeList").append('<a id="abc" class="list-group-item saveGeocode"> '+val.formated_address+' <input id="ads" type="hidden" value="'+val.formated_address+'"/> <input id="lat" type="hidden" value="'+val.location.coordinates[1]+'"/> <input id="lng" type="hidden" value="'+val.location.coordinates[0]+'"/> </a>')

                                    }
                                    
                                    }
                        })
                        $("#placeList").append('<a id="abc" onclick="moreSerchlocation(\''+$("#droplocation").val()+'\')" class="list-group-item list-group-item-warning"> <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; More</a>')
                        }else{
                            $("#placeList").html('')
                             ////////Search from Google APi//////
                             searchGoogleAutocomplete($("#droplocation").val())
                             
                        }
                    })




            }else{
                ///Pickup Location/////
                $.post('/user/searchfromBuffer',{ serchText:$("#picuplocation").val()},  function(data){
                    if(data.length > 0){
                    $("#placeList").html('<a class="list-group-item active"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; Serch Result</a>')
                    data.forEach( async function(val){
                        var b=arrayDistinc.indexOf(val.formated_address);
                                if(b < 0){
                                arrayDistinc.push(val.formated_address);
                                if(arrayDistinc.length < 4){
                                    await $("#placeList").append('<a id="abc" class="list-group-item saveGeocode"> '+val.formated_address+' <input id="ads" type="hidden" value="'+val.formated_address+'"/> <input id="lat" type="hidden" value="'+val.location.coordinates[1]+'"/> <input id="lng" type="hidden" value="'+val.location.coordinates[0]+'"/> </a>')

                                }
                                
                                }
                    })
                    $("#placeList").append('<a id="abc" onclick="moreSerchlocation(\''+$("#picuplocation").val()+'\')" class="list-group-item list-group-item-warning"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; More</a>')
                    }else{
                        $("#placeList").html('')
                        ////////Search from Google APi//////
                        searchGoogleAutocomplete($("#picuplocation").val())
                    }
                })

                

            }

        },1000);
    }

    function moreSerchlocation(searchText){
        searchGoogleAutocomplete(searchText);
    }

/////////////////////////////////////////////////////////////
//////Search From Google API  Autocomplete///////////////////
/////////////////////////////////////////////////////////////

function searchGoogleAutocomplete(searchText){
    var pickuplat=$("#pickuplat").val();
    var pickuplng=$("#pickuplng").val();
    var origin={lat:Number(pickuplat),lng:Number(pickuplng)};
    var location=''+origin.lat+' ,'+origin.lng+'';
    $("#searchList").css({"display":"block"});
    $("#placeList").html('<a class="list-group-item active"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; Serch Result</a>')
    $.post('/user/placesearchAutocomplete',{quary:searchText,location:location},function(data){ 
        if(data.status=='OK'){
            data.predictions.forEach(async function(val,indx){
                await $("#placeList").append('<a id="abc" class="list-group-item searchItem"> '+val.description+' <input type="hidden" value="'+val.place_id+'"/> </a>') 

            })

            $("#placeList").append('<a id="abc" onclick="selectFromMap()"  class="list-group-item list-group-item-success"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; Select From Map</a>')


        }
    })
  
}

function selectFromMap(){
    $("#searchList").css({"display":"none"})
    mapDrag="Enable";
}
