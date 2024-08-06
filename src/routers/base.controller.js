const db = require('../../db')

class BaseController {
    constructor(tableName) {
        this.tableName = tableName
    }

    async getAll(req, res, next) {
        try {
            const response = await db.query(
                `
                SELECT * FROM ${this.tableName}
                `
            )
            const items = response.rows

            res.json({ [this.tableName]: items })
        } catch (err) {
            next(new Error(`Could not get ${this.tableName}: `, err))
        }
    }

    async getById(req, res, next) {
        const id = parseInt(req.params.id)

        try {
            const response = await db.query(
                `
                SELECT * FROM ${this.tableName} WHERE id = $1
                `,
                [id]
            )
            const [item] = response.rows

            res.json({ [this.tableName.slice(0, -1)]: item })
        } catch (err) {
            next(
                new Error(
                    `Could not get item from ${this.tableName} with id ${id}:`,
                    err
                )
            )
        }
    }

    async delete(req, res, next) {
        const id = parseInt(req.params.id)

        try {
            const response = await db.query(
                `
                DELETE FROM ${this.tableName} WHERE id = $1
                returning *
                `,
                [id]
            )
            const [item] = response.rows

            res.status(201).json({ [this.tableName.slice(0, -1)]: item })
        } catch (err) {
            next(
                new Error(
                    `Could not delete ${this.tableName} with id ${id}:`,
                    err
                )
            )
        }
    }
}

module.exports = BaseController
