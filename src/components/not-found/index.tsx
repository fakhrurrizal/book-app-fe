import { Box, Typography } from "@mui/material"
import Image from "next/image"

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
            <Image src="/not-found.png" width={400} height={400} alt="No Data" style={{ maxWidth: maxWidth, height: 'auto', marginTop: -7 }} />
            <Typography variant="h6" sx={{ marginTop: { md: -7, xs: 0 } }}  >
                Data tidak ditemukan
            </Typography>
        </Box >
    )
}

export default DataNotFound