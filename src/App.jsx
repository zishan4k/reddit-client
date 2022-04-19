import React from "react";
import Header from "./features/Header/Header";
import Home from "./features/Home/Home";
import Subreddits from "./features/Subreddits/Subreddits";
import "./App.css";
import Footer from "./features/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
      <Footer />
    </>
  );
}

export default App;
