const layout = require('../layout');

module.exports = ({ req }) => {
    return layout({
        content: `
            <div>
                Your ID is: ${req.session.userId}
                <form method="POST">
                    <input name="email" placeholder="Email" />
                    <input name="password" placeholder="Password" />
                    <input name="passwordConfirmation" placeholder="Password confirmation" />
                    <button>Sign Up</button>
                </form>
            </div>
        `
    });
};