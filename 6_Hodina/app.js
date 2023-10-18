const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


const Task = require('./taskModel');


mongoose.connect('mongodb+srv://bryscejnt:NFm8leFwe7SFdHGx@cluster0.39mgzrf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/tasks', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Task text is required' });
      }

      const newTask = new Task({ text, completed: false });

      await newTask.save();
  
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Failed to add the task' });
    }
});
  

app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await Task.find({});
  
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

app.delete('/api/tasks', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Task text is required in the request body' });
    }

    try {
        console.log('Task text received for deletion:', text);
        const deletedTask = await Task.findOneAndDelete({ text });

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(deletedTask);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete the task' });
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
