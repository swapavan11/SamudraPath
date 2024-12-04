import React from "react";
import Map, { Source, Layer, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = ({ handleMapClick, routeCoordinates }) => {
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
          <Source
            id="route"
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            }}
          >
            <Layer
              id="route-layer"
              type="line"
              paint={{
                "line-color": "#FF5733",
                "line-width": 4,
              }}
            />
          </Source>
          <NavigationControl />
        </Map> 
  );
};

export default MapView;
