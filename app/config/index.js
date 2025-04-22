const express = require("express");
const cors = require("cors");
const contactController = require('../controllers/contact.controller'); // Đảm bảo đường dẫn đúng
const ContactService = require("../services/contact.service"); // Kiểm tra đường dẫn tới service
const MongoDB = require("../utils/mongodb.util"); // Kiểm tra đường dẫn tới utils

const app = express();

app.use(cors());
app.use(express.json());

// Khởi tạo ContactService với MongoDB client
const contactService = new ContactService(MongoDB.client);

// Định nghĩa các route
app.post("/api/contacts", (req, res) => {
    contactController.create(req, res, contactService);
});

app.get("/api/contacts", (req, res) => {
    contactController.findALL(req, res, contactService);
});

app.get("/api/contacts/favorite", (req, res) => {
    contactController.findALLFavorite(req, res, contactService);
});

app.get("/api/contacts/:id", (req, res) => {
    contactController.findOne(req, res, contactService);
});

app.put("/api/contacts/:id", (req, res) => {
    contactController.update(req, res, contactService);
});

app.delete("/api/contacts/:id", (req, res) => {
    contactController.delete(req, res, contactService);
});

app.delete("/api/contacts", (req, res) => {
    contactController.deleteALL(req, res, contactService);
});

// Xử lý route không tồn tại
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

module.exports = app;
