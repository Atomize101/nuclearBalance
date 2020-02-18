const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// User can now use bodyParser function in any route handler
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Account Created');
});

app.get('/boo', (req, res) => {
    res.send('hi boo');
});

app.listen(3000, () => {
    console.log('Server online');
});