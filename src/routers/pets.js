const express = require('express')
const router = express.Router()

const PetsController = require('./pets.controller')
const petsController = new PetsController()

router.post('/', petsController.addPet.bind(petsController))
router.get('/', petsController.getAll.bind(petsController))
router.get('/:id', petsController.getById.bind(petsController))
router.put('/:id', petsController.updatePet.bind(petsController))
router.delete('/:id', petsController.delete.bind(petsController))

module.exports = router
