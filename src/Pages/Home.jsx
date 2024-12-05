import React from "react";
import Card from "../Components/Card";

const Home = ({
  accounts,
  setAccounts,
  newAccount,
  setNewAccount,
  addAccountHandler,
  handleToggleActive,
  handleCreatePost,
}) => {
  return (
    <div className="bg-gray-700 p-10 rounded-lg shadow-lg text-center text-white">
      <h1 className="text-3xl font-bold">Welcome to SocioSync</h1>
      <p className="text-gray-300 mt-4">
        Manage all your social accounts in one place!
      </p>

      {/* Add Account Input Section */}
      <div className="mt-6 mb-4 text-center">
        <input
          type="text"
          placeholder="Enter Username"
          value={newAccount.username}
          onChange={(e) =>
            setNewAccount({ ...newAccount, username: e.target.value })
          }
          className="p-2 border border-gray-300 text-black rounded-md mr-2"
        />
        <button
          onClick={addAccountHandler}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Account
        </button>
      </div>

      {/* Display Cards */}
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {accounts.map((account) => (
            <Card
              key={account._id || account.id || account.username}
              account={account}
              setAccounts={setAccounts}
              handleToggleActive={handleToggleActive}
              handleCreatePost={handleCreatePost}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-8">
          No accounts available. Please add an account to get started.
        </p>
      )}
    </div>
  );
};

export default Home;
