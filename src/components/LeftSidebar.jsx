import BookmarksList from "./BookmarksList";
import React, { useState } from "react";
import WishList from "./WishList";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
const LeftSidebar = () => {
  const [isBookmarkToggleOn, setIsBookmarkToggleOn] = useState(false);
  const [isWishListToggleOn, seIsWishListToggleOn] = useState(false);
  const [darkTheme, setDarkTheme] = useTheme();
  const bookmarkToggleClick = () => {
    if (isBookmarkToggleOn) {
      setIsBookmarkToggleOn(false);
      return;
    }
    setIsBookmarkToggleOn(true);
  };

  const wishToggleClick = () => {
    if (isWishListToggleOn) {
      seIsWishListToggleOn(false);
      return;
    }
    seIsWishListToggleOn(true);
  };

  return (
    <div className={`left-sidebar ${darkTheme ? "" : "light"}`}>
      <ul className={`sidebar-content ${darkTheme ? "" : "light"}`}>
        <li className="sidebar-dropdown">
          <i className="fa-solid fa-house"></i>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a className="sidebar-dropdown" onClick={bookmarkToggleClick}>
            <i className="fa-regular fa-bookmark"></i> Bookmark
          </a>
        </li>
        <li>{isBookmarkToggleOn && <BookmarksList />}</li>
        <li>
          <a className="sidebar-dropdown" onClick={wishToggleClick}>
            <i className="fa-regular fa-heart"></i> Wish List
          </a>
        </li>
        <li>{isWishListToggleOn && <WishList />}</li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
