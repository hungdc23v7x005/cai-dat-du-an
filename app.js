
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware lỗi
const ApiError = require("./app/api-error");
app.use((req, res, next) => {
    next(new ApiError(404, "Resource not found"));
});
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
