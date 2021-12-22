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
        apikey: process.env.REACT_APP_HERE_API
    });

    console.log(this.props);

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: this.props.lat, lng: this.props.lon },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

   

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    

    var marker = new H.map.Marker({ lat: this.props.lat, lng: this.props.lon });
    console.log(this.props.lat)
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
      <div ref={this.mapRef} style={{ height: "430px" }} />
    );
  }
}