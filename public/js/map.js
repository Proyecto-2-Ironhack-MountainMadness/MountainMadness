let poly;
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 40.4167, lng: -3.70325 },
    mapTypeId: "terrain",
  });

  // infoWindow = new google.maps.InfoWindow;
  poly = new google.maps.Polyline({
    path: window.points
      ? window.points.map(function (point) {
          return {
            lat: point[1],
            lng: point[0],
          };
        })
      : null,
    geodesic: true,
    strokeColor: "red",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    draggable: true,
  });

  if (window.points) {
    poly;
    var bounds = new google.maps.LatLngBounds();

    window.points.forEach(function (location) {
      var position = new google.maps.LatLng(location[1], location[0]);
      new google.maps.Marker({
        icon: "https://res.cloudinary.com/drls3a8oi/image/upload/v1615588404/IRON%20HACK/MountainMadness/placasdasdasdasaaaaaaaaseholder_cnkuun.png",
        position: position,
        map: map,
      });
      bounds.extend(position);
    });

    map.fitBounds(bounds);
  }

  poly.setMap(map);
  // Add a listener for the click event
  if (
    window.location.href.includes("create") ||
    window.location.href.includes("edit")
  ) {
    map.addListener("click", addLatLng);
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function addLine() {
  poly.setMap(map);
}



function removeLine() {
  poly.setMap(null);
}


// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  console.log(event)
  const path = poly.getPath();
  console.log(poly.getPath())
  if (path.Fb[0]) {
    console.log("holaaa", path.Fb[0].lat())
    console.log("holaaa", path.Fb[0].lng())
  }

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
  // Add a new marker at the new plotted point on the polyline.
  new google.maps.Marker({
    position: event.latLng,
    title: "#" + path.getLength(),
    map: map,
    icon: 'https://res.cloudinary.com/drls3a8oi/image/upload/v1615588404/IRON%20HACK/MountainMadness/placasdasdasdasaaaaaaaaseholder_cnkuun.png',
  });
}

function addPathToForm(form) {

  // var input = document.createElement("input")
  // input.name = "paths"
  // input.value = poly.getPath().Fb[0].lat()
  // form.append(input)

  poly.getPath().Fb.forEach(el => {
    var input = document.createElement("input");
    input.name = "path[]";
    input.value = [el.lng(), el.lat()];
    form.append(input);
  });
}

function codeAddress() {
  geocoder = new google.maps.Geocoder();
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      document.getElementById('x').innerHTML = results[0].geometry.location.lat().toFixed(6);
      document.getElementById('y').innerHTML = results[0].geometry.location.lng().toFixed(6);
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

}
