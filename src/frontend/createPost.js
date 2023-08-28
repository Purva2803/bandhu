import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./context/authContext";
import { postContext, usePost } from "./context/postContext";
import { v4 as uuid } from "uuid";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { BasicUsage } from "../frontend/modal/createpost";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import cloudinary from "cloudinary-core";
import { bookmarkPostHandler } from "../backend/controllers/UserController";
import "../frontend/styles/posts.css";
import "../frontend/styles/createpost.css";

export const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [picture_url, setImageUrl] = useState("");
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editPostContent, setEditPostContent] = useState("");
  const [postToEditId, setPostToEditId] = useState(null); // Define postToEditId

  const getUser = JSON.parse(localStorage.getItem("user"));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBody("");
    setImageUrl("");
    setIsLoading(false);
  };
  const {
    createPost,
    posts,
    setPosts,
    likePost,
    handleLikeUnlike,
    handleBookmarkUnbookmark,
  } = useContext(postContext);
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/donlwkpi8/auto/upload";
  const CLOUDINARY_UPLOAD_PRESET = "ml_default";
  const uploadMedia = async (media) => {
    const formData = new FormData();

    formData.append("file", media);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "bandhu");

    return fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const post = {
        content,
        picture_url,
        _id: uuid(),
        likes: 0,
        bookmarks: 0,
        isLiked: false,
        by: getUser.username,
      };

      await createPost(post);
      {
        console.log(post.by);
      }
      {
        console.log(getUser.username);
      }
      setPosts([...posts, post]); //
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value);
  // };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((post) =>
      post._id === postToEditId ? { ...post, content: editPostContent } : post
    );
    setPosts(updatedPosts);
    closeModal();
  };

  const handleEditBodyChange = (event) => {
    setEditPostContent(event.target.value);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
  };
  const openEditModal = (postId, initialContent) => {
    setPostToEditId(postId);
    setEditPostContent(initialContent);
    setIsModalOpen(true);
  };

  const handleImageChange = async (event) => {
    setIsLoading(true);
    setImage(event.target.files[0]);

    const mediaUrl = await uploadMedia(event.target.files[0]);
    console.log(mediaUrl);
    setImageUrl(mediaUrl.secure_url);
    setIsLoading(false);
    console.log(picture_url);
  };

  useEffect(() => {
    console.log("Updated posts:", posts);
    setPosts(posts);
  }, [posts]);
  return (
    <div>
      <div className="create-post">
        <button className="create-post-button" onClick={openModal}>
          Create Post
        </button>
      </div>

      <div className={`post-modal ${isModalOpen ? "open" : ""}`}>
  <div className="modal-content">
    <span className="close-modal" onClick={closeModal}>
      &times;
    </span>
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        id="image"
        name="picture_url"
        accept="image/*"
        onChange={handleImageChange}
      />

      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div>
          {picture_url && (
            <img src={picture_url} alt="post" width="300" height="300" />
          )}
          {!postToEditId && (
            // Regular post creation input fields
            <div>
              <textarea
                id="content"
                name="content"
                placeholder="Write your post here"
                value={content}
                onChange={handleBodyChange}
              />
              <input type="submit" value="post" />
            </div>
          )}

          {postToEditId && (
            // Edit form, rendered only when postToEditId is set
            <div>
              <textarea
                id="edit-content"
                name="edit-content"
                placeholder="Edit your post here"
                value={editPostContent}
                onChange={handleEditBodyChange}
              />
              <button type="button" onClick={handleEditSubmit}>
                Save Edit
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  </div>
</div>

      {/* Posts */}
      <div className="posts-container">
        {posts.length > 0 ? (
          posts
            .slice()
            .reverse()
            .map((post) => (
              <div key={post._id} className="post">
                <h1 className="post-content">{post.content}</h1>
                <img
                  src={post.picture_url}
                  alt="Post Picture"
                  className="post-img"
                />

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
                  {console.log(post.by)}
                  {console.log(getUser.username)}
                  {getUser && getUser.username == post.by && (
                    <div>
                      <button
                        onClick={() => openEditModal(post._id, post.content)}
                      >
                        Edit Post
                      </button>
                      <button onClick={() => handleDeletePost(post._id)}>
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <h1>No posts</h1>
        )}
      </div>
    </div>
  );
};
