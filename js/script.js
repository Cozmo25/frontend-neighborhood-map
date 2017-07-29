/* Global Variables*/
var map;
var largeInfowindow = null;
var bounds = null;

/*Foursquare API Config */
var foursquareApi = {
    clientId: 'NTFE1N0FT35OSM3XSF2HLIRXBFZO4YQTZCHGWBN1KLNS5K5D',
    clientSecret: 'OPDMBDX1EZJDB5EOGA2Z22STI5I3BJOKOWNTVPNQTRYCTFTT',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
};

//Get list of locations & various details from Foursquare API using Ajax call and JSONP format
function getLocations() {
    var jqxhr = $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
            url: foursquareApi.apiUrl + 'v2/venues/explore?near=san diego, ca&limit=30&client_id=' + foursquareApi.clientId + '&client_secret=' + foursquareApi.clientSecret + '&v=20170704'
        })
        .done(function(data) {

            //If 200 Ok not recieved from API then alert user of a problem with the API response
            if (data.meta.code != 200) {
                alert('No data could be retrieved from Foursquare API');
            } else {

                //If 200 Ok received, process the data
                data.response.groups[0].items.forEach(function(item, index, array) {
                    model.locations.push({
                        'title': item.venue.name,
                        'position': {
                            'lat': item.venue.location.lat,
                            'lng': item.venue.location.lng
                        },
                        'rating': item.venue.rating,
                        'url': item.venue.url,
                        'category': item.venue.categories[0].name,
                        'checkIns': item.venue.stats.checkinsCount,
                        'tipCount': item.venue.stats.tipCount,
                        'tip': item.tips[0].text
                    });
                });

                ko.applyBindings(new ViewModel());
                initMap();
            }
        })
        //If ajax call fails then alert user of problem with API
        .fail(function(jqxhr) {
            window.alert('No data could be retrieved from Foursquare API');
        });
}

function gmapError() {
    window.alert('There was a problem loading the Google Maps API');
}

//Initiate Google Map
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map($('#map')[0], {
        center: {
            lat: 32.9277729,
            lng: -117.4357793
        },
        zoom: 14
    });

    //Define Gmaps infowindow and map bounds variables
    largeInfowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    //Set list of locations from Foursquare query
    var locations = model.locations;

    ///Draw markers on map
    setMarkers(locations);

    // Create an onclick event to open an infowindow at each marker.
    model.markers.forEach(function(marker){
        marker.addListener('click', function() {
            map.setCenter(marker.getPosition());
            toggleBounce(this);
            populateInfoWindow(this, largeInfowindow);
        });
    });

    //Keep a record of all original markers to reset filters from user input
    for (var i = 0; i < locations.length; i++) {
        model.allMarkers.push(model.markers[i]);
    }

    // Extend the boundaries of the map for each marker
    fitBoundsVisableMarkers(model.markers, map);

    google.maps.event.addDomListener(window, 'resize', function() {
        map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
    });
}

// This function populates the infowindow when the marker is clicked
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow) {
        infowindow.close();
        infowindow.marker = marker;
        //Set up info to be displayed in infowindow
        infowindow.setContent('<div id="iw-container"><div class="iw-title"><strong>' + marker.title + '</strong></div><br>' +
            '<div>Category: ' + marker.category + '</div>' +
            '<div>Rating: ' + marker.rating + '</div>' +
            '<div>Check-Ins: ' + marker.checkIns + '</div>' +
            '<div>Tip Count: ' + marker.tipCount + '</div><br>' +
            '<div>People Say: "' + marker.tip + '"</div><br>' +
            '<div>Link: ' + (marker.url === 'No link provided' ? '<span>' : '<a target="_blank" href="' + marker.url + '">') +
                marker.url + (marker.url === 'No link provided' ? '</span>' : '</a>') + '</div></div><br>' +
            '<div><em>Powered by Foursquare API<em></div>'
        );
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.setMarker = null;
        });
    }
}

function setMarkers(locations) {

    //Define map bounds
    bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {

        // Get the info obtained from the Foursquare API, pass into variables ready for use on markers
        var position, title, rating, url, category, checkIns, tipCount, tip;

        position = locations[i].position;
        title = locations[i].title;
        rating = locations[i].rating;
        url = locations[i].url || "No link provided";
        category = locations[i].category || "No category provided";
        checkIns = locations[i].checkIns || "No checkins provided";
        tipCount = locations[i].tipCount || "No tip count provided";
        tip = locations[i].tip || "No tip provided";

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            rating: rating,
            url: url,
            category: category,
            checkIns: checkIns,
            tipCount: tipCount,
            tip: tip
        });

        // Push the marker to our array of markers.
        model.markers.push(marker);

        bounds.extend(model.markers[i].position);
    }
}

