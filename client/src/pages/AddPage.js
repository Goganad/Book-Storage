import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";

export const AddPage = () => {
    const initialBookState = {
        id: null,
        title: '',
        author: '',
        pages:'',
        rating:'',
    };

    const [book, setBook] = useState(initialBookState);
    const [submitted, setSubmitted] = useState(false);

    const {request} = useHttp()

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({...book, [name]: value});
    };

    const saveBook = async () => {
        const data = {
            title: book.title,
            author: book.author,
            pages: book.pages,
            rating: book.rating
        };
        try{
            const res = await request('/api/books', 'POST', {...data}, {})
            if (res){
                setSubmitted(true);
            }
        }catch (e){}
    };

    const newBook = () => {
        setBook(initialBookState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form" style={{marginTop: 10}}>
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newBook}>
                        Add New
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={book.title}
                            onChange={handleInputChange}
                            name="title"
                        />

                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            required
                            value={book.author}
                            onChange={handleInputChange}
                            name="author"
                        />

                        <label htmlFor="pages">Pages</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pages"
                            required
                            value={book.pages}
                            onChange={handleInputChange}
                            name="pages"
                        />

                        <label htmlFor="rating">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rating"
                            required
                            value={book.rating}
                            onChange={handleInputChange}
                            name="rating"
                        />
                    </div>

                    <button onClick={saveBook} className="btn lime accent-2">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
