import React, { useRef, useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import { useSelector, useDispatch } from 'react-redux';

import { getPosts, reset } from '../features/posts/postSlice'

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';


import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoicmFreSIsImEiOiJja3YxdzI5cjEzeTd0MnhwZ2tpMXE0bHBpIn0.j3A74v6kyzm-wQT2dm9gxA';


const Marker = ({image}) => {
    const style = {
        width: "60px",
        height: "60px",
        backgroundImage: `url(${image})`,
        backgroundSize: "100%",
        borderRadius: "100%",
        border: "2px solid green",
      };

    return (
        <div className="marker" style={style}>
           
        </div>
    )
}

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-113.4937);
    const [lat, setLat] = useState(53.5461);
    const [zoom, setZoom] = useState(10);

    const dispatch = useDispatch();
  
    const { posts, isLoading, isError, isSuccess, message } = useSelector((state) => state.posts)

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        if (isError) {
          console.log(message);
        }
    
        dispatch(getPosts())       

        // do something when the component unmounts return a function
        return () => { 
          dispatch(reset())
        }
    }, [isError, message, dispatch])

    useEffect(() => {
         // Render custom marker components
         posts.forEach((post) => {
            if (post.location && post.location.length) {
                // Create a React ref
                const ref = React.createRef();
                // Create a new DOM node and save it to the React ref
                ref.current = document.createElement("div");
                // Render a Marker Component on our new DOM node
                const root = createRoot(ref.current);
                root.render(
                    <Marker image={post.image} />
                );
        
                // Create a Mapbox Marker at our new DOM node
                new mapboxgl.Marker(ref.current)
                .setLngLat(post.location)
                .addTo(map.current);
            }
        })
    }, [posts])

    if (isLoading) {
        return  ( 
          <Container className="min-vh-100 d-flex align-items-center justify-content-center">
            <Spinner />
          </Container>
        )
      }

    return (
        <Container>
            <div id="map" ref={mapContainer} className="map-container" />
        </Container>
    )
}

export default Map