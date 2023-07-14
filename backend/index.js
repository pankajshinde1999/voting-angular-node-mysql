const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12M@rch1999',
    database: 'voting',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});
// Get all admin
app.get('/admin', (req, res) => {
    connection.query('SELECT * FROM voting', (error, results, fields) => {
        if (error) {
            res.send(error);
        }
        res.json(results);
    });
});
//get all users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            res.send(error);
        }
        res.json(results);
    });
});

// Store user details
app.post('/signUp', (req, res) => {
    const { name, username, email, password, phone, status, vote } = req.body;
    connection.query(
        `INSERT INTO users (name, username, email, password, phone, status, vote) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, username, email, password, phone, status, vote],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        }
    );
});

// Get user by username
app.get('/user/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    connection.query(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        }
    );
});

// Delete user /user/:username'
app.delete('/user/:username', (req, res) => {
    const username = req.params.username;
    connection.query(
        `DELETE FROM users WHERE username = ?`,
        [username],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        }
    );
});

// Update user /user/update
app.put('/user/update', (req, res) => {
    const { username, status, vote } = req.body;
    connection.query(
        `UPDATE users SET status = ?, vote = ? WHERE username = ?`,
        [status, vote, username],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        }
    );
});



// Get vote details
app.get('/candidates', (req, res) => {
    connection.query('SELECT * FROM votes', (error, results, fields) => {
        if (error) {
            res.send(error);
        }
        res.json(results);
    });
});

// Create candidate createcandidate
app.post('/createcandidate', (req, res) => {
    const { candidate, symbol, party, count } = req.body;
    connection.query(
        `INSERT INTO votes (candidate, symbol, party, count) VALUES (?, ?, ?, ?)`,
        [candidate, symbol, party, count],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        }
    );
});

// Delete candidate :name
app.delete('/:name', (req, res) => {
    const name = req.params.name;
    connection.query(
        `DELETE FROM votes WHERE candidate = ?`,
        [name],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        }
    );
});

// Update candidate updatecandidate
app.put('/updatecandidate', (req, res) => {
    const { candidate, count } = req.body;
    connection.query(
        `UPDATE votes SET count = ? WHERE candidate = ?`,
        [count, candidate],
        (error, results, fields) => {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        }
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});