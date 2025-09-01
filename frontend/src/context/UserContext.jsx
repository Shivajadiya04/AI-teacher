import React, { createContext, useState } from "react";

// Context create
export const UserContext = createContext();

// Context Provider
export const UserProvider = ({ children }) => {
  // Signup / login ke time jo data mila hoga (initial state yaha set kar do)
  const [user, setUser] = useState({
    name: "Shiva Jadiya",  // Signup se aayega
    email: "shivajadiya@example.com", // Signup se aayega
    phone: "",
    college: "",
    profilePic: "" // image upload ka link
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
