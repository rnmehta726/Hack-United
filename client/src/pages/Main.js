import React from 'react';
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    return <Sheet sx={{
        width: 500,
        mx: 'auto', // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'none',
      }}>
        <Typography level="h2" component="h1" textAlign={"center"}>
            Welcome to Convi! To get started, choose Record below otherwise get a conversation started.
        </Typography>
        <Grid container spacing={5} columns={10} sx={{ flexGrow: 1 }} >
            <Grid xs={2}></Grid>
            <Grid xs={'auto'}>
                <Button onClick={navigate("/record")}>Record</Button>
            </Grid>
            <Grid xs={'auto'}>
                <Typography>|</Typography>
            </Grid>
            <Grid xs={'auto'}>
                <Button onClick={navigate("/conversation")}>Conversation</Button>
            </Grid>
            <Grid xs={2}></Grid>
        </Grid>
    </Sheet>
}