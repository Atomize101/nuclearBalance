const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

// User can now use bodyParser function in any route handler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: ['lasdojkwcnmoiawdjoasdjjiom']
}));

app.get('/', (req, res) => {
    res.send(`
        <div>
        Your id is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if(existingUser) {
        return res.send('Email in use')
    }

    if(password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    // Create a user in our user repo to represent this person

    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the user cookie
    req.session.userId = user.id;

    res.send('Account Created');
});

app.listen(3000, () => {
    console.log('Server online');
});