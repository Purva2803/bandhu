import { Button } from "@chakra-ui/react"
import { follow } from "../../backend/db/follow"
import '../../frontend/styles/follow.css'
import { useState } from "react"
import { Link } from "react-router-dom"



export const Follow = () => {
  const [followData, setFollowData] = useState(follow
   
  );

  const handleFollowToggle = (id) => {
    const updatedFollowData = followData.map((user) => {
      if (user.id === id) {
        return { ...user, isFollowed: !user.isFollowed };
      }
      return user;
    });
    setFollowData(updatedFollowData);
  };

  return (
    
      
      <div className="follow-container">
        {followData.map((user) => (
          <div key={user.id} className="follow-card">
           <Link to={`/profile/${user.username}`}>
          <img src={user.image} alt="profile" />
        </Link>
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
            <button onClick={() => handleFollowToggle(user.id)}>
              {user.isFollowed ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    
  );
};
