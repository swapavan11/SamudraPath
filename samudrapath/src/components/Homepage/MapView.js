import React from "react";
import Map, { Source, Layer, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = ({ handleMapClick, routes }) => {
  return (
    <Map
      initialViewState={{
        longitude: 74.5,
        latitude: 10.5,
        zoom: 5,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onClick={handleMapClick}
    >
      {routes.map((route, index) => (
        <Source
          key={index}
          id={`route-${index}`}
          type="geojson"
          data={{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: route.coordinates, // Use the route coordinates here
            },
          }}
        >
          <Layer
            id={`route-layer-${index}`}
            type="line"
            paint={{
              "line-color": route.color || "#FF5733", // You can pass different colors for each route
              "line-width": 4,
            }}
          />
        </Source>
      ))}
      <NavigationControl />
    </Map>
  );
};

export default MapView;
