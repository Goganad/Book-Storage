import React, {useState, useEffect, useContext, useCallback} from "react";
import { Link } from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const retrieveBooks = useCallback( async() => {
        try {
            const fetched = await request('/api/books', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setBooks(fetched.books || [])
        } catch (e){}
    }, [auth.token, request])

    useEffect(() => {
        retrieveBooks();
    }, [retrieveBooks]);

    const refreshList = () => {
        retrieveBooks();
        setCurrentBook(null);
        setCurrentIndex(-1);
    };

    const setActiveBook = (book, index) => {
        setCurrentBook(book);
        setCurrentIndex(index);
    };

    const downloadBook = async () => {
        try {

        } catch (e){}
    };

    return (
        <div className="list row" style={{marginTop: 20}}>
          <div className="col-md-6">
            <h4>Books List</h4>
            <ul className="list-group">
              {books &&
                books.map((book, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active indigo darken-4" : "")
                    }
                    onClick={() => setActiveBook(book, index)}
                    key={index}
                  >
                    {book.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentBook ? (
              <div>
                  <h4>Book</h4>
                  <div>
                      <label>
                          <strong>Title:</strong>
                      </label>{" "}
                      {currentBook.title}
                  </div>
                  <div>
                      <label>
                        <strong>Author:</strong>
                      </label>{" "}
                      {currentBook.author}
                  </div>
                  <div>
                      <label>
                          <strong>Pages:</strong>
                      </label>{" "}
                      {currentBook.pages}
                  </div>
                  <div>
                      <label>
                          <strong>Rating:</strong>
                      </label>{" "}
                      {currentBook.rating}
                  </div>
                  <Link
                      to={"/books/" + currentBook._id}
                      className="badge badge-warning lime accent-2"
                  >
                      Open
                  </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Book...</p>
              </div>
            )}
          </div>
        </div>
      );
};


