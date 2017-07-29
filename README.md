# Neighborhood Map Project:

#### Recommended Attractions in San Diego, CA, USA

# INSTRUCTIONS
## How to run the project
1. Download the project folder (neighborhood-map)
2. Project dependencies are:
    * Google Maps Javacript API v3
    * Knockout v3.4.2
    * Jquery v1.11.1
Note: -- Knockout & jQuery JS files are included in the project folder. Google Maps JS API is accesssed via the internet. There is nothing further for the user to install.
3. Launch your favourite http server
4. Open a web browser and navigate to index.html to view the app
5. The app will display 30 of the top attractions in San Diego, CA, USA
5. Filter results by name using the text input box at the top left of the page. The markers on the map will be automatically updated based on the results of the filter
5. Clicking on a place name in the list, or a marker will open an information window containing details (see below for description of fields) about the place from Foursquare via their API. The marker will also bounce to indicate its location.
6. Clicking on the place name, or the marker will stop the marker bouncing.

## Project Implementation

The project is implemented using Google Maps Javascript API (to handle the mapping of locations and displaying of location information) and the Foursqaure API (to obtain the list of places & various details about them).

Details about the place from Foursquare, which are displayed in the Google Maps information window are:
* Place name
* The type of place it is (category)
* Its ranking out of 10 by Foursquare users
* The number of checkins at the place by Fourquare users
* The number of users who have 'tipped' the place
* A tip from a Foursquare user
* A link to the place's wesbsite (if one exists)

For smaller screen devices (screen widths less than 800px) the side menu will slide off the left hand side of the screen allowing the map to take up the whole width of the viewport.

In order to view the list of places again, click on the "menu" button (Hamburger icon) in the top right corner of the screen and the menu will slide back into view, ready for interaction with the user.

### Notes & Acknowledgments

Thanks to the following sources for assistance with various elements of the project:
* [Google Maps Javascript API Documentation &  Tutorials](https://developers.google.com/maps/documentation/javascript/)
* [Foursquare API Developer Documentation & Tutorials](https://developer.foursquare.com/docs)
* [jQuery API Documentation](http://api.jquery.com/)
* [Knockout JS Documentation](http://knockoutjs.com/documentation/introduction.html)
* [W3 Schools - How to Make a Menu Icon](https://www.w3schools.com/howto/howto_css_menu_icon.asp)
* [5 Ways to Customise Google Maps Infowindow](http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html)
* [Stackoverflow: Array.filter() Help](https://stackoverflow.com/questions/34408996/javascript-array-filter-not-working-as-expected)
* [Stackoverflow: Reload Google Map Markers](https://stackoverflow.com/questions/22773651/reload-markers-on-googles-maps-api)
* [Stackoverflow: Add Markers to Google Map from External JSON](https://stackoverflow.com/questions/21401774/add-markers-to-google-maps-from-external-json)
______________________________________________________________________________

## PROJECT INFO & DESCRIPTION

### How will I complete this project?
Review our course JavaScript Design Patterns and check out the Neighborhood Map project rubric.

Download the Knockout framework. Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map. Note 1: Tracking click events on list items should be handled with Knockout. Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

Asynchrony and Error Handling. Note that all data APIs used in the project should load asynchronously and errors should be handled gracefully. In case of error (e.g. in a situation where a third party API does not return the expected result) we expect your webpage to do one of the following: A message is displayed notifying the user that the data can't be loaded, OR There are no negative repercussions to the UI.

Note: Please note that we expect students to handle errors if the browser has trouble initially reaching the 3rd-party site as well. For example, imagine a user is using your Neighborhood Map, but her firewall prevents her from accessing the Instagram servers. Here is a reference article on how to block websites with the hosts file. It is important to handle errors to give users a consistent and good experience with the webpage. Read this blogpost to learn more. Some JavaScript libraries provide special methods to handle errors. For example: refer to .fail() method discussed here if you use jQuery's ajax() method. We strongly encourage you to explore ways to handle errors in the library you are using to make API calls.

Write code required to add a full-screen map to your page using the Google Maps API. For sake of efficiency, the map API should be called only once.

If you are prompted to do so, you may want to get a Google Maps API key, and include it as the value of the key parameter when loading the Google Maps API in index.html: <script src="http://maps.googleapis.com/maps/api/js?libraries=places&key=[YOUR_API_KEY]"></script> You may have some initial concerns with placing your API key directly within your JavaScript source files, but rest assured this is perfectly safe. All client-side code must be downloaded by the client; therefore, the client must download this API key - it is not intended to be secret. Google has security measures in place to ensure your key is not abused. It is not technically possible to make anything secret on the client-side.

Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood. Your app should display those locations by default when the page is loaded.

Implement a list view of the set of locations defined in step 5.

Provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real time. Providing a search function through a third-party API is not enough to meet specifications. This filter can be a text input or a dropdown menu.

Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (ex: Yelp reviews, Wikipedia, Flickr images, etc). Note that StreetView and Places don't count as an additional 3rd party API because they are libraries included in the Google Maps API. If you need a refresher on making AJAX requests to third-party servers, check out our Intro to AJAX course. Please provide attribution to the data sources/APIs you use. For example if you are using Foursquare, indicate somewhere in your interface and in your README that you used Foursquare's API.

Add functionality to animate a map marker when either the list item associated with it or the map marker itself is selected.

Add functionality to open an infoWindow with the information described in step 9 (you can also populate a DOM element with this info, but you should still open an infoWindow, even with minimal info, like location name) when either a location is selected from the list view or its map marker is selected directly.

The app's interface should be intuitive to use. For example, the input text area to filter locations should be easy to locate. It should be easy to understand what set of locations is being filtered.

Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above the map marker with additional information.