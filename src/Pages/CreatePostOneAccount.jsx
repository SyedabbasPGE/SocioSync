import React, { useState } from "react";
import { FaHeart, FaCommentDots, FaShare, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

const CreatePostOneAccount = ({ account }) => {
  const [postText, setPostText] = useState(""); // Text for the post
  const [mediaFiles, setMediaFiles] = useState([]); // Uploaded media files (both images and videos)
  const [postTime, setPostTime] = useState(""); // Scheduled post time
  const [showTimePicker, setShowTimePicker] = useState(false); // Visibility of the time picker
  const [isSubmitting, setIsSubmitting] = useState(false); // Button state
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0); // Current media index for the slider

  // Handle text input changes
  const handleTextChange = (event) => setPostText(event.target.value);

  // Handle media uploads (Images and Videos)
  const handleMediaChange = (event) => {
    const files = Array.from(event.target.files);
    const newMediaFiles = files.map((file) => ({
      type: file.type.startsWith("video/") ? "video" : "image", // Check if the file is a video or an image
      src: URL.createObjectURL(file),
      file,
    }));
    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
  };

  // Remove a media item from the list
  const handleRemoveMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    if (currentMediaIndex >= mediaFiles.length - 1) {
      setCurrentMediaIndex(0);
    }
  };

  // Navigate to the next media
  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === mediaFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to the previous media
  const previousMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? mediaFiles.length - 1 : prevIndex - 1
    );
  };

  // Toggle time picker visibility
  const toggleTimePicker = () => setShowTimePicker((prev) => !prev);

  const handleSubmit = async () => {
    setIsSubmitting(true); // Disable button and show loading state

    // Prepare the post data
    const postData = {
      postText,
      mediaFiles: mediaFiles.map((media) => media.src),
      postTime,
      accounts: [account.username], // Specific account selected
    };

    try {
      const uploadedMedia = await Promise.all(
        mediaFiles.map(async (media) => {
          const formData = new FormData();
          formData.append("media", media.file);

          const response = await fetch(
            "https://server-u7jn.onrender.com/api/schedulepost/upload-media",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            return data.url;
          } else {
            throw new Error("Failed to upload media");
          }
        })
      );

      postData.mediaFiles = uploadedMedia;

      // Save the post to the database
      const response = await fetch(
        "https://server-u7jn.onrender.com/api/schedulepost/save-post",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        alert("Post scheduled successfully!");
        setPostText("");
        setMediaFiles([]);
        setPostTime("");
        setCurrentMediaIndex(0);
      } else {
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      alert("Failed to create post. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <div className="p-8 flex gap-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      {/* Create Post Section */}
      <div className="w-1/2 space-y-4 border-r pr-8">
        <h2 className="text-2xl font-bold text-white">Create your post</h2>

        {/* Account Information */}
        <div className="flex items-center gap-4">
          <img
            src={account.profileImage}
            alt={account.username}
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <p className="text-lg font-bold text-white">{account.username}</p>
          </div>
        </div>

        {/* Text Input */}
        <textarea
          value={postText}
          onChange={handleTextChange}
          className="w-full p-2 border rounded-md"
          placeholder="What's on your mind?"
        />

        {/* Media Upload */}
        <label className="cursor-pointer flex items-center gap-2 text-white">
          <IoMdAddCircleOutline className="text-3xl text-gray-300" />
          <span className="text-gray-300">Add Photo/Video</span>
          <input
            type="file"
            onChange={handleMediaChange}
            className="hidden"
            multiple
            accept="image/*,video/*"
          />
        </label>

        <div className="flex gap-4 flex-wrap">
          {mediaFiles.map((media, index) => (
            <div key={index} className="relative w-20 h-20">
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt={`media-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <video
                  src={media.src}
                  className="w-full h-full object-cover rounded-md"
                  controls
                />
              )}
              <button
                onClick={() => handleRemoveMedia(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Add Posting Time */}
        <div>
          <h3 className="text-lg font-bold mt-4 text-white">WHEN TO POST:</h3>
          <button
            onClick={toggleTimePicker}
            className="p-2 bg-gray-100 rounded-md mt-2"
          >
            Add Posting Time
          </button>
          {showTimePicker && (
            <input
              type="datetime-local"
              onChange={(e) => setPostTime(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`p-2 rounded-md mt-4 w-full ${isSubmitting ? "bg-green-500 text-white" : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Post"}
        </button>
      </div>

      {/* Post Preview with Slider */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold text-white">Post Preview</h2>
        <div className="relative border p-4 rounded-md bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900">
          {mediaFiles.length > 0 && (
            <div className="relative w-full h-[400px] bg-black rounded-md overflow-hidden flex items-center justify-center">
              {mediaFiles[currentMediaIndex].type === "image" ? (
                <img
                  src={mediaFiles[currentMediaIndex].src}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={mediaFiles[currentMediaIndex].src}
                  className="w-full h-full object-cover"
                  controls
                />
              )}

              {/* Slider Controls */}
              {mediaFiles.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    className="absolute left-4 bg-white text-black rounded-full p-2"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 bg-white text-black rounded-full p-2"
                  >
                    <FaArrowRight />
                  </button>
                </>
              )}

              {/* Interaction Icons */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-4 text-white">
                <FaHeart className="text-2xl cursor-pointer" />
                <FaCommentDots className="text-2xl cursor-pointer" />
                <FaShare className="text-2xl cursor-pointer" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white">
                <p className="font-bold">@{account.username}</p>
                <p>{postText}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostOneAccount;



