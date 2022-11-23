import { deletePost } from '../features/posts/postSlice'

import { HiXCircle } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';

const Post = ({ post, showDelete }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)


    return (
        <div class="p-relative">
            <img src={post.image} alt=""/>
            { showDelete && user && user._id===post.user && <span className="deleteBtn" onClick={() => dispatch(deletePost(post._id))}><HiXCircle/></span> }
        </div>


        )
}

export default Post