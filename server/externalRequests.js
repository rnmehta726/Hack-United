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
import {firebaseConfig} from "./keys.js";
import axios from "axios";
import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";

// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoredb = getFirestore(app);
const client = new SpeechClient();
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})
const openai = new OpenAIApi(configuration);

export const signUpAuth = async (email, password, name) => {
    const currentUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    ).catch((e) => {
        console.log(e);
        return e;
    });

    // await signInWithEmailAndPassword(auth, email, password).catch((e) => {
    //     console.log("broken");
    //     return e;
    // });
    await setDoc(doc(firestoredb,"users", auth.currentUser.uid),{
        name: name,
        voice_id: ""
    }).then((res) => {
        console.log(res);
    })
    // await firestoredb.collection("users").doc(auth.currentUser.uid).set({
    //     name: name,
    //     voice_id: ""
    // }).catch((e) => {
    //     return e;
    // })
    
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

    const docRef = await getDoc(doc(firestoredb, "users", auth.currentUser.uid));
    const docSnap = docRef.data();
    const options = {
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${docSnap.voice_id}`,
        headers: {
            accept: 'audio/mpeg',
            'content-type': 'application/json', // Set the content type to application/json.
            'xi-api-key': `${process.env.ELEVENLABS_API_KEY}`, // Set the API key in the headers.
        },
        data: {
            text: repliedtext
        },
        responseType: 'application/json',
    }

    const newAudio = axios.request(options).data;
}

export const addVoice2 = async (voice_id) => {
    await updateDoc(doc(firestoredb,"users",auth.currentUser.uid), {"voice_id":voice_id})
}

export const logoutAuth = async () => {
    await signOut(auth);
}

export const resetPasswordAuth = async () => {
    await sendPasswordResetEmail(auth);
}