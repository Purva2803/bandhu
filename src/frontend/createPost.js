
import { useState } from "react";
// import { uploadFileToCloudinary } from "./image.js"; // Import the function responsible for uploading images to Cloudinary

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const imageUrl = await uploadFileToCloudinary(image); // Call the Cloudinary upload function and retrieve the uploaded image URL

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }), // Include the uploaded image URL in the request body
      });

      if (response.ok) {
        const data = await response.json();
        window.alert("Post created successfully");
        window.location.href = "/";
      } else {
        throw new Error("Post creation failed");
      }
    } catch (error) {
      console.log(error);
      window.alert("Post creation failed");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  // const handleImageChange = (event) => {
  //   setImage(event.target.files[0]);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        onChange={handleTitleChange}
      />

      {/* <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      /> */}

      <textarea
        id="body"
        name="body"
        placeholder="Write your post here"
        onChange={handleBodyChange}
      ></textarea>

      <input type="submit" value="Create Post" />
    </form>
  );
};
