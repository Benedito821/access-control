const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');
const app = express();

const db = new sqlite3.Database('./users');
const localhostIPv4 = '127.0.0.1';
const localhostIPv6 = '::1';
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    
    /* Send a default state when a client connects */
    ws.send(JSON.stringify({
        access: -1,
        name: "Unknown",
        photo: "uploads/default.jpg"
    }));
});

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

        /* Broadcast the scan result to all connected WebSocket clients */
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        });

        return res.json(response);
    });
});

app.server = app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});

app.server.on('upgrade', (request, socket, head) => {
    const ip = request.socket.remoteAddress;

    console.log("WS connection from:", ip);

    /*send updates only to the admin */
    if (ip !== localhostIPv4 && ip !== localhostIPv6) {
        console.log("Rejected non-local connection");
        socket.destroy();
        return;
    }
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});