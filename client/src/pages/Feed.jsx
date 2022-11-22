import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts, reset } from '../features/posts/postSlice'

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import Row from 'react-bootstrap/Row';
import Post from '../components/Post'

const Feed = () => {
    const dispatch = useDispatch();
  
    const { posts, isLoading, isError, isSuccess, message } = useSelector((state) => state.posts)
  
    useEffect(() => {
      if (isError) {
        console.log(message);
      }
  
      dispatch(getPosts())
  
      // do something when the component unmounts return a function
      return () => { 
        dispatch(reset())
      }
    }, [isError, message, dispatch])

    if (isLoading) {
      return  ( 
        <Container>
          <Spinner />
        </Container>
      )
    }

    return (
        <>
            <Container>
            <h1 className="mt-3">Hi</h1>
            <section>
                { posts.length > 0 ? 
                <Row xs={1} sm={2} md={4} className="g-1 mt-2">
                { posts.map((post) => 
                    <Post key={post._id} post={post} showDelete={false} />
                    )}
                </Row> :
                <span className="mt-5">No posts</span> 
                }
            </section>
        </Container>
        </>
    )
}

export default Feed