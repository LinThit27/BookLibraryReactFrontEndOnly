import SearchContainer from "../components/SearchContainer";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import React, { useReducer } from "react";
import CardContainer from "../components/CardContainer";
import { useTheme } from "../context/ThemeProvider";

export const ACTIONS = {
  SEARCH_BOOK: "search_book",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SEARCH_BOOK:
      return (state = action.payload.searchQuery);
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [darkTheme, setDarkTheme] = useTheme();
  return (
    <>
      <div className={`main-content ${darkTheme ? "" : "light"}`}>
        <SearchContainer dispatch={dispatch} />
        <CardContainer searchQuery={state} />
      </div>
      <RightSidebar />
    </>
  );
};

export default Home;
