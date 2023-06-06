const express = require("express");
const entries = require("./data/entries");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.get("/api/entries", (req, res) => {
//   res.json(entries);
// });

app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port - ${PORT}`));
