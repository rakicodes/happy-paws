import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts, reset } from '../features/posts/postSlice'

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Masonry from '@mui/lab/Masonry';

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
            <section>
                { posts.length > 0 ? 
                <Masonry columns={4} spacing={2} className="mt-1">
                { posts.map((post) => 
                    <Post key={post._id} post={post} showDelete={false} />
                    )}
                </Masonry> :
                <span className="mt-5">No posts</span> 
                }
            </section>
        </Container>
        </>
    )
}

export default Feed