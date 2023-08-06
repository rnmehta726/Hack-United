import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import {
    signUpAuth,
    loginAuth,
    chatai2,
    addVoice2,
    logoutAuth,
    resetPasswordAuth
} from "./externalRequests.js"

dotenv.config();

export const signup = asyncHandler(async (req, res) => {
    try {
        res.send(
            await signUpAuth(
                req.body.email,
                req.body.password,
                req.body.name
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

export const addVoice = asyncHandler(async (req, res) => {
    try {
        res.send( 
            await addVoice2(
                req.body.voice_id
            )
        )
    } catch (err) {
        res.json(err);
    }
})

export const logout = asyncHandler(async (req, res) => {
    try {
        res.send(await logoutAuth());
    } catch (err) {
        res.json(err);
    }
})

export const resetPassword = asyncHandler(async (req, res) => {
    try {
        res.send(await resetPasswordAuth());
    } catch (err) {
        res.json(err);
    }
})