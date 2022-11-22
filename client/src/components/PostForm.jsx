import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addPost } from '../features/posts/postSlice'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PostForm = () => {
    const [image, setImage] = useState({})

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if (image) {
            const formData = new FormData();
            formData.append("post", image);

            dispatch(addPost(formData))
            setImage({})
        }


    }

    const onChange = (e) => {
        setImage(e.target.files[0])
    }

    return (
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="post">Name</Form.Label>
                    <Form.Control type="file" name="post" id="post" onChange={onChange} required/>
                </Form.Group>

                <Button type="submit" className="mt-2">
                    Add Post
                </Button>

            </Form>  
        )
}

export default PostForm