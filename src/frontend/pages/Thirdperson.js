import { useParams } from 'react-router-dom';
import { follow } from '../../backend/db/follow';
import { useAuth } from '../context/authContext';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { useContext } from 'react';
import { postContext, usePost } from '../context/postContext';
import '../../frontend/styles/thirdperson.css';
import { Sidebar } from '../components/sidebar';
const Thirdperson = () => {
  const { username } = useParams(); 
        
        const { posts,handleLikeUnlike } = usePost();

    const userData = follow.find((user) => user.username === username);

    const userPost = posts.filter((post) => post.by == username);

  

  return (
    <div>   
        <Sidebar />
        <div className="user-profile">
      <div className="profile-header">
        <img src={userData.image} alt={`${username}'s Profile`} />
        <h1>{userData.name}</h1>
        <p>{userData.bio}</p>
        <button type="button">{
            userData.isFollowed ? 'Unfollow' : 'Follow'
        }
        </button>
        
        <div className="follower-counts">
          <span>{userData.followers} Followers</span>
          <span>{userData.following} Following</span>
        </div>
      </div>
      <div className="user-posts">
        {
            userPost.map((post) => (
                <div key={post.id} className="post">
                    <img src={post.picture_url} alt="Post" />
                    <h1>{post.content}</h1>
                
                <div className="post-actions">
                    <button

                        onClick={() => handleLikeUnlike(post.id, post.likes)}
                    >
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        {post.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                        {post.likes > 0 ? ` ${post.likes}` : null}
                    </button>

                </div>
                </div>
            ))

        }
        
      </div>
    </div>
</div>
  );
};

export default Thirdperson;
