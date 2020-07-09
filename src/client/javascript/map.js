function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(28.538,77.385),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("map"),mapProp);
    }