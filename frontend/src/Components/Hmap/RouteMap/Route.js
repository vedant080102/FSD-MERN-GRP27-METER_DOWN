import * as React from 'react';

export class MyRoute extends React.Component{
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
    
        console.log(this.props.source.lat);
        const ori = String(this.props.source.lat) + ',' + String(this.props.source.lng)
        console.log(ori)

        const des = String(this.props.dest.lat) + ',' + String(this.props.dest.lng)
        console.log(des)
    
        const defaultLayers = platform.createDefaultLayers();
    
        // Create an instance of the map
        const map = new H.Map(
          this.mapRef.current,
          defaultLayers.vector.normal.map,
          {
            // This map is centered over Europe
            center: { lat: this.props.source.lat, lng: this.props.source.lng },
            zoom: 14,
            pixelRatio: window.devicePixelRatio || 1
          }
        );

        var routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'car',
            // The start point of the route:
            'origin': ori,
            // The end point of the route:
            'destination': des,
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
                  // let routeLine = new H.map.Polyline(linestring, {
                  //   style: { strokeColor: 'blue', lineWidth: 3 }
                  // });
          
                  // Create a marker for the start point:
                  let startMarker = new H.map.Marker(section.departure.place.location);
          
                  // Create a marker for the end point:
                  let endMarker = new H.map.Marker(section.arrival.place.location);
          
                 
      
                  //
                  var routeOutline = new H.map.Polyline(linestring, {
                    style: {
                      lineWidth: 10,
                      strokeColor: 'rgba(0, 128, 255, 0.7)',
                      lineTailCap: 'arrow-tail',
                      lineHeadCap: 'arrow-head'
                    }
                  });
                  // Create a patterned polyline:
                  var routeArrows = new H.map.Polyline(linestring, {
                    style: {
                      lineWidth: 10,
                      fillColor: 'white',
                      strokeColor: 'rgba(255, 255, 255, 1)',
                      lineDash: [0, 2],
                      lineTailCap: 'arrow-tail',
                      lineHeadCap: 'arrow-head' }
                    }
                  );
                  // create a group that represents the route line and contains
                  // outline and the pattern
                  var routeLin = new H.map.Group();
                  routeLin.addObjects([routeOutline, routeArrows]);
      
                   // Add the route polyline and the two markers to the map:
                   map.addObjects([routeLin, startMarker, endMarker]);
          
                   // Set the map's viewport to make the whole route visible:
                   map.getViewModel().setLookAtData({bounds: routeLin.getBoundingBox()});
              });
            }
          };
        
    
       
    
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    
        const ui = H.ui.UI.createDefault(map, defaultLayers);
    
        
    
        var router = platform.getRoutingService(null, 8);

        router.calculateRoute(routingParameters, onResult,
          function(error) {
            alert(error.message);
          });
     
        this.setState({ map });
      }
    
      // componentWillUnmount() {
      //   // Cleanup after the map to avoid memory leaks when this component exits the page
      //   this.state.map.dispose();
      // }

      render() {
        return (
          // Set a height on the map so it will display
          <div ref={this.mapRef} style={{ height: "430px" }} />
        );
      }
    
}