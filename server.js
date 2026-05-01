const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const db = new sqlite3.Database('./users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/post', (req, res) => {
    const Uid = req.body.Uid;

    console.log("Received Uid:", Uid);

    db.get('SELECT * FROM users WHERE Uid = ?', [Uid], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ access: 0 });
        }

        if (!row) {
            console.log("Unknown card");
            return res.json({ access: 0 });
        }

        console.log(`User: ${row.Name}, Allowed: ${row.Allowed}`);

        return res.json({ access: row.Allowed });
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running');
});