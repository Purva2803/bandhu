import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router} from "react-router-dom";
import { AuthProvider,useAuth } from "../src/frontend/context/authContext"
import { PostProvider,usePost } from "../src/frontend/context/postContext";

export {useAuth};
export {usePost};



// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <PostProvider>
    <App />
    </PostProvider>
    </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
