import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { FaReddit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { setSearchTerm } from "../../store/redditSlice";

const Header = () => {
  const [searchTermPost, setSearchTermPost] = useState("");
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  const handleSearchTermChange = (e) => {
    setSearchTermPost(e.target.value);
  };

  useEffect(() => {
    setSearchTermPost(searchTerm);
  }, [searchTerm]);

  const handleSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermPost));
  };

  return (
    <header>
      <div className="logo">
        <FaReddit className="logo-icon" />
        <p>
          Reddit<span>Client</span>
        </p>
      </div>
      <form className="search" onSubmit={handleSearchTermSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTermPost}
          onChange={handleSearchTermChange}
          aria-label="Search posts"
        />
        <button
          type="submit"
          onClick={handleSearchTermSubmit}
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;
