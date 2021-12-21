// src/RegionMap.js
import * as React from 'react';

export class RegionMap extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const H = window.H;
    const addPolygonToMap = (map) => {
        map.addObject(new H.map.Circle(
            // The central point of the circle
            // {lat:19.152240522253486, lng:72.95038723899198},
        {lat:19.092172567483823, lng:72.9119350918738},
        // The radius of the circle in meters
        25000,
        {
            style: {
                strokeColor: 'rgba(255,207,21,1)', // Color of the perimeter
                lineWidth: 2,
                fillColor: 'rgba(255,207,21,0.3)'  // Color of the circle
            }
        }
        ));
    }
    /*
     * Boilerplate map initialization code starts below:
    */

    //Step 1: initialize communication with the platform
    // In your own code, replace variable window.apikey with your own apikey
    var platform = new H.service.Platform({
        apikey: process.env.REACT_APP_HERE_API
    });
    var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map - this map is centered over Europe
    var map = new H.Map(
        this.mapRef.current,
        defaultLayers.vector.normal.map, {
            center: {lat:19.092172567483823, lng:72.9119350918738},
            zoom: 10.5,
            pixelRatio: window.devicePixelRatio || 1
    });
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());
    
    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    addPolygonToMap(map);
 
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