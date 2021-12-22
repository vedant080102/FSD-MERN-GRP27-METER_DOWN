// src/DisplayMapClass.js
import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "NSck5e4rusnyNh_0rke0RvTUGMcM6MTl8Z1y-lgcJ_M"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 19.569833528445336, lng: 75.6734010417901 },
        zoom: 2,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    var routingParameters = {
      'routingMode': 'fast',
      'transportMode': 'car',
      // The start point of the route:
      'origin': '19.08609128185897,72.87018916326173',
      // The end point of the route:
      'destination': '19.222307591875566,72.97845502458584',
      // Include the route shape in the response
      'return': 'polyline'
    };

    var onResult = function(result) {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
             // Create a linestring to use as a point source for the route line
            let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
    
            // Create a polyline to display the route:
            let routeLine = new H.map.Polyline(linestring, {
              style: { strokeColor: 'blue', lineWidth: 3 }
            });
    
            // Create a marker for the start point:
            let startMarker = new H.map.Marker(section.departure.place.location);
    
            // Create a marker for the end point:
            let endMarker = new H.map.Marker(section.arrival.place.location);
    
            // Add the route polyline and the two markers to the map:
            map.addObjects([routeLine, startMarker, endMarker]);
    
            // Set the map's viewport to make the whole route visible:
            map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
        });
      }
    };

    var router = platform.getRoutingService(null, 8);

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
      function(error) {
        alert(error.message);
      });

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    // Create a marker icon from an image URL:
    // var icon = new H.map.Icon();

    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker({ lat: 52.5, lng: 13.4 });

    // Add the marker to the map:
    map.addObject(marker);
 
    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}