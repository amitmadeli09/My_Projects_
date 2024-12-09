const express = require("express");
const fs = require("fs");
const router = express.Router();

// Route to display the message form and messages
router.get("/", (req, res) => {
    fs.readFile("messages.txt", "utf-8", (err, data) => {
        const messages = err || !data.trim() ? "No Message exists" : data;
        res.send(`
            <html>
                <body>
                    <p>${messages.replace(/\n/g, "<br>")}</p>
                    <form action="/" method="POST">
                        <label for="message">Enter a new message:</label><br>
                        <input type="text" id="message" name="message" placeholder="Enter a message" required />
                        <button type="submit">Submit</button>
                    </form>
                    <script>
                        const username = localStorage.getItem("username") || "Anonymous";
                        document.querySelector("form").addEventListener("submit", function(event) {
                            const input = document.getElementById("message");
                            input.value = username + ": " + input.value;
                        });
                    </script>
                </body>
            </html>
        `);
    });
});

// Route to handle message submission
router.post("/", (req, res) => {
    const message = req.body.message;
    fs.appendFile("messages.txt", message + "\n", (err) => {
        if (err) {
            console.error("Failed to save the message:", err);
            return res.status(500).send("Failed to save the message.");
        }
        res.redirect("/");
    });
});

module.exports = router;