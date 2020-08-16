const express = require('express');
const router = express.Router();
const Lakers = require('../lakers/lakersDbModel');

router.get('/', async (req, res) => {
    const players = await Lakers.find();
    players ? res.status(200).json(players)
    : res.status(404).json({message: 'The players could not be found'})
});

router.post('/', async (req, res) => {
    const info = req.body;
    const newPlayer = await Lakers.add(info);
    newPlayer ? res.status(201).json(newPlayer) 
    : res.status(400).json({message: 'Please enter the correct info for the player'})
});

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   const deletedPlayer = await Lakers.remove(id);
   deletedPlayer ? res.status(200).json({data: deletedPlayer})
   : res.status(404).json({message: 'The player with the specified ID does not exist'})
});

module.exports = router;

