import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from "react-router-dom";
import axios from "axios"
;
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = axios.create({
    baseURL: `http://localhost:4000/`
  });

  async function handlelogin() {
    if (!(email && password)) {
      alert("Fill in all fields!");
    } else {
      try {
          await api.post("/login", {
            email: email,
            password: password
          }).then((response) => {
            console.log(response);
            navigate("/home");
          });
      } catch (err) {
          console.log(err);
          alert("Unable to sign Up");
      }
    }
  }

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
    boxShadow: 'md',
  }}>
    <div>
    <Typography level="h4" component="h1">
      Welcome Back!
    </Typography>
    <Typography level="body-sm">Sign in to continue.</Typography>
    </div>

    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input
        name="email"
        type="email"
        placeholder="johndoe@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl>
      <FormLabel>Password</FormLabel>
      <Input
        name="password"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </FormControl>
    <Button sx={{mt: 1}} onClick={handlelogin}>Log In</Button>
    <Typography
      endDecorator={<Link href="/signup">Sign up</Link>}
      fontSize="sm"
      sx={{alignSelf: 'center'}}
      >
      Don't have an account?
    </Typography>
  </Sheet>;
}