//Fit map to visible markers
function fitBoundsVisableMarkers(markers, map) {

    if (map !== undefined) {

        //Define map bounds
        bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < markers.length; i++) {
            if (markers[i].getVisible()) {
                bounds.extend(markers[i].getPosition());
            }
        }

        map.fitBounds(bounds);

    } else {
        return;
    }
}

//Set markers as visible based on filtered list
function setVisibleMarkers(updatedLocations) {

    for (var i = 0; i < updatedLocations.length; i++) {

        updatedLocations[i].setVisible(true);
    }
}

//Reset markers' visiblity, then call setVisibleMarkers to show filtered markers
function resetMarkers(updatedLocations) {

    // Loop through markers and set map to null for each
    for (var i = 0; i < model.markers.length; i++) {

        model.markers[i].setVisible(false);
    }

    // Call set markers to re-add markers
    setVisibleMarkers(updatedLocations);

}

//Filter markers to match filtered list from user input
function markerFilter(array, filter) {

    //use array filter to match marker array to user input
    var filteredMarkers = array.filter(function(el) {

        //If user input in marker title then return true and keep in array
        if (filter.indexOf(el.title) != -1) {
            return true;
        }

        return false;
    });

    return filteredMarkers;
}

//Function to animate the marker
function toggleBounce(marker) {

    marker.setAnimation(google.maps.Animation.BOUNCE);

    window.setTimeout(function() {
        marker.setAnimation(null);
    }, 2100);
}

/* Data Model */

var model = {

    locations: [],

    allMarkers: [],

    markers: [],

    updatedMarkers: []

};

/*Location object */
var Location = function(data) {
    var self = this;

    this.title = ko.observable(data.title);
};

/* View model controller */
var ViewModel = function() {
    var self = this;

    self.locationList = ko.observableArray([]);

    model.locations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    self.filter = ko.observable();

    this.filteredLocation = ko.computed(function() {
        var filter = self.filter(),
            arr = [];

        if (filter) {
            ko.utils.arrayFilter(self.locationList(), function(item) {
                if (item.title().toLowerCase().indexOf(filter.toLowerCase()) === 0) {
                    arr.push(item);
                }
            });

        } else {
            arr = self.locationList();
        }

        //Push location titles into an array to use as list to filter markers against
        var filterArr = [];

        for (var i = 0; i < arr.length; i++) {

            filterArr.push(arr[i].title());
        }

        //Clear previous array of markers from filtered list
        model.updatedMarkers = [];

        //Run marker filter function to get updated marker list
        model.updatedMarkers = markerFilter(model.allMarkers, filterArr);

        //Redraw markers on map
        resetMarkers(model.updatedMarkers);

        //Fit map to updated markers
        fitBoundsVisableMarkers(model.updatedMarkers, map);

        return arr;
    });

    //Set up ko observable for current location
    this.currentLocation = ko.observable();

    //set location if clicked in list and populate info window
    this.setLocation = function(clickedLocation) {
        self.currentLocation(clickedLocation);

        //if an infowindow already open then close it
        if (largeInfowindow) {
            largeInfowindow.close();
        }

        //iterate through the markers to match the one that was clicked
        model.markers.forEach(function(marker) {

            //Stop other markers bouncing before animating the marker that was clicked
            marker.setAnimation(null);

            //Match place that was clicked to marker in marker list variable
            if (self.currentLocation().title() === marker.title) {

                //Center map on clicked marker
                map.setCenter(marker.getPosition());

                //Make marker bounce if name is clicked in the list
                toggleBounce(marker);

                //create a new infowindow
                largeInfowindow = new google.maps.InfoWindow();
                //populate the infowindow with data
                populateInfoWindow(marker, largeInfowindow);
            }
        });
    };

    //Set up ko observable for sliding sidebar & menu icon
    self.slide = ko.observable(false);

    //If menu icon clicked, then change CSS classes on menu icon and sidebar
    this.menuClick = function() {
        self.slide(!self.slide());
    };
};