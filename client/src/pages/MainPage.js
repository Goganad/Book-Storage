import React, {useContext, useEffect, useState, useCallback} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {List} from "../components/List"

export const MainPage = () => {
    const [books, setBooks] = useState([])
    const {loading, request} = useHttp()
    const [editBook, setEditBook] = useState({

    })
    const auth = useContext(AuthContext)

    const fetchBooks = useCallback( async() => {
            try {
                const fetched = await request('/api/books', 'GET', null, {
                    Authorization: `Bearer ${auth.token}`
                })
                setBooks(fetched.books || [])
            } catch (e){}
        }, [auth.token, request])

    useEffect(() => {
        fetchBooks()
    }, [fetchBooks])

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            {!loading && <List books={books}/>}
        </div>
    )

}


