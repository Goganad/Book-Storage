const {Router} = require('express')
const Book = require('../models/Book')
const token = require('../middlewares/verifyToken.middleware')
const router = Router()

// /api/books
router.get(
    '/',
    token,
    async (req, res) => {
        try{
            const books = await Book.find()
            res.json({books: books})
        } catch (e) {
            res.status(500).json({message: "Something is wrong on server, try again :("})
        }
    })

// /api/books/:id
router.get(
    '/:id',
    token,
    async (req, res) => {
        try{
            const book = await Book.findById(req.params.id)
            if(!book){
                return res.status(404).json({message: 'Can\'t find book'})
            }else{
                res.json(book)
            }
        } catch (e) {
            res.status(500).json({message: "Something is wrong on server, try again :("})
        }
    })

// /api/books
router.post(
    '/',
    token,
    async (req,res) => {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            pages: req.body.pages,
            rating: req.body.rating
        })
        try {
            const newBook = await book.save()
            res.status(201).json({
                title: newBook.title,
                author: newBook.author,
                pages: newBook.pages,
                rating: newBook.rating
            })
        } catch (e) {
            res.status(400).json({message: "Something is wrong on server, try again :("})
        }
    }
)

// /api/books/:id
router.put(
    '/:id',
    token,
    getBooks,
    async (req,res) => {
        if (req.body.title != null){
            res.book.title = req.body.title
        }
        if (req.body.author != null){
            res.book.author = req.body.author
        }
        if (req.body.pages != null){
            res.book.pages = req.body.pages
        }
        if (req.body.rating != null){
            res.book.rating = req.body.rating
        }
        try{
            const updateBook = await res.book.save()
            res.status(201).json(updateBook)
        } catch (e){
            res.status(400).json({message: "Something is wrong on server, try again :("})
        }
    }
)

// /api/books/:id
router.delete(
    '/:id',
    token,
    getBooks,
    async (req, res) => {
    try{
        await res.book.remove()
        res.status(201).json({message: 'Book deleted'})
    } catch(e){
        res.status(500).json({ message: "Something is wrong on server, try again :("})
    }
})

async function getBooks(req, res, next){
    let book
    try{
        book = await Book.findById(req.params.id)
        if(!book){
            return res.status(404).json({message: 'Can\'t find book'})
        }
    } catch (e){
        res.status(500).json({ message: "Something is wrong on server, try again :("})
    }
    res.book = book
    next()
}

module.exports = router