const express = require("express");
const app = express();
const MongoDB = require("./app/utils/mongodb.util");
const ContactService = require("./app/services/contact.service");
const contactController = require("./app/controllers/contact.controller");

app.use(express.json());

// ⚠️ Đăng ký route trước khi xử lý lỗi!
async function startServer() {
    try {
        await MongoDB.connect("mongodb://127.0.0.1:27017/contactbook");
        console.log("Connected to the database!");

        const contactService = new ContactService(MongoDB.client);
        app.locals.contactService = contactService;

        const router = express.Router();

        router.post("/", (req, res, next) => contactController.create(req, res, next));
        router.get("/", (req, res, next) => contactController.findAll(req, res, next));
        router.get("/favorite", (req, res, next) => contactController.findAllFavorite(req, res, next));
        router.get("/:id", (req, res, next) => contactController.findOne(req, res, next));
        router.put("/:id", (req, res, next) => contactController.update(req, res, next));
        router.delete("/:id", (req, res, next) => contactController.delete(req, res, next));
        router.delete("/", (req, res, next) => contactController.deleteAll(req, res, next));

        app.use("/api/contacts", router);

        // Middleware lỗi sau cùng
        const ApiError = require("./app/api-error");
        app.use((req, res, next) => {
            next(new ApiError(404, "Resource not found"));
        });

        app.use((error, req, res, next) => {
            return res.status(error.statusCode || 500).json({
                message: error.message || "Internal Server Error",
            });
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();
