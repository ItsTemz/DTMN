import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React , {useState, useEffect}from 'react'
import { getUser } from "../../context/moviedb/MovieDBActions";
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

function UserChip({givenUsername}) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      await getUser(givenUsername).then((user) => {
        setUserDetails(user);
      });
    };
    getUserData();
  }, [givenUsername]);

  const { username, userImage } = userDetails;
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={1}>
        <Chip
          avatar={<Avatar alt="userImage" src={userImage} />}
          label={`${username}`}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </ThemeProvider>
  );
}

export default UserChip
