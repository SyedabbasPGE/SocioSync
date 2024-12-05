import React, { useState } from "react";
import { FaHeart, FaCommentDots, FaShare } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

const CreatePost = ({ accounts }) => {
  const [postText, setPostText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [postTime, setPostTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // Button state

  const toggleAccountSelection = (index) => {
    setSelectedAccounts((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const selectAllAccounts = () => setSelectedAccounts(accounts.map((_, idx) => idx));
  const deselectAllAccounts = () => setSelectedAccounts([]);

  const handleTextChange = (event) => setPostText(event.target.value);

  const handleMediaChange = (event) => {
    const files = Array.from(event.target.files);

    setMediaFiles((prev) =>
      prev.concat(
        files.map((file) => ({
          type: file.type.startsWith("video/") ? "video" : "image",
          file,
          src: URL.createObjectURL(file),
        }))
      )
    );
  };

  const handleRemoveMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    if (currentMediaIndex >= mediaFiles.length - 1) {
      setCurrentMediaIndex(0);
    }
  };

  const toggleTimePicker = () => setShowTimePicker((prev) => !prev);

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
  };

  const previousMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? mediaFiles.length - 1 : prevIndex - 1
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // Disable button and show loading state
  
    // Fetch account names from the selected indices
    const selectedAccountUsernames = selectedAccounts.map(
      (id) => accounts[id]?.username
    );
  
    const postData = {
      postText,
      mediaFiles: mediaFiles.map((media) => media.src),
      postTime,
      accounts: selectedAccountUsernames, // Send account names
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
        setSelectedAccounts([]);
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
      {/* Left Section: Create Post Form */}
      <div className="w-1/2 space-y-4 border-r pr-8">
        <h2 className="text-2xl font-bold text-white">Create your post</h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <button
              onClick={selectAllAccounts}
              className="text-blue-500 hover:underline"
            >
              + Select All
            </button>
            <button
              onClick={deselectAllAccounts}
              className="text-blue-500 hover:underline"
            >
              Select None
            </button>
          </div>
          <div className="flex gap-4 flex-wrap">
            {accounts.map((account, index) => (
              <div
                key={index}
                className={`relative cursor-pointer p-2 border rounded-md flex items-center gap-2 ${
                  selectedAccounts.includes(index)
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleAccountSelection(index)}
              >
                {selectedAccounts.includes(index) && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✔</span>
                  </div>
                )}
                <img
                  src={account.profileImage}
                  alt={account.username}
                  className="w-10 h-10 rounded-full"
                />
                <span>{account.username}</span>
              </div>
            ))}
          </div>
        </div>

        <textarea
          value={postText}
          onChange={handleTextChange}
          className="w-full p-2 border rounded-md"
          placeholder="What's on your mind?"
        />

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
          className={`p-2 rounded-md mt-4 w-full ${
            isSubmitting
              ? "bg-green-500 text-white"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Post"}
        </button>
      </div>

      {/* Right Section: Post Preview */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold text-white">Post Preview</h2>
        <div className="relative border p-4 rounded-md bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900">
          {mediaFiles.length > 0 && (
            <div className="relative w-full h-[400px] bg-black rounded-md overflow-hidden flex items-center justify-center">
              {mediaFiles[currentMediaIndex].type === "image" ? (
                <img
                  src={mediaFiles[currentMediaIndex].src}
                  alt={`preview-${currentMediaIndex}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={mediaFiles[currentMediaIndex].src}
                  className="w-full h-full object-cover"
                  controls
                />
              )}

              {/* TikTok-style Interaction Icons */}
              <div className="absolute bottom-4 right-4 flex flex-col space-y-3 items-center">
                <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
                  <FaHeart className="text-gray-700 text-sm" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
                  <FaCommentDots className="text-gray-700 text-sm" />
                </button>
                <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
                  <FaShare className="text-gray-700 text-sm" />
                </button>
              </div>

              {/* Display Selected Accounts and Caption */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white">
                <p className="font-bold">
                  {selectedAccounts
                    .map((id) => `@${accounts[id]?.username}`)
                    .join(", ")}
                </p>
                <p>{postText}</p>
              </div>

              {/* Show Carousel Navigation Only If More Than One Media File */}
              {mediaFiles.length > 1 && (
                <>
                  <button
                    onClick={previousMedia}
                    className="absolute left-4 bg-white text-black rounded-full p-2"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 bg-white text-black rounded-full p-2"
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

