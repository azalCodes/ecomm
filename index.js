const express = require('express');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['lkasldkfjp3jp2ij5p2i35j']
}));

app.get('/signup', (req, res) => {
    // req -- information from the user
    // res -- communicate to the browser / send info back to the user
    res.send(`
        <div>
          Your ID is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="Email" />
                <input name="password" placeholder="Password" />
                <input name="passwordConfirmation" placeholder="Password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }

    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;
        // .session is added by cookie-session library!

    res.send('Account created!');
});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

app.get('/signin', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="Email" />
                <input name="password" placeholder="Password" />
                <button>Sign In</button>
            </form>
        </div>
    `);
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found');
    }

    if (user.password !== password) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;
    res.send('You are signed in!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});