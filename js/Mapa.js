function iniciarMap() {
    var coord = {lat: 10.1497634, lng: -84.3902599};
    var map = new google.maps.Map($("#map")[0], {
      zoom: 10,
      center: coord
    });

    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Tu ubicación"
        });

        var request = {
          origin: userLocation,
          destination: coord,
          travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            alert("No se pudo calcular la ruta.");
          }
        });
      }, function() {
        alert("No se pudo obtener tu ubicación.");
      });
    } else {
      alert("La geolocalización no está soportada por este navegador.");
    }
  }

  $(document).ready(function() {
    window.iniciarMap = iniciarMap;
  });