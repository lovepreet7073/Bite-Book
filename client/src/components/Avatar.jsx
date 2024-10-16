import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

export default function VariantAvatars({ username }) {
    // Get the first letter of the username, or use a fallback like 'N' if no username is provided
    const firstLetter = username ? username.charAt(0).toUpperCase() : 'N';

    return (
        <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="">
                {firstLetter}
            </Avatar>
        </Stack>
    );
}
