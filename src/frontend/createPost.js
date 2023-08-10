import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./context/authContext";
import { postContext, usePost } from "./context/postContext";
import { v4 as uuid } from "uuid";
import {BasicUsage} from "../frontend/modal/createpost"
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

import cloudinary from "cloudinary-core";
import { bookmarkPostHandler } from "../backend/controllers/UserController";
import '../frontend/styles/posts.css'

export const CreatePost = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [content, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [picture_url, setImageUrl] = useState("");
  const { user } = useAuth();
  const { createPost, posts, setPosts, likePost } = useContext(postContext);
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
      };

      await createPost(post);
      setPosts([...posts, post]); //
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

  const handleImageChange = async (event) => {
    setImage(event.target.files[0]);
    setLoader(true);

    const mediaUrl = await uploadMedia(event.target.files[0]);
    console.log(mediaUrl);
    setImageUrl(mediaUrl.secure_url);
  };

  useEffect(() => {
    console.log("Updated posts:", posts);
    setPosts(posts);
  }, [posts]);
  return (


    <div>
     
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          id="content"
          name="content"
          placeholder="Content"
          value={content}
          onChange={handleTitleChange}
        /> */}

        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        {picture_url ? (
          <img src={picture_url} alt="post" width="300" height="300" />
        ) : null}

        <input
          id="content"
          name="content"
          placeholder="Write your post here"
          value={content}
          onChange={handleBodyChange}
        />

        <input type="submit" value="Create Post" />
      </form>
      {/* 
      {loader ? (
        <div className="loader">Loading...</div>
      ) : posts.length > 0 ? (
       
        <div>
       <img  src={posts.picture_url} alt="Post Picture" />
        <h1>{posts.content}</h1>
        
          </div>

      ) : (
        <h1>No posts</h1>
      )} */}
  

  {/* function BasicUsage() {
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"

                />
              {picture_url && (
                <img src={picture_url} alt="post" width="300" height="300" />
              )}
              <input
                id="content"
                name="content"
                placeholder="Write your post here"
                value={content}
                onChange={handleBodyChange}
              />
              <input type="submit" value="Create Post" />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    } */}


      <div>
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
  );
};
