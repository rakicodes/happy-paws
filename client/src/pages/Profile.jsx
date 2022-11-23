import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'

import { getUserPosts, reset } from '../features/posts/postSlice'

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Masonry from '@mui/lab/Masonry';

import PostForm from '../components/PostForm'
import Post from '../components/Post'

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, isSuccess, message } = useSelector((state) => state.posts)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getUserPosts(user._id))

    // do something when the component unmounts return a function
    return () => { 
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return  ( 
      <Container>
        <Spinner />
      </Container>
    )
  }

  return (
    <Container>
      <h2 className="mt-3">Hi {user.name}!</h2>
      <PostForm />

        { posts.length > 0 ? 
          <Masonry columns={4} spacing={2} className="mt-1">
            { posts.map((post) => 
              <Post key={post._id} post={post} showDelete={true}/>
            )}
        </Masonry> :
        <p className="mt-3">No posts</p>
        }
    </Container>  )
}

export default Profile