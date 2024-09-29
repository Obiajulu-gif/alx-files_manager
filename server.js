const express = require("express");
const routes = require("./routes/index"); // Load the routes from routes/index.js
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use the routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
