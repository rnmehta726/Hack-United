import express, { json, urlencoded } from "express";
import cors from "cors";
import multer from "multer";
import {
    signup,
    login,
    chatai,
    addVoice,
    logout,
    resetPassword,
} from "./apiController.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { files: 1, filesize: 10 * 1024 * 1024},
});

app.use(
    cors({
        origin: "*",
    })
);
app.use(json());
app.use(urlencoded({ extended: false }));

app.post("/chatai", upload.single("msgFile"), chatai);
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout)
app.post("/addVoice", addVoice);
app.post("/resetPassword", resetPassword)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started on Port ${port}`)
})