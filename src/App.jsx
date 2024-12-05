import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Terms from "./Pages/Terms"; // Import Terms Page
import Privacy from "./Pages/Privacypage"; // Import Privacy Page
import CreatePost from "./Pages/CreatePost";
import CreatePostOneAccount from "./Pages/CreatePostOneAccount";
import ViewPosts from "./Pages/ViewPosts";
import ViewPostOneAccount from "./Pages/ViewPostOneAccount";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    username: "",
    profileImage: "https://via.placeholder.com/60",
    isActive: false,
    posts: 0,
    time: "",
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication status
  }, []);

  // Fetch accounts from the API if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchAccounts = async () => {
        try {
          const response = await fetch(
            "https://server-u7jn.onrender.com/api/accounts/"
          );
          if (response.ok) {
            const data = await response.json();
            setAccounts(data);
          } else {
            console.error("Failed to fetch accounts:", response.status);
          }
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };
      fetchAccounts();
    }
  }, [isAuthenticated]);

  // Add a new account
  const addAccountHandler = async () => {
    if (newAccount.username.trim()) {
      const validNewAccount = {
        ...newAccount,
        time: new Date().toISOString(),
      };

      try {
        const response = await fetch(
          "https://server-u7jn.onrender.com/api/accounts/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validNewAccount),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Account successfully created:", data);

          // Update accounts list after adding new account
          const accountsResponse = await fetch(
            "https://server-u7jn.onrender.com/api/accounts/"
          );
          if (accountsResponse.ok) {
            const updatedAccounts = await accountsResponse.json();
            setAccounts(updatedAccounts);
          }

          // Clear new account form
          setNewAccount({
            username: "",
            profileImage: "https://via.placeholder.com/60",
            isActive: false,
            posts: 0,
            time: "",
          });
        } else {
          console.error("Failed to create account:", response.status);
        }
      } catch (error) {
        console.error("Error creating account:", error);
      }
    } else {
      console.log("No username provided, cannot create account.");
    }
  };

  // Toggle account activity status
  const handleToggleActive = (username) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.username === username
          ? { ...account, isActive: !account.isActive }
          : account
      )
    );
  };

  // Handle post creation for a selected account
  const handleCreatePost = (account) => {
    setSelectedAccount(account);
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* If user is not authenticated, show only Terms and Privacy routes */}
        {!isAuthenticated ? (
          <Routes>
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/terms" />} />{" "}
            {/* Redirect other paths to /terms */}
          </Routes>
        ) : (
          <>
            {/* Show Navbar, Sidebar, and Footer for authenticated users */}
            <Navbar />
            <div className="flex flex-grow pt-[80px]">
              <Sidebar />
              <div className="flex-1 p-6 ml-[70px]">
                <Routes>
                  {/* Protected Routes */}
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route
                    path="/home"
                    element={
                      <Home
                        accounts={accounts}
                        setAccounts={setAccounts}
                        newAccount={newAccount}
                        setNewAccount={setNewAccount}
                        addAccountHandler={addAccountHandler}
                        handleToggleActive={handleToggleActive}
                        handleCreatePost={handleCreatePost}
                      />
                    }
                  />
                  <Route
                    path="/create-post"
                    element={
                      <CreatePost
                        accounts={accounts}
                        setAccounts={setAccounts}
                      />
                    }
                  />
                  <Route
                    path="/create-post-one-account"
                    element={<CreatePostOneAccount account={selectedAccount} />}
                  />
                  <Route path="/view-posts" element={<ViewPosts />} />
                  <Route
                    path="/view-posts-one-account"
                    element={<ViewPostOneAccount />}
                  />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
