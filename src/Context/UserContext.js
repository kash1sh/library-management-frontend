import { useContext, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
// import React, {useState } from 'react';
// import axios from 'axios';
// import {userContext} from './Context/UserContext';
// import Login from './Login';
// import Home from './Home';


// function App() {
//   const [user,setUser] = useState(null);

//   const setUserValue = (value)=>{
//     setUser(value);
//   }

//   return (
//     <div className="App">
//       {
//         user?<Home user={user} />:<Login onUserChange={setUserValue} />
//       }
     
//     </div>
//   );
// }

// export default App;
