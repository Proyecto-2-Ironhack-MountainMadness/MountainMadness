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
    // path: window.points ? window.points.map(function (point) {
      // return {
      //   lat: point[1],
      //   lng: point[0],
      // }
      // geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    // draggable: true,
  });

  // if (window.points) {
  //   poly
  //   var bounds = new google.maps.LatLngBounds()

  //   window.points.forEach(function (location) {
  //     var position = new google.maps.LatLng(location[1], location[0])
  //     new google.maps.Marker({
  //       icon: '/img/icon.png',
  //       position: position,
  //       map: map
  //     })
  //     bounds.extend(position)
  //   })

  //   map.fitBounds(bounds)
  // } else if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     infoWindow.setPosition(pos);
  //     infoWindow.setContent('Estás aquí');
  //     infoWindow.open(map);
  //     infoWindow.open(map2);
  //     map.setCenter(pos);
  //     map.setZoom(16);

  //   }, function () {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }

  // var SILVER_MAP = new google.maps.StyledMapType(
  //   SILVER_STYLE, {
  //     name: 'Styled Map'
  //   });

  poly.setMap(map);
  // Add a listener for the click event
  map.addListener("click", addLatLng);

  map.mapTypes.set('styled_map', SILVER_MAP);
  map.setMapTypeId('styled_map');

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    markerOptions: {},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
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
  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
  // Add a new marker at the new plotted point on the polyline.
  new google.maps.Marker({
    position: event.latLng,
    title: "#" + path.getLength(),
    map: map,
    icon: '../images/icon.png',
  });
}

function addPathToForm(form) {
  poly.getPath().forEach(el => {
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

// var MemoryGame = function (cards) {
//   this.cards = cards;
//   this.pickedCards = [];
//   this.pairsClicked = 0;
//   this.pairsGuessed = 0;
// };


// $(window).on("load", function () {
//   $.fn.hasProp = function (name, val) {
//     if (val) {
//       return $(this).prop(name) === val;
//     }
//     return $(this).prop(name) !== undefined;
//   };
//   var prop = 'checked';
//   var val = true;
//   var isChecked = $(this).hasProp(prop, val);

//   $(".input-category").change(function () {
//     var prop = 'checked';
//     var val = true;
//     var isChecked = $(this).hasProp(prop, val);

//     if (isChecked) {
//       $(this).siblings('.category-card').addClass("category-selected")
//     } else {
//       $(this).siblings('.category-card').removeClass("category-selected")
//     }
//   }).change();

//   function changeGoogleImageUrl() {
//     var newSize = "1000"
//     var str = $('.profile-image').attr('data-image')
//     var res = str.split("?sz=50")[0] + "?sz=" + newSize;
  
//     $('.profile-image').css('background', 'url(' + res + ')');
    
//   }
//   changeGoogleImageUrl()

//   $('.expertise-checkbox input').click(function () {
//     $('.expertise-checkbox input').prop('checked', false);
//     $(this).prop('checked') ? $(this).prop('checked', false) : $(this).prop('checked', true);
//   });

//   $('.politics-checkbox input').click(function () {
//     $('.politics-checkbox input').prop('checked', false);
//     $(this).prop('checked') ? $(this).prop('checked', false) : $(this).prop('checked', true);
//   });

// });


// $('.category-card').on('click', function (e) {
//   $(this).toggleClass("category-selected");
//   e.preventDefault();

//   if ($(this).hasClass('category-selected')) {
//     $(this).siblings('.input-category').prop('checked', true)
//   } else {
//     $(this).siblings('.input-category').prop('checked', false)
//   }
// });

// $("#creator").on("change", () => {
//   $("#rol").toggle();
// })


// function autocomplete(inp, arr) {

//   var currentFocus;

//   inp.addEventListener("input", function (e) {
//     var a, b, i, val = this.value;

//     closeAllLists();
//     if (!val) {
//       return false;
//     }
//     currentFocus = -1;

//     a = document.createElement("DIV");
//     a.setAttribute("id", this.id + "autocomplete-list");
//     a.setAttribute("class", "autocomplete-items");

//     this.parentNode.appendChild(a)

//     for (i = 0; i < arr.length; i++) {

//       if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//         b = document.createElement("DIV")
//         b.className = "countries-container"
//         b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//         b.innerHTML += arr[i].substr(val.length);
//         b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//         b.addEventListener("click", function (e) {
//           inp.value = this.getElementsByTagName("input")[0].value;
//           closeAllLists();
//         });
//         a.appendChild(b);
//       }
//     }
//   });

//   inp.addEventListener("keydown", function (e) {
//     var x = document.getElementById(this.id + "autocomplete-list");
//     if (x) x = x.getElementsByTagName("div");
//     if (e.keyCode == 40) {
//       currentFocus++;
//       addActive(x);
//     } else if (e.keyCode == 38) { //up
//       currentFocus--;
//       addActive(x);
//     } else if (e.keyCode == 13) {
//       e.preventDefault();
//       if (currentFocus > -1) {
//         if (x) x[currentFocus].click();
//       }
//     }
//   });

//   function addActive(x) {

//     if (!x) return false;
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = (x.length - 1);
//     x[currentFocus].classList.add("autocomplete-active");
//   }

//   function removeActive(x) {
//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }

//   function closeAllLists(elmnt) {
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }
//   document.addEventListener("click", function (e) {
//     closeAllLists(e.target);
//   });
// }


// var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

// autocomplete(document.getElementById("myInput"), countries);