import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/utils.css";
import "./styles/pages/auth.css";
import "./styles/pages/chat.css";
import "./styles/pages/profile.css";
import "./styles/components/chat.css";
import "./styles/components/group.css";
import "./styles/components/common.css";
import "./styles/components/notifications.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);