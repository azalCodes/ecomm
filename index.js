const express = require('express');

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

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('Account created!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});