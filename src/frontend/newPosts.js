import { useContext,useState,createContext } from "react"
import { postContext } from "./context/postContext"

export const newPost = () =>{

    const {posts,setPosts} = useContext(postContext);



    return(
        <div>
            {
                posts.length>0 ? (

                    posts.map((post) => (

                        
            }
            

        </div>
    )
}