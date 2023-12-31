import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import zlib from "zlib";
import pako from "pako";
import { useTheme } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";

const ReadBookNavbar = ({ id }) => {
  const { currentPage: currentPageFromUrl } = useParams();
  const [isHeartClick, setIsHeartClick] = useState(false);
  const [isBookmarkClick, setIsBookmarkClick] = useState(false);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [darkTheme, setDarkTheme] = useTheme();
  const [currentPage, setCurrentPage] = useState(
    currentPageFromUrl ? parseInt(currentPageFromUrl) + 2 : 2
  );

  const [fetchBackward, setFetchBackward] = useState(false);

  const firstPageIndexRef = useRef(0);
  const secondPageIndexRef = useRef(1);
  const firstPage = data?.contents[0].page_no;
  const lastPage = data?.contents[data?.contents.length - 1]?.page_no;

  const isCurrentPageTwo = currentPage === 2;
  const subtractValue = isCurrentPageTwo ? -1 : -2;
  const increastValue = isCurrentPageTwo ? 1 : 2;
  const shouldFetchDataBackward = currentPage === firstPage + increastValue;
  console.log("shouldFetchDataBackward--", shouldFetchDataBackward);
  const shouldFetchData = currentPage === lastPage + subtractValue;
  let twoDArray = [];
  const fetchUrl = `api/v1/book/${id}/${currentPage}`;
  let fetchDataForSkip = false;
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(fetchUrl)
        .then((res) => {
          if (res.status != 200) {
            throw new Error("Network response was not ok");
          }
          return res.data;
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setIsPending(false);
        });
    };
    fetchData();
    firstPageIndexRef.current = 0;
    secondPageIndexRef.current = 1;
  }, [
    id,
    shouldFetchData,
    fetchBackward,
    currentPageFromUrl,
    fetchDataForSkip,
  ]);

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 2);
    firstPageIndexRef.current += 1;
    secondPageIndexRef.current += 2;
  };

  const handlePreviousPageClick = () => {
    // setCurrentPage((prevPage) => prevPage - 2);
    // firstPageIndexRef.current -= 1;
    // secondPageIndexRef.current -= 2;
    setFetchBackward(!fetchBackward);
  };
  if (data) {
    const originalArray = data?.contents;
    twoDArray = originalArray.reduce((result, item, index, array) => {
      if (index % 2 === 0) {
        result.push([item, array[index + 1]]);
      }
      return result;
    }, []);
    9;
  }

  const handleEndPageClick = () => {
    setCurrentPage(data?.book.totalPage);
    fetchDataForSkip = true;
  };

  const handleHeartClick = () => {
    setIsHeartClick(!isHeartClick);
  };
  const handleBookmarkClick = () => {
    setIsBookmarkClick(!isBookmarkClick);
  };

  const handleStartPageClick = () => {
    setCurrentPage(2);
    firstPageIndexRef.current = 0;
    secondPageIndexRef.current = 1;
  };

  return (
    <>
      <div className="book-read-navbar">
        <div className="title-container">
          <span>{data?.book.title}</span>
          <i
            className={`fa-${
              isHeartClick ? "solid" : "regular"
            } fa-heart hover`}
            onClick={handleHeartClick}
          ></i>
        </div>
        <div className="page-function-container">
          <div className="page-search">
            <span class="material-symbols-outlined hover">search</span>
            <input
              type="number"
              placeholder="1"
              value={
                data?.contents[secondPageIndexRef.current] &&
                data?.contents[secondPageIndexRef.current].page_no
              }
            />
          </div>
          <button onClick={handlePreviousPageClick}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button onClick={handleNextPageClick}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <i
            className={`fa-${
              isBookmarkClick ? "solid" : "regular"
            } fa-bookmark hover`}
            onClick={handleBookmarkClick}
          ></i>
          <button onClick={handleStartPageClick}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button onClick={handleEndPageClick}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
          <i className="fa-solid fa-expand hover"></i>
          <i
            className="fa-solid fa-circle-half-stroke hover"
            onClick={() => setDarkTheme(!darkTheme)}
          ></i>
        </div>
      </div>

      <div className={`book-page ${darkTheme ? "" : "light"}`}>
        <div className={`book-page left ${darkTheme ? "" : "light"}`}>
          {twoDArray[firstPageIndexRef.current] && (
            <>
              <p>{twoDArray[firstPageIndexRef.current][0]?.page_no}</p>
              <p>{twoDArray[firstPageIndexRef.current][0]?.content}</p>
            </>
          )}
        </div>

        <div className={`book-page right ${darkTheme ? "" : "light"}`}>
          {twoDArray[firstPageIndexRef.current] && (
            <>
              <p>{twoDArray[firstPageIndexRef.current][1]?.page_no}</p>
              <p>{twoDArray[firstPageIndexRef.current][1]?.content}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReadBookNavbar;
