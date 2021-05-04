import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export const List = ({books}) => {
    if(!books.length){
        return <p className="center">No books here</p>
    }
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {
                    books.map( (book, index) => {
                        return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.pages}</td>
                                <td>{book.rating}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>

    )
}