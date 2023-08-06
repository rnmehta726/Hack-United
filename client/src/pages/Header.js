import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000/`
});

const pages = ['Record', 'Conversation'];

export default function Header() {
    const navigate = useNavigate();

    async function logOut() {
      try{
        await api.post("/logout", {}).then((response) => {
          console.log(response);
          navigate("/");
        });
      } catch (err) {
        console.log(err);
        alert("Unable to log out");
      }
    }

    return (
        <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <img width={70} height={70} src={require("../assets/convi-logo.png")} alt="logo"/>
                {pages.map((page) => (
                    <Button
                        key={page}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={() => navigate('/' + page.toLowerCase())}
                    >
                        {page}
                    </Button>
                ))}
                <Button onClick={logOut} sx={{ my: 2, color: 'white', display: 'block'}}>Log Out</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}