import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Skeleton from "./components/Skeleton";
import { UseThemeStore } from "./store/UseThemeStore";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const SinglePage = lazy(() => import("./components/SinglePage"));
const Profile = lazy(() => import("./pages/Profile"));
const Post = lazy(() => import("./pages/Post"));

function App() {
  const { theme } = UseThemeStore();

  useEffect(() => {
    theme;
  }, [theme]);

  return (
    <div data-theme={theme}>
      <Suspense fallback={<Skeleton />}>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singlePage/:id" element={<SinglePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
