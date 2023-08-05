import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import {
    signUpAuth,
    loginAuth,
    chatai2,
    addCalibrationFile
} from "./externalRequests.js"

dotenv.config();

export const signup = asyncHandler(async (req, res) => {
    try {
        res.send(
            await signUpAuth(
                req.body.email,
                req.body.password
            )
        );
    } catch (err) {
        res.json(err);
    }
});

export const login = asyncHandler(async (req, res) => {
    try {
        res.send(
            await loginAuth(
                req.body.email,
                req.body.password
            )
        );
    } catch (err) {
        res.json(err);
    }
});

export const chatai = asyncHandler(async (req, res) => {
    try {
        res.send(
            await chatai2(
                req.file
            )
        );
    } catch (err) {
        res.json(err);
    }
});

export const addAudioFile = asyncHandler(async (req, res) => {
    try {
        res.send( 
            await addCalibrationFile(
                req.file
            )
        )
    } catch (err) {
        res.json(err);
    }
})