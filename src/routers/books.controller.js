const db = require('../../db')
const BaseController = require('./base.controller')

class BooksController extends BaseController {
    constructor() {
        super('books')
    }

    async addBook(req, res, next) {
        const { title, type, author, topic, publication_date, pages } = req.body

        try {
            const response = await db.query(
                `
                INSERT INTO books (title, type, author, topic, publication_date, pages)
                VALUES ($1, $2, $3, $4, $5, $6)
                returning *
                `,
                [title, type, author, topic, publication_date, pages]
            )
            const [book] = response.rows

            res.status(201).json({ book: book })
        } catch (err) {
            next(new Error('Could not add book: ', err))
        }
    }

    async updateBook(req, res, next) {
        const { title, type, author, topic, publication_date, pages } = req.body

        try {
            const response = await db.query(
                `
                INSERT INTO books (title, type, author, topic, publication_date, pages)
                VALUES ($1, $2, $3, $4, $5, $6)
                returning *
                `,
                [title, type, author, topic, publication_date, pages]
            )
            const [book] = response.rows

            res.status(201).json({ book: book })
        } catch (err) {
            next(new Error('Could not add book: ', err))
        }
    }
}

module.exports = BooksController
