
import { useContext,useState } from "react"

import { useAuth } from "../backend/context/AuthContext"
export const Profile = () => {


    const {user} = useAuth()

    return (

        <div>

            <h1>Profile</h1>
            <h2>{user.email}</h2>
            <h2>{user.username}</h2>
            <h2>{user._id}</h2>
            <h2>{user.picture_url}</h2>
            <h2>{user.bio}</h2>
            <h2>{user.followers}</h2>
            <h2>{user.following}</h2>
            <h2>{user.posts}</h2>
            <h2>{user.bookmarks}</h2>
            <h2>{user.liked_posts}</h2>
            <h2>{user.disliked_posts}</h2>
            <h2>{user.comments}</h2>
            <h2>{user.liked_comments}</h2>
            <h2>{user.disliked_comments}</h2>
            <h2>{user.replies}</h2>
            <h2>{user.liked_replies}</h2>
            <h2>{user.disliked_replies}</h2>
            <h2>{user.replies_on_comments}</h2>
            <h2>{user.liked_replies_on_comments}</h2>
            <h2>{user.disliked_replies_on_comments}</h2>
            <h2>{user.replies_on_replies}</h2>
            <h2>{user.liked_replies_on_replies}</h2>
            <h2>{user.disliked_replies_on_replies}</h2>
            <h2>{user.replies_on_replies_on_comments}</h2>
            <h2>{user.liked_replies_on_replies_on_comments}</h2>
            <h2>{user.disliked_replies_on_replies_on_comments}</h2>
            <h2>{user.replies_on_replies_on_replies}</h2>

            
            

            </div>
    )
}