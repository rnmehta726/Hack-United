import express, { json, urlencoded } from "express";
import cors from "cors";
import multer from "multer";
import {
    signup,
    login,
    chatai,
    addAudioFile
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

app.post("/chatai", upload.single("audioFile"), chatai);
app.post("/signup", signup);
app.post("/login", login);
app.post("/addaudiofile", upload.single("calibrationFile"), addAudioFile);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on Port ${port}`)
})