const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname))); // Serve static files from the root directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let messages = []; // Initialize empty messages array

// API endpoints
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
