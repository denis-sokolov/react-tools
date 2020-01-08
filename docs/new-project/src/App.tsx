import React from "react";
import { hot } from "react-hot-loader/root";
import About from "./About";
import Home from "./Home";
import NotFound from "./NotFound";

export default hot(function App() {
  if (location.pathname === "/about") return <About />;
  if (location.pathname === "/") return <Home />;
  return <NotFound />;
});
