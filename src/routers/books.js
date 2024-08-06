const express = require('express')
const router = express.Router()

const BooksController = require('./books.controller')
const booksController = new BooksController()

router.post('/', booksController.addBook.bind(booksController))
router.get('/', booksController.getAll.bind(booksController))
router.get('/:id', booksController.getById.bind(booksController))
router.put('/:id', booksController.updateBook.bind(booksController))
router.delete('/:id', booksController.delete.bind(booksController))

module.exports = router
