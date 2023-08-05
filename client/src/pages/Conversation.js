import React, { useState, useRef } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/joy/Grid";

export default function Conversation() {
    const mimeType = "audio/webm";
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const [recording, setRecording] = useState(false);
    const mediaRecorder = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    //const [audio, setAudio] = useState(null);
    const [messages, setMessages] = useState([]);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecording(true);
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecording(false);
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
          //creates a blob file from the audiochunks data
           const audioBlob = new Blob(audioChunks, { type: mimeType });
          //creates a playable URL from the blob file.
           const audioUrl = URL.createObjectURL(audioBlob);
           //setAudio(audioUrl);
           setAudioChunks([]);
           
           const newMessages = [...messages, audioUrl]
           setMessages(newMessages);
        };

    };
    
    const styles = {
        activity: { height: 100, width: 100, justifyContent: 'center'},
    };

    return <Sheet sx={{
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md'}}>
        <Typography textAlign={"center"}>Start a conversation with {}</Typography>
        <VolumeUpIcon style={styles.activity}/>
        {!permission ? (
            <Button onClick={getMicrophonePermission}>
                Get Microphone
            </Button>
        ): null}
        {permission && !recording ? (
            <Button onClick={startRecording}>Start Recording</Button>
        ): null}
        {recording ? (
            <Button onClick={stopRecording}>Stop Recording</Button>
        ): null}
        <Paper sx={{
            width: "80vw",
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        }}>
            <Paper sx={{
                width: "calc( 100% - 20px )",
                margin: 10,
                overflowY: "scroll",
                height: "calc( 100% - 80px )",
            }}>
                {messages.map((audio) => {
                    return <Grid container justify="flex-end" direction="row-reverse">
                        <audio src={audio} controls></audio>
                    </Grid>
                })}
                {/* {audio ? (
                    <div className="audio-container">
                        <audio src={audio} controls></audio>
                        <a download href={audio}>
                            Download Recording
                        </a>
                    </div>
                ) : null} */}
            </Paper>
        </Paper>
    </Sheet>
}
    