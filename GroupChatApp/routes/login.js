const express = require("express");
const router = express.Router();

// Route to display the login form
router.get("/login", (req, res) => {
    res.send(`
        <html>
            <body>
                <form action="/login" method="POST">
                    <label for="username">Username:</label><br>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required />
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `);
});

// Route to handle form submission and set username in a client-side variable
router.post("/login", (req, res) => {
    const username = req.body.username;
    res.send(`
        <html>
            <body>
                <script>
                    localStorage.setItem("username", "${username}");
                    window.location.href = "/";
                </script>
            </body>
        </html>
    `);
});

module.exports = router;