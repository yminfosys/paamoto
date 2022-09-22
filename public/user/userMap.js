var CenterChange='Enable';
var forcelySetPicuploction="Deseble";
var mapDrag="Deseble";
var centerMarker;
var circle;
var wachID;
var interval;
var placetimer;
var mrkerTimer;
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
         polylineOptions:{strokeColor:"#36301e",strokeWeight:2}, 
         suppressMarkers:true 
        });
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 23.5659115, lng: 87.2727577},
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    });
    directionsDisplay.setMap(map);


       ////// Watch Position ///////////
       wachLocation();
       function wachLocation(){
         wachID=navigator.geolocation.watchPosition(function (position){
         ////////Call Circle Center Marker
         
         var pos={lat:position.coords.latitude,lng:position.coords.longitude};


         findPlaceModule(pos)
         
         console.log("watch",pos);
          circleMarker(position);

        // driverMarkes(); 

        //  if(forcelySetPicuploction=="Enable"){
        //    //findPlaceBylntlng(pos,"force");
        //    forcelySetPicuploction="Deseble";
        //  }else{
        //    //findPlaceBylntlng(pos,"normal");
        //  }

        
         
         
         },function error(msg){
             alert('Please enable your GPS position future.');       
         },{maximumAge:600000, timeout:5000, enableHighAccuracy: true});
     }

       ////////Clear Watchposition/////////
    function clearWachposition(){
      if (wachID != null) {
          navigator.geolocation.clearWatch(wachID);
          wachID = null;
        }
      }
      ////////Center AND Crircel Marker///////
      function circleMarker(position){
        var pos={lat:position.coords.latitude,lng:position.coords.longitude};
         if(!centerMarker){
           map.setCenter(pos);
            centerMarker=new google.maps.Marker({
            position: pos, 
           //icon:'http://www.robotwoods.com/dev/misc/bluecircle.png',
           icon:new google.maps.MarkerImage('/images/other/bluecircle.png',
                                            new google.maps.Size(50,50),
                                           new google.maps.Point(0,0),
                                            new google.maps.Point(8,8)),
            map:map
          
          });
          circle = new google.maps.Circle({
            map: map,
            radius:position.coords.accuracy, ///   // 10 miles in metres
            fillColor: 'rgb(73, 136, 161)',
            strokeColor:'rgb(198, 232, 235)',
            
          });
        circle.bindTo('center', centerMarker, 'position')
        map.setZoom(14);
  
          ///////Add CenterMArker pin////////
          $('<div/>').addClass('centerMarker').appendTo(map.getDiv());
          //////End Circle Marker//////
  
          ////////coseing-msg//////////
         // $('#coseing-msg').addClass('coseing-msg').appendTo(map.getDiv());
          ////////
                
          }else{
            centerMarker.setPosition(pos);
            
              map.setCenter(pos)
              
                     
            
            map.setZoom(14); 
            circle.setRadius(position.coords.accuracy); 
          }
        
      } 


////////////Search Pickup And Drop Locations////////////
document.getElementById("picuplocation").addEventListener("click", function(){
  clearWachposition();
  $("#ModeofSearch").val('0');
  $("#picuplocation").select();
  //CenterChange='Enable';
});
document.getElementById("droplocation").addEventListener("click", function(){
  clearWachposition();
  $("#ModeofSearch").val('1');
  $("#droplocation").select();
  //CenterChange='Enable';
  ///////////call User Most Recent Serch Result//////////
  if($("#droplocation").val().length < 1){
    recentSearchResult();
  }
 
});

document.getElementById("placeList").addEventListener("click", function(e) {
  var searchmod=$("#ModeofSearch").val();
  if (e.target && e.target.matches("a.saveGeocode")) {
    
    if(searchmod=='0'){
       $("#picuplocation").val(e.target.querySelector('#ads').value);
       $("#pickuplat").val(e.target.querySelector('#lat').value);
       $("#pickuplng").val(e.target.querySelector('#lng').value);
      // pickupMarker.setPosition({lat:Number(e.target.querySelector('#lat').value),lng:Number(e.target.querySelector('#lng').value)})
      // pickupwindow.open(map, pickupMarker);
      
    }else{
     $("#droplocation").val(e.target.querySelector('#ads').value);
     $("#droplat").val(e.target.querySelector('#lat').value);
     $("#droplng").val(e.target.querySelector('#lng').value);
    // dropMarker.setPosition({lat:Number(e.target.querySelector('#lat').value),lng:Number(e.target.querySelector('#lng').value)});
     //dropwindow.open(map, dropMarker);
     gotoOrderPage();
    }
    

}

if (e.target && e.target.matches("a.searchItem")) {

  $.post('/user/placeidtogeocod',{placeid:e.target.querySelector('input').value},function(data){
    if(data.status=='OK'){
      var geoloc=data.results[0].geometry.location
      var placeID=data.results[0].place_id
      console.log("geoloc", geoloc)
      findPlaceModule(geoloc)
      
    }
  });

}
});


  ///////// Map Grag /////////////
  var centertimer;
  
  google.maps.event.addListener(map, 'drag', function() {
    clearWachposition();
   
    clearTimeout(centertimer);
    centertimer=setTimeout(function(){
      if(mapDrag=="Enable"){
        findPlaceModule({lat:map.getCenter().toJSON().lat,lng:map.getCenter().toJSON().lng});
      }
      
     },300);
    
  
  });


 ///////// User Most Recent Serch Result//////////
 var arrayDistinc=[];
 function recentSearchResult(){
 
  arrayDistinc=[]; 
  $.post('/user/recentsearch',{},  function(data){
    if(data.length > 0){
      $("#searchList").css({"display":"block"});
      $("#placeList").html('<a class="list-group-item active"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; Recent Serch</a>')
      data.forEach( async function(val){
        var b=arrayDistinc.indexOf(val.formated_address);
                if(b < 0){
                  arrayDistinc.push(val.formated_address);
                 await $("#placeList").append('<a id="abc" class="list-group-item saveGeocode"> '+val.formated_address+' <input id="ads" type="hidden" value="'+val.formated_address+'"/> <input id="lat" type="hidden" value="'+val.location.coordinates[1]+'"/> <input id="lng" type="hidden" value="'+val.location.coordinates[0]+'"/> </a>')
                }
      })
    }
  })

 };


