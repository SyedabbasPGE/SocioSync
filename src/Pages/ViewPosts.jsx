import React, { useEffect, useState } from "react";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://server-u7jn.onrender.com/api/schedulepost/get-posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", response.status);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `https://server-u7jn.onrender.com/api/schedulepost/delete-post/${postId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId)); // Remove post from state
        alert("Post deleted successfully");
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (postId, updatedData) => {
    try {
      const response = await fetch(
        `https://server-u7jn.onrender.com/api/schedulepost/update-post/${postId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(
          posts.map((post) => (post._id === postId ? { ...post, ...updatedData } : post))
        );
        alert("Post updated successfully");
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Filter out posts with missing or empty data
  const filteredPosts = posts.filter(
    (post) =>
      post.postText && post.postText.trim() !== "" && post.postTime && post.postTime.trim() !== ""
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900 min-h-screen">
      <h1 className="text-xl font-bold text-white mb-4">View All Posts</h1>
      {filteredPosts.map((post) => (
        <div key={post._id} className="relative bg-white shadow rounded p-4 my-4">
          {/* Buttons in the Top-Right Corner */}
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => handleEdit(post._id, { postText: "Updated Text" })} // Example edit
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>

          {/* Account Name at the Top */}
          <p className="text-lg font-bold text-gray-800">
            {Array.isArray(post.accounts) ? post.accounts.join(", ") : "N/A"}
          </p>

          {/* Description Section */}
          <h4 className="text-gray-800 mt-3 font-semibold">Description:</h4>
          <p className="text-gray-700">{post.postText}</p>

          {/* Scheduled Time Section */}
          <h4 className="text-gray-800 mt-3 font-semibold">Scheduled Time:</h4>
          <p className="text-gray-700">{post.postTime}</p>

          {/* Media Files */}
          {post.mediaFiles && post.mediaFiles.length > 0 && (
            <div className="mt-4 flex space-x-2">
              {post.mediaFiles.map((media, index) => (
                <img
                  key={index}
                  src={media}
                  alt={`media-${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewPosts;





