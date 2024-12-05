import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  account,
  setAccounts,
  handleToggleActive,
  handleCreatePost,
}) => {
  const navigate = useNavigate();

  // Function to delete an account
  const deleteAccountHandler = async () => {
    if (!account.id) {
      console.error("Account ID is missing for deletion");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      // Make a DELETE request to the backend
      const response = await fetch(
        `https://server-u7jn.onrender.com/api/accounts/${account.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // If the account is successfully deleted, update the state
        setAccounts((prevAccounts) =>
          prevAccounts.filter((acc) => acc.id !== account.id)
        );
        alert("Account deleted successfully");
      } else {
        alert("Failed to delete account");
        console.error("Delete response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting the account. Please try again.");
    }
  };

  return (
    <div className="relative group w-full sm:w-[300px] h-[300px] bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 group-hover:opacity-0 transition-opacity duration-300">
        <img
          src={account.profileImage}
          alt={`${account.username}'s profile`}
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
        <h3 className="mt-4 text-lg font-semibold text-white">
          {account.username}
        </h3>
        <p
          className={`mt-2 text-sm font-medium ${
            account.isActive ? "text-green-400" : "text-gray-400"
          }`}
        >
          {account.isActive ? "Running" : "Stopped"}
        </p>
      </div>

      <div className="absolute inset-0 bg-gray-900 text-white rounded-lg opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-6 transition-opacity duration-300">
        <div className="absolute top-2 right-2">
          <button
            onClick={() => handleToggleActive(account.username)}
            className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
          >
            {account.isActive ? "Stop" : "Start"}
          </button>
        </div>
        <h3 className="text-lg font-semibold text-blue-400">
          {account.username}
        </h3>
        <p className="mt-2 text-sm">Total Posts: {account.posts}</p>
        <p className="text-sm">Last Active: {account.time}</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => {
              handleCreatePost(account);
              navigate("/create-post-one-account");
            }}
            className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700 transition"
          >
            + Create Post
          </button>
          <button
            onClick={() =>
              navigate(`/view-posts-one-account`, { state: { account } })
            }
            className="px-3 py-1 text-sm rounded-md bg-green-600 hover:bg-green-700 transition"
          >
            View Posts
          </button>
        </div>
        {/* Delete Account Button */}
        <button
          onClick={deleteAccountHandler}
          className="absolute top-2 left-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm font-semibold"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Card;
