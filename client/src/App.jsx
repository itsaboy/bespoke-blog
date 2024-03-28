import { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AppContext } from "./context/AppContext";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />,
      <Route path="/about" element={<About />} />,
      <Route path="/portfolio" element={<Portfolio />} />,
      <Route path="/gallery" element={<Gallery />} />,
      <Route path="/blog" element={<Blog />} />,
      <Route path="/blog/:postId" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />,
      <Route path="/login" element={<Login />} />,
      <Route path="/signup" element={<Signup />} />,
      <Route path="/dashboard" element={<Dashboard />} />,
    </Route>
  )
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadedLocations, setLoadedLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(() => {
    const savedLocation = localStorage.getItem("currentLocation");
    return savedLocation || "defaultLocation";
  });

  useEffect(() => {
    localStorage.setItem("currentLocation", currentLocation);
  }, [currentLocation]);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        loadedLocations,
        setLoadedLocations,
        currentLocation,
        setCurrentLocation,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
