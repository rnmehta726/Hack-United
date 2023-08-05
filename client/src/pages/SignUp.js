import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const api = axios.create({
    baseURL: `http://localhost:4000/`
  });

  async function handlesignup() {
    if (!(name && email && password && confirmPassword)) {
      alert("Fill in all fields!");
    } else if (confirmPassword !== password) {
      alert("Passwords do not match up!");
    } else {
      try {
          await api.post("/signup", {
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
      Welcome!
    </Typography>
    <Typography level="body-sm">Sign up to continue.</Typography>
    </div>

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

    <FormControl>
      <FormLabel>Confirm Password</FormLabel>
      <Input
        name="password"
        type="password"
        placeholder="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </FormControl>

    <Button sx={{mt: 1}} onClick={handlesignup}>Sign Up</Button>
    <Typography
      endDecorator={<Link href="/login">Log In</Link>}
      fontSize="sm"
      sx={{alignSelf: 'center'}}
      >
      Already have an account?
    </Typography>
  </Sheet>;
}