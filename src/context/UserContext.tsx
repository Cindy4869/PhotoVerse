// import React, { createContext, useState } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const initializeUser = async (userId) => {
//     console.log("Initializing user with ID:", userId);
//     try {
//       const response = await fetch(`http://localhost:4000/api/auth/user/${userId}`);
//       const data = await response.json();
//       if (response.ok) {
//         console.log("User data fetched:", data.user);
//         setUser(data.user);
//       } else {
//         console.error("Failed to fetch user:", data.error);
//       }
//     } catch (error) {
//       console.error("Error initializing user:", error);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, initializeUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface UserContextProps {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("loggedInUser"));
  }, []);

  const setUserIdComposed = useCallback((id: string | null) => {
    setUserId(id);
    if (id) {
      localStorage.setItem("loggedInUser", id);
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId: setUserIdComposed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
