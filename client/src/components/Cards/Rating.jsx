import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
    const [value, setValue] = React.useState(2);

    return (
        <Box sx={{ '& > legend': { mt: 2 } }}>
            {/* <Typography component="legend">Controlled</Typography> */}

            <Rating
                name="simple-controlled"
                value={value}
                disabled
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    fontSize: 20, // Change the size of the stars (adjust as needed)

                }}
            />

        </Box>
    );
}