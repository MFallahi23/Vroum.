import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import About from "./pages/About";
import Blog from "./pages/Blog";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ProfileSetting from "./pages/ProfileSetting";
import ProfilePosts from "./pages/ProfilePosts";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileEdit />} />
            <Route path="edit" element={<ProfileEdit />} />
            <Route path="posts" element={<ProfilePosts />} />
            <Route path="settings" element={<ProfileSetting />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
