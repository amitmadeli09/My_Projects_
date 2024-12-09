const express = require("express");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login");
const messageRoutes = require("./routes/messages");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Use the routes
app.use("/", loginRoutes);
app.use("/", messageRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});