import { useContext ,useState,createContext} from "react";
import { posting } from "../../backend/db/posts";
import { v4 as uuid } from "uuid";


export const postContext = createContext();


export const usePost = () => useContext(postContext);

export const PostProvider = ({children}) => {

    const [posts,setPosts] = useState(posting);
    const [likes,setLikes] = useState(0);
    const [bookmarks,setBookmarks] = useState(0);
    const createPost = async (post) => {

        

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": localStorage.getItem("access-token"),
                },
                body: JSON.stringify({ postData: { ...post} }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.alert("Post created successfully");
                window.location.href = "/";
                
             

            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getPost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": localStorage.getItem("access-token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const updatePost = async (postId, post) => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": localStorage.getItem("access-token"),
                },
                body: JSON.stringify({ postData: { ...post } }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.alert("Post updated successfully");
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const deletePost = async (postId) => {

        try
        {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": localStorage.getItem("access-token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.alert("Post deleted successfully");
                window.location.href = "/";
            }
        }

        catch (error) {
            console.log(error.message);
        }
    }

    const likePost = async (postId) => {
      // Find the post in the posts array
      const postToUpdate = posts.find(post => post._id === postId);
    
      if (postToUpdate) {
        // Update the likes in the context state
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            // Increment likes for the specific post
            return {
              ...post,
              likes: post.likes + 1,
              isLiked: true
            };
          }
          return post;
        });
      console.log(updatedPosts);
        // Update the posts array in the context with the updated posts
        setPosts(updatedPosts);
      }
    };
    
      const handleLikeUnlike = (postId, likes) => {
        if (likes > 0) {
          
          unlikePost(postId);
        } else {
         
          likePost(postId);
        }
      };
       
      const unlikePost = async (postId, likes) => {
        const postToUpdate = posts.find(post => post._id === postId);
      
        if (postToUpdate && postToUpdate.isLiked) {
          const updatedPosts = posts.map(post => {
            if (post._id === postId) {
              return {
                ...post,
                likes: post.likes - 1,
                isLiked: false
              };
            }
            return post;
          });
      
          setLikes(likes - 1);
          setPosts(updatedPosts);
        }
      };
  const handleBookmarkUnbookmark = (postId, bookmarks) => {
    if (bookmarks > 0) {
        // Post is already bookmarked, so perform unbookmark
        unbookmarkPost(postId);
    } else {
        // Post is not bookmarked, so perform bookmark
        bookmarkPost(postId);

    }
};
const MAX_BOOKMARKS_LIMIT = 1; // Set your desired bookmark limit here

const bookmarkPost = async (postId, bookmarks) => {
  const postToUpdate = posts.find(post => post._id === postId);

  if (postToUpdate && !postToUpdate.isBookmarked && postToUpdate.bookmarks < MAX_BOOKMARKS_LIMIT) {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          bookmarks: post.bookmarks + 1,
          isBookmarked: true
        };
      }
      return post;
    });

    setBookmarks(bookmarks + 1);
    setPosts(updatedPosts);
  }
};

const unbookmarkPost = async (postId, bookmarks) => {
  const postToUpdate = posts.find(post => post._id === postId);

  if (postToUpdate && postToUpdate.isBookmarked) {
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          bookmarks: post.bookmarks - 1,
          isBookmarked: false
        };
      }
      return post;
    });

    setBookmarks(bookmarks - 1);
    setPosts(updatedPosts);
  }
};


    const value = {
        createPost,
        getPost,
       
        updatePost,
        deletePost,
        likePost,
        unlikePost,
        posts,
        setPosts,
        likes,
        handleLikeUnlike,
        handleBookmarkUnbookmark

    }

    return (
        <postContext.Provider value={value}>
            {children}
        </postContext.Provider>
    )
}
