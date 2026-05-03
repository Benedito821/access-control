const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const db = new sqlite3.Database('./users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

let lastScan = {
    access: -1,
    name: "Unknown",
    photo: "uploads/default.jpg"
};

app.post('/post', (req, res) => {
    const uid = req.body.Uid;

    console.log("Received uid:", uid);

    db.get('SELECT * FROM users WHERE uid = ?', [uid], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ access: 0 });
        }

        let response;
        
        if (!row) {
            console.log("Unknown card");
            response = {
                access: 0,
                name: "Unknown",
                photo: null
            };
        }
        else
        {
            console.log(`User: ${row.name}, allowed: ${row.allowed}`);

            response = {
                access: row.allowed,
                name: row.name,
                photo: row.photo
            };
        }

        lastScan = response;

        return res.json(response);
    });
});

app.get('/last', (req, res) => {
    res.json(lastScan);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running');
});