import { useState, useEffect } from 'react'
import { deletePost } from '../features/posts/postSlice'

import { HiXCircle } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';



const Post = ({ post, showDelete, userLocation }) => {
    const [distance, setDistance] = useState(NaN)
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    
    const calcDistance = (lat1,lon1,lat2,lon2) => {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return +(Math.round(d + "e+2")  + "e-2");
    }
    
    const deg2rad = (deg) => {
      return deg * (Math.PI/180)
    }

    useEffect(() => {
        if (post.location && userLocation) {
            setDistance(calcDistance(post.location[0], post.location[1], userLocation[0], userLocation[1]))
        }

    }, [post, userLocation])

    
    return (
        <div className="p-relative">
            <img src={post.image} alt=""/>
            { showDelete && user && user._id===post.user && <span className="deleteBtn" onClick={() => dispatch(deletePost(post._id))}><HiXCircle/></span> }
            { !Number.isNaN(distance) && <p className="right-end">{distance} km away</p>}
        </div>


        )
}

export default Post