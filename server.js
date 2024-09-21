const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let messages = [];

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const message = req.body;
    messages.push(message);
    res.status(201).json(message);
});

app.put('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMessage = req.body;
    messages = messages.map(msg => msg.id === id ? updatedMessage : msg);
    res.json(updatedMessage);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
