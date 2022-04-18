import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaReddit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { setSearchTerm } from "../../store/redditPostsSlice";

const Header = () => {
  const [searchTermPost, setSearchTermPost] = useState("");
  const searchTerm = useSelector((state) => state.redditPosts.searchTerm);
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
        <form className="search" onSubmit={handleSearchTermSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchTermPost}
            onChange={handleSearchTermChange}
            aria-label="Search posts"
          />
        </form>
        <button
          type="submit"
          onClick={handleSearchTermSubmit}
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>
    </header>
  );
};

export default Header;
