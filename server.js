const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send('OK');
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running');
});