import { postContext } from "../context/postContext"
import { useAuth } from "../context/authContext"
import { useContext, useEffect,useState } from 'react';
import { Divider } from "@chakra-ui/react";
import { Sidebar } from "../components/sidebar";
import "../../frontend/styles/explore.css"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { Follow } from "../components/follow";
import { Sorting } from "../sorting";

export const Explore = () => {
  const { posts, likePost,handleLikeUnlike,handleBookmarkUnbookmark ,setPosts} = useContext(postContext);

  const sortedByDate = posts.slice().sort((a, b) => b.createdAt - a.createdAt);


  const handleFilterByTrending = () => {
    
    const sortedPosts = posts.sort((a, b) => {

      return b.likes - a.likes;
    });
    setPosts([...sortedPosts]);
  };


  return (
    <div className="explore-container">
      <Sidebar />
      
      <div className="main-content">
      <Sorting handleSortByDate={sortedByDate} handleFilterByTrending={handleFilterByTrending} />

      
        {posts.length > 0 ? (
          posts
            .slice()
            .reverse()
            .map((post) => (
              <div key={post._id} className="post">
                
                <img src={post.picture_url} alt="Post Picture" />
                <h1>{post.content}</h1>

                <div className="post-actions">
                  <button
                    onClick={() => handleLikeUnlike(post._id, post.likes)}
                  >
                    <i className="fa fa-heart" aria-hidden="true"></i>
                    {post.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    {post.likes > 0 ? ` ${post.likes}` : null}
                  </button>

                  <button
                    onClick={() =>
                      handleBookmarkUnbookmark(post._id, post.bookmarks)
                    }
                  >
                    <i className="fa fa-bookmark" aria-hidden="true"></i>
                    {post.isBookmarked ? (
                      <BsFillBookmarkFill />
                    ) : (
                      <BsBookmark />
                    )}
                  </button>
                </div>
              </div>
            ))
        ) : (
          <h1>No posts</h1>
        )}

      </div>
      <Follow />
      
    </div>
  );
};
