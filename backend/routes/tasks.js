const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
router.post('/', async (req, res) => {
 const task = new Task(req.body);
 await task.save();
 res.status(201).send('Task created');
});
router.get('/', async (req, res) => {
 const tasks = await Task.find();
 res.json(tasks);
});
router.put('/:id', async (req, res) => {
 await Task.findByIdAndUpdate(req.params.id, req.body);
 res.send('Task updated');
});
router.delete('/:id', async (req, res) => {
 await Task.findByIdAndDelete(req.params.id);
 res.send('Task deleted');
});
module.exports = router;