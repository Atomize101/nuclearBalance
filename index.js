const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouther = require('./routes/admin/auth');

const app = express();

// User can now use bodyParser function in any route handler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: ['lasdojkwcnmoiawdjoasdjjiom']
}));

app.use(authRouther);

app.listen(3000, () => {
    console.log('Server online');
});