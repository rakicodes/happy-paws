import { deletePost } from '../features/posts/postSlice'

import { FaTrash } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Post = ({ post }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)


    return (
        <Col>
            <Card>
                <Card.Body>
                    <Card.Img src={post.image} alt="Card image" />
                    <Card.ImgOverlay className="d-flex align-items-end justify-content-end">
                        <section>
                            { user && user._id===post.user && <Button className="me-1" variant="primary" onClick={() => dispatch(deletePost(post._id))}><FaTrash/></Button> }
                        </section>
                    </Card.ImgOverlay>
                </Card.Body>
                
            </Card>
        </Col>  
        )
}

export default Post