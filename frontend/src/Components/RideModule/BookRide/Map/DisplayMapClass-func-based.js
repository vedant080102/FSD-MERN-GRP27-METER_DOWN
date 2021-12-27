// src/DisplayMapClass.js
import axios from 'axios';
import destP from '../../../Media/source.svg';
import sourceP from '../../../Media/destination.svg';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

export function DisplayMapClass (props) {
	const mapRef = useRef();

	const [map, setMap] = useState(null);

	// componentDidUpdate(prevprops){
	//   console.log(prevprops);
	//   console.log(props);
	//   if(prevprops){
	//     if(prevprops.route!=props.route){
	//       console.log("hello");
	//       console.log(this);
	//       this.setState({someprop:props});
	//       console.log(this);
	//     }
	//   }
	// }

	const reRenderMap = () => {
		const H = window.H;
		const platform = new H.service.Platform({
			apikey: process.env.REACT_APP_HERE_API
		});

		console.log("Rendered!!!");

		const layers = platform.createDefaultLayers();

		// Create an instance of the map
		const mapObj = new H.Map(
			mapRef.current,
			layers.vector.normal.map, {
				// This map is centered over Europe
				center: {
					lat: props.lat,
					lng: props.lon
				},
				zoom: 12,
				pixelRatio: window.devicePixelRatio || 1
			}
		);



		// const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

		// const ui = H.ui.UI.createDefault(map, defaultLayers);



		// var marker = new H.map.Marker({ lat: props.lat, lng: props.lon },
		//   {volatility: true,draggable:true});

		// console.log(props.lat)
		// map.addObject(marker);
		var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapObj), {
			enabled: H.mapevents.Behavior.DRAGGING | H.mapevents.Behavior.DBLTAPZOOM
		});
		var icon1 = new H.map.Icon(sourceP);
		var icon2 = new H.map.Icon(destP);
		var marker = new H.map.Marker({
			lat: props.lat,
			lng: props.lon
		}, {
			icon: icon1
		});
		window.addEventListener('resize', () => {
			mapObj.getViewPort().resize();
			console.log("map resize")
		});
		marker.setData({
			"id": 1
		});
		marker.draggable = true;
		mapObj.addObject(marker);

		var marker2 = new H.map.Marker({
			lat: props.lat,
			lng: props.lon
		}, {
			icon: icon2
		});

		window.addEventListener('resize', () => {
			mapObj.getViewPort().resize();
			// console.log("map resize")
		});
		marker2.setData({
			"id": 2
		});
		marker2.draggable = true;
		mapObj.addObject(marker2);

		mapObj.addEventListener('dragstart', function (ev) {
			var target = ev.target,
				pointer = ev.currentPointer;
			if (target instanceof H.map.Marker) {
				var targetPosition = mapObj.geoToScreen(target.getGeometry());
				target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
				behavior.disable();
			}
		}, false);


		// re-enable the default draggability of the underlying map
		// when dragging has completed
		mapObj.addEventListener('dragend', async (ev) => {
			var target = ev.target;
			console.log(ev)
			const creds = String(target.b.lat) + "%2C" + String(target.b.lng);
			if (target.data.id == 1) {
				await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${creds}&lang=en-US&apikey=${process.env.REACT_APP_HERE_API}`).then((data) => {
					console.log(data.data.items[0]);
					props.setCL(data.data.items[0]);

				}).catch((err) => {
					console.log(err);
				});
			} else {
				await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${creds}&lang=en-US&apikey=${process.env.REACT_APP_HERE_API}`).then((data) => {
					console.log(data.data.items[0]);
					props.setDL(data.data.items[0]);
				}).catch((err) => {
					console.log(err);
				});
			}

			setTimeout(() => {
				props.chngR();
			}, 50);

			if (target instanceof H.map.Marker) {
				behavior.enable();
			}
		}, false);

		// Listen to the drag event and move the position of the marker
		// as necessary
		mapObj.addEventListener('drag', function (ev) {
			var target = ev.target,
				pointer = ev.currentPointer;
			if (target instanceof H.map.Marker) {
				target.setGeometry(mapObj.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
			}
		}, false);

		// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapObj), {
		// 	enabled: H.mapevents.Behavior.DRAGGING | H.mapevents.Behavior.DBLTAPZOOM
		// });
		// Create the default UI components
		var ui = H.ui.UI.createDefault(mapObj, layers);
		// Add the marker to the map:
		mapObj.addObject(marker);
		// setMap(mapObj);
		if (props.route) {
			const ori = String(props.source.lat) + ',' + String(props.source.lng)
			console.log(ori)

			const des = String(props.dest.lat) + ',' + String(props.dest.lng)
			console.log(des)

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

			var onResult = function (result) {
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
						//let startMarker = new H.map.Marker(section.departure.place.location);
						marker.setGeometry(section.departure.place.location);
						marker2.setGeometry(section.arrival.place.location);


						// Create a marker for the end point:
						// let endMarker = new H.map.Marker(section.arrival.place.location);

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
								lineHeadCap: 'arrow-head'
							}
						});
						// create a group that represents the route line and contains
						// outline and the pattern
						var routeLin = new H.map.Group();
						routeLin.addObjects([routeOutline, routeArrows]);

						// Add the route polyline and the two markers to the map:
						mapObj.addObjects([routeLin, marker, marker2]);

						// Set the map's viewport to make the whole route visible:
						mapObj.getViewModel().setLookAtData({
							bounds: routeLin.getBoundingBox()
						});
					});
				}
			};


			var router = platform.getRoutingService(null, 8);

			router.calculateRoute(routingParameters, onResult,
				function (error) {
					alert(error.message);
				}
			);
			
		}
		setMap(mapObj)
	}

	useEffect(()=> {
		try {
			reRenderMap()
		} catch (error) {
			console.log(error)
			reRenderMap()
		}

		return () => {	
			// Cleanup after the map to avoid memory leaks when this component exits the page
			if (map) map.dispose();
		}
	})

	return (
		// Set a height on the map so it will display
		<div ref={mapRef} style={{ height: "430px" }} />
	);
}