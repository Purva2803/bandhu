import { postContext } from "../context/postContext"
import { useAuth } from "../context/authContext"
import { useContext, useEffect,useState } from 'react';
import { Divider } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";

export const Explore = () => {

    const {posts,setPosts,likePost} = useContext(postContext);

    return (
        <div>
            
            <h1>Explore</h1>
            <div className="main-content">
        {posts.length > 0 ? (
          (console.log(posts),
          posts
            .slice()
            .reverse()
            .map((postt) => (
              <div key={postt._id}>
                <h1>{postt.content}</h1>
                <img src={postt.picture_url} alt="Post Picture"  height={"200px"} width={"200px"}/>

                <button onClick={() => likePost(postt._id)}>AiOutlineHeart</button>
                <button onClick={() => postt.id}>Bookmark</button>
              </div>
            )))
        ) : (
          <h1>No posts</h1>
        )}

        </div>



      </div>
    
    )
}