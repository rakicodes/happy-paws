import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { addPost } from '../features/posts/postSlice'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PostForm = () => {
    const [image, setImage] = useState({});
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if (image && !isLoading) {
            const data = new FormData();
            data.append("post", image);
            data.append("location", location)

            dispatch(addPost(data))
            setImage({})       
        }

    }

    const onChange = (e) => {
        setImage(e.target.files[0])
    }

    const onClick = () => {
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(position => {
            setLocation([position.coords.latitude, position.coords.longitude])
            setIsLoading(false)
        })
        
    }   

    return (
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="post">Select Image</Form.Label>
                    <Form.Control type="file" name="post" id="post" onChange={onChange} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant="primary" type="button" onClick={onClick}>Use current location</Button>
                    {
                        isLoading &&                     
                        <Form.Text className="text-muted">
                            Getting location data...
                        </Form.Text>
    
                    }
                </Form.Group>

                {
                    isLoading ?                 
                    <Button type="submit" className="mt-2" disabled>
                        Add Post
                    </Button> :
                    <Button type="submit" className="mt-2">
                        Add Post
                    </Button>
                }


            </Form>  
        )
}

export default PostForm