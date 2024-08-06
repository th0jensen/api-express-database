const db = require('../../db')
const BaseController = require('./base.controller')

class PetsController extends BaseController {
    constructor() {
        super('pets')
    }

    async addPet(req, res, next) {
        const { name, age, type, breed, has_microchip } = req.body

        try {
            const response = await db.query(
                `
                INSERT INTO pets (name, age, type, breed, has_microchip)
                VALUES ($1, $2, $3, $4, $5)
                returning *
                `,
                [name, age, type, breed, has_microchip]
            )
            const [pet] = response.rows

            res.status(201).json({ pet: pet })
        } catch (err) {
            next(new Error('Could not add pet: ', err))
        }
    }

    async updatePet(req, res, next) {
        const id = parseInt(req.params.id)
        const { name, age, type, breed, has_microchip } = req.body

        try {
            const response = await db.query(
                `
                UPDATE pets
                SET name = $1, age = $2, type = $3, breed = $4, has_microchip = $5
                WHERE id = $6
                returning *
                `,
                [name, age, type, breed, has_microchip, id]
            )
            const [pet] = response.rows

            res.status(201).json({ pet })
        } catch (err) {
            next(new Error(`Could not update pet with id ${id}: `, err))
        }
    }
}

module.exports = PetsController
