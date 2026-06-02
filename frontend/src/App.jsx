import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { SocketProvider } from "./context/SocketContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Profile from "./pages/profile/Profile";
import Home from "./pages/chat/Home";
import GroupPage from "./pages/chat/GroupPage";

const App = () => {
  return (
    <BrowserRouter>

      {/* AUTH LAYER */}
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>

            <Routes>
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <Login />
                  </AuthLayout>
                }
              />

              <Route
                path="/register"
                element={
                  <AuthLayout>
                    <Register />
                  </AuthLayout>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile/>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/groups"
                element={
                  <ProtectedRoute>
                    <GroupPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Home />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

          </ChatProvider>
        </SocketProvider>
      </AuthProvider>

    </BrowserRouter>
  );
};

export default App;