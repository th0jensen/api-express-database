const express = require('express')
const router = express.Router()
const db = require('../../db')

router.post('/', async (req, res, next) => {
    const { title, type, author, topic, publication_date, pages } = req.body

    try {
        await db.query(
            `
            INSERT INTO books (title, type, author, topic, publication_date, pages)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [title, type, author, topic, publication_date, pages]
        )

        const response = await db.query(
            `
            SELECT * FROM books WHERE title = $1
            `,
            [title]
        )
        const [book] = response.rows

        res.status(201).json({ book: book })
    } catch (err) {
        next(new Error('Could not add book: ', err))
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await db.query(`
            SELECT * FROM books
        `)

        const books = response.rows

        res.json({ books: books })
    } catch (err) {
        next(new Error('Could not get books: ', err))
    }
})

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const response = await db.query(
            `
            SELECT * FROM books WHERE id = $1
            `,
            [id]
        )

        const [book] = response.rows

        res.json({ book: book })
    } catch (err) {
        next(new Error(`Could not get book with id ${id}:`, err))
    }
})

router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const { title, type, author, topic, publication_date, pages } = req.body

    try {
        await db.query(
            `
            UPDATE books
            SET title = $1, type = $2, author = $3, topic = $4, publication_date = $5, pages = $6
            WHERE id = $7
            `,
            [title, type, author, topic, publication_date, pages, id]
        )

        const response = await db.query(
            `
            SELECT * FROM books WHERE id = $1
            `,
            [id]
        )
        const [book] = response.rows

        res.status(201).json({ book })
    } catch (err) {
        next(new Error(`Could not update book with id ${id}: `, err))
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const deletedBook = await db.query(
            `
            SELECT * FROM books WHERE id = $1
            `,
            [id]
        )
        const [book] = deletedBook.rows

        await db.query(
            `
            DELETE FROM books WHERE id = $1
            `,
            [id]
        )

        res.status(201).json({ book: book })
    } catch (err) {
        next(new Error(`Could not delete book with id ${id}:`, err))
    }
})

module.exports = router
