import * as React from "react";
import Typography from "@mui/joy/Typography";
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Container from "@mui/joy/Container";
import Box from "@mui/joy/Box";
import { typographyClasses } from '@mui/joy/Typography';
import AspectRatio from "@mui/joy/AspectRatio";
import {useNavigate} from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  
  return <Container
    sx={(theme) => ({
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 10,
      gap: 4,
      [theme.breakpoints.up(834)]: {
        flexDirection: 'row',
        gap: 6,
      },
      [theme.breakpoints.up(1199)]: {
        gap: 12,
      },
    })}
  >
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '50ch',
        textAlign: 'center',
        flexShrink: 999,
        [theme.breakpoints.up(834)]: {
          minWidth: 420,
          alignItems: 'flex-start',
          textAlign: 'initial',
        },
        [`& .${typographyClasses.root}`]: {
          textWrap: 'balance',
        },
      })}
    >
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        The power to connect
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Welcome to Convi: A place to reconnct
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Have a conversation with your loved ones in a matter of minutes using artificial intelligence-powered
        voice replication.
      </Typography>
      <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />} onClick={() => navigate("/signup")}>
        Get Started
      </Button>
      <Typography>
        Already a member? <Link fontWeight="lg" href="/login">Sign in</Link>
      </Typography>
    </Box>
    <AspectRatio
      ratio={600 / 520}
      variant="outlined"
      maxHeight={300}
      sx={(theme) => ({
        minWidth: 300,
        alignSelf: 'stretch',
        [theme.breakpoints.up(834)]: {
          alignSelf: 'initial',
          flexGrow: 1,
          '--AspectRatio-maxHeight': '520px',
          '--AspectRatio-minHeight': '400px',
        },
        borderRadius: 'sm',
        bgcolor: 'background.level2',
        flexBasis: '50%',
      })}
    >
      <img
        src={require("./assets/convi.png")}
        alt="Logo"
      />
    </AspectRatio>
  </Container>
}
