import { useContext ,useState,createContext} from "react";
import { posting } from "../../backend/db/posts";
import { v4 as uuid } from "uuid";


export const postContext = createContext();


export const usePost = () => useContext(postContext);

export const PostProvider = ({children}) => {

    const [posts,setPosts] = useState(posting);
    const [likes,setLikes] = useState(0);
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
        console.log(postId)
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": localStorage.getItem("access-token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const unlikePost = async (postId) => {
        try {
            const response = await fetch(`/api/posts/${postId}/unlike`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": localStorage.getItem("access-token"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    const value = {
        createPost,
        getPost,
       
        updatePost,
        deletePost,
        likePost,
        unlikePost,
        posts,
        setPosts

    }

    return (
        <postContext.Provider value={value}>
            {children}
        </postContext.Provider>
    )
}
