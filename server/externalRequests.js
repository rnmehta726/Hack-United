import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import { getStorage, uploadBytes, ref as storageRef } from "firebase/storage";
import  * as fs  from "fs";
import { SpeechClient } from "@google-cloud/speech";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { firebaseConfig } from "./keys.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const client = new SpeechClient();
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})
const openai = new OpenAIApi(configuration);

export const signUpAuth = async (email, password) => {
    const currentUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    ).catch((e) => {
        return e;
    });

    await signInWithEmailAndPassword(auth, email, password).catch((e) => {
        return e;
    });
    
    return currentUser;
}

export const loginAuth = async (email, password) => {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password).catch((e) => {
        return e;
    })

    return auth.currentUser;
}

export const chatai2 = async (audioFile) => {
    const filename = audioFile
    const file = fs.readFileSync(filename);
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes
    };
    const configure = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        langageCode: 'en-US',
    }

    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => {
        result.alternatives[0].transcript
    }).join('\n');

    const answer = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        prompt: transcription,
        max_tokens: 100,
        temperature: 1,
    })

    const repliedtext = answer.data.choices[0].text;
}

export const addCalibrationFile = async (calibrationFile) => {
    const targetRef = storageRef(
        storage,
        `${auth.currentUser.uid}/calibrationFile`
    )

    await uploadBytes(targetRef, calibrationFile.buffer)
}