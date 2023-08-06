import FormLabel from '@mui/joy/FormLabel/FormLabel';
import FormControl from "@mui/joy/FormControl"
import Sheet from '@mui/joy/Sheet/Sheet';
import React, {useState} from 'react';
import Input from '@mui/joy/Input';
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ELEVENLABS_API_KEY } from '../keys';

export default function Record() {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [name, setName] = useState();
    const api = axios.create({
        baseURL: `http://localhost:4000/`
    });
    const navigate = useNavigate();

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    async function handleSubmit() {
        const options = {
            method: 'POST',
            url: `https://api.elevenlabs.io/v1/voices/add`,
            headers: {
                'content-type': 'multipart/form-data', // Set the content type to application/json.
                'xi-api-key': `${ELEVENLABS_API_KEY}`, // Set the API key in the headers.
            },
            data: {
                name: name, // Pass in the inputText as the text to be converted to speech.
                files:[selectedFile]
            },
            responseType: 'application/json',
        }
        try {
            await axios.request(options).then((response) => {
                api.post("/addVoice", {
                    voice_id: JSON.parse(response.data).voice_id
                }).then((response) => {
                    console.log(response);
                    navigate("/home");
                });
            });
        } catch (err) {
            console.log(err);
            alert("Unable to add voice");
        }
        
    };

    return <Sheet sx={{
        width: 300,
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md'}}>
            <Typography level="h4" component="h1" textAlign={'center'}>
                Fill in the following information and upload 1 minute of audio
            </Typography>
            <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input 
                    name="name"
                    type="name"
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Upload </FormLabel>
                <input type="file" accept='audio/*' name="file" onChange={changeHandler} />
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
            </FormControl>
        <Button onClick={handleSubmit}>Submit</Button>
    </Sheet>
}