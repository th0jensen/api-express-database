const express = require('express')
const router = express.Router()
const db = require('../../db')

router.post('/', async (req, res, next) => {
    const { name, age, type, breed, has_microchip } = req.body

    try {
        await db.query(
            `
            INSERT INTO pets (name, age, type, breed, has_microchip)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [name, age, type, breed, has_microchip]
        )

        const response = await db.query(
            `
            SELECT * FROM pets WHERE name = $1
            `,
            [name]
        )
        const [pet] = response.rows

        res.status(201).json({ pet: pet })
    } catch (err) {
        next(new Error('Could not add pet: ', err))
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await db.query(`
            SELECT * FROM pets
        `)

        const pets = response.rows

        res.json({ pets: pets })
    } catch (err) {
        next(new Error('Could not get pets: ', err))
    }
})

router.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const response = await db.query(
            `
            SELECT * FROM pets WHERE id = $1
            `,
            [id]
        )

        const [pet] = response.rows

        res.json({ pet: pet })
    } catch (err) {
        next(new Error(`Could not get pet with id ${id}:`, err))
    }
})

router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const { name, age, type, breed, has_microchip } = req.body

    try {
        await db.query(
            `
            UPDATE pets
            SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5
            WHERE id = $6
            `,
            [name, age, type, breed, has_microchip, id]
        )

        const response = await db.query(
            `
            SELECT * FROM pets WHERE id = $1
            `,
            [id]
        )
        const [pet] = response.rows

        res.status(201).json({ pet })
    } catch (err) {
        next(new Error(`Could not update pet with id ${id}: `, err))
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const deletedPet = await db.query(
            `
            SELECT * FROM pets WHERE id = $1
            `,
            [id]
        )
        const [pet] = deletedPet.rows

        await db.query(
            `
            DELETE FROM pets WHERE id = $1
            `,
            [id]
        )

        res.status(201).json({ pet: pet })
    } catch (err) {
        next(new Error(`Could not delete pet with id ${id}:`, err))
    }
})

module.exports = router
