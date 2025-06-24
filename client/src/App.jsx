import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
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
  useEffect(()=>{
    theme ;
  },[theme])

  return (
    <>
      <div data-theme={theme} >
        <Suspense fallback={<Skeleton/>}>
          <Toaster position="top-right"/>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
            <Route path="/singlePage/:id" element={<SinglePage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