////////////////////////////////////////////////////////////
///////////////FIND PLACE MODULE////////////////////////////
///////////////////////////////////////////////////////////
     
      var placeSignal="Enable";
        function findPlaceModule(pos){
          var searchmod=$("#ModeofSearch").val();
          if(searchmod=='0'){
            if(placeSignal=="Enable"){
              placeSignal="Deseble"
               $.post('/user/findPlace',{lat:pos.lat,lng:pos.lng,type:"pickup"},  function(res){
                placeSignal="Enable"
                $("#picuplocation").val(res);
                $("#pickuplat").val(pos.lat);
                $("#pickuplng").val(pos.lng);
             })
            }

          }else{
            if(placeSignal=="Enable"){
              placeSignal="Deseble"
               $.post('/user/findPlace',{lat:pos.lat,lng:pos.lng,type:"pickup"},  function(res){
                placeSignal="Enable"
                $("#droplocation").val(res);
                $("#droplat").val(pos.lat);
                $("#droplng").val(pos.lng);

                ////////////continue Next Page ////////

                gotoOrderPage();
             })
            }

          }
          
         
        }

  var dropMarker=new google.maps.Marker({        
    // icon:'http://www.robotwoods.com/dev/misc/bluecircle.png',
      icon:new google.maps.MarkerImage('/images/other//drop.png',
                                      new google.maps.Size(50,50),
                                      new google.maps.Point(0,0),
                                      new google.maps.Point(25,50)),
      map:map
    
    });
  var pickupMarker=new google.maps.Marker({        
  // icon:'http://www.robotwoods.com/dev/misc/bluecircle.png',
  icon:new google.maps.MarkerImage('/images/other/pickup.png',
                                  new google.maps.Size(50,50),
                                  new google.maps.Point(0,0),
                                  new google.maps.Point(25,50)),
  map:map
  
  
  });
  
  


  ///////////////Direction rood Service/////
function directionRooteService(orgn,dist,mode, cb){
  if(mode=='1'){
    var reqst={
      origin: {lat:Number(orgn.lat) ,lng: Number(orgn.lng)},
      destination: {lat:Number(dist.lat) ,lng: Number( dist.lng)},
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.METRIC
    }

  }else{
    var reqst={
      origin: {lat:Number(orgn.lat) ,lng: Number(orgn.lng)},
      destination: {lat:Number(dist.lat) ,lng: Number( dist.lng)},
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      drivingOptions: {
      departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
      trafficModel: 'optimistic'
    }

    }
  }
 
directionsService.route(reqst, function(response, status) {
    if (status === 'OK') {
      //console.log("Direction respons",response);      
      directionsDisplay.setDirections(response); 
      var distt=response.routes[0].legs[0].distance.value;
      var time=response.routes[0].legs[0].duration_in_traffic.value;
      cb({distance:distt,time:time});
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



//////////////gotoOrderPage(////////////////
function gotoOrderPage(){
 $("#main-content-2").css({"display":"none"});
 mapDrag="Deseble";
 $("#map-area").css({"height": "25vh", "position": "absolute","top":"2vh"});
 $("#main-content-3").css({"display":"block"});

 $(".centerMarker").css({"display":"none"})

 var pickuplat=$("#pickuplat").val();
 var pickuplng=$("#pickuplng").val();
 var droplat=$("#droplat").val();
 var droplng=$("#droplng").val();

 var dropLocation= $("#droplocation").val();
 var picupcacation=$("#picuplocation").val();

 var origin={lat:Number(pickuplat),lng:Number(pickuplng)} ;
 var dist={lat:Number(droplat),lng:Number(droplng)};

 directionRooteService(origin,dist,2,function(resp){
  console.log("direction Responce", resp )
  var alldist=parseInt(Number(resp.distance)/1000) + 1; 
  var time=Number(resp.time)/60;

 })

 var pickupwindow = new google.maps.InfoWindow({
  content: picupcacation.substring(0,18)
  });
  var dropwindow = new google.maps.InfoWindow({
  content: dropLocation.substring(0,18)
  });

 pickupMarker.setPosition(origin)

 pickupwindow.open(map, pickupMarker);

 dropMarker.setPosition(dist);
 
 dropwindow.open(map, dropMarker);
 


}
      


}
// End Init Map/////