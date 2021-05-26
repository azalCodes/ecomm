const express = require('express');
const usersRepo = require('./repositories/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // req -- information from the user
    // res -- communicate to the browser / send info back to the user
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="Email" />
                <input name="password" placeholder="Password" />
                <input name="passwordConfirmation" placeholder="Password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    res.send('Account created!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});