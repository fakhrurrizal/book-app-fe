import { Box, Typography } from "@mui/material"

interface Props {
    maxWidth?: string
}

const DataNotFound = ({ maxWidth = '40%' }: Props) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',

            }}
        >
            <img src="/not-found.png" alt="No Data" style={{ maxWidth: maxWidth, height: 'auto', marginTop: -7 }} />
            <Typography variant="h6" marginTop={-7} >
                Data tidak ditemukan
            </Typography>
        </Box >
    )
}

export default DataNotFound