import React, {useState, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const BookPage = props => {
    const initialBookState = {
        _id: null,
        title: '',
        author: '',
        pages: '',
        rating:''
    };

    const [currentBook, setCurrentBook] = useState(initialBookState);
    const [message, setMessage] = useState("");

    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const getBook = async (id) => {
        try {
            const fetched = await request('/api/books/' + id, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setCurrentBook(fetched)
        } catch (e){}
    };

    useEffect(() => {
        getBook(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentBook({ ...currentBook, [name]: value });
    };

    const updateBook = async () => {
        const data = {
            _id: currentBook._id,
            title: currentBook.title,
            author: currentBook.author,
            pages: currentBook.pages,
            rating: currentBook.rating
        }
        try {
            const res = await request('/api/books/' + currentBook._id, 'PUT', data, {})
            if (res) setMessage("The book was updated successfully!");
        } catch (e){}
    };

    const deleteBook = async () => {
        try {
            const res = await request('/api/books/' + currentBook._id, 'DELETE', null, {})
            if (res) props.history.push("/books")
        } catch (e){}
    };

    return (
        <div>
            {currentBook ? (
                <div className="edit-form" style={{marginTop:20}}>
                    <h4>Book</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentBook.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={currentBook.author}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pages">Pages</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pages"
                                name="pages"
                                value={currentBook.pages}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={currentBook.rating}
                                onChange={handleInputChange}
                            />
                        </div>

                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteBook}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateBook}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Book...</p>
                </div>
            )}
        </div>
    );
};