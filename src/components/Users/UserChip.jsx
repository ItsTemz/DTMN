import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import React from 'react'

function UserChip({username}) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        avatar={
          <Avatar alt="Natacha" src="https://placeimg.com/192/192/people" />
        }
        label={`${username}`}
        variant="outlined"
      />
    </Stack>
  );
}

export default UserChip
