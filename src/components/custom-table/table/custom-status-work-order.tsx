// StatusBadge.js
import { Box } from '@mui/material'

const StatusRendererWork = ({ status }: { status: number }) => {
    let statusText = ''
    let bgColor = ''

    switch (status) {
        case 0:
            statusText = 'Menunggu'
            bgColor = '#FFA726' // oranye terang
            break
        case 1:
            statusText = 'Sedang Dikerjakan'
            bgColor = '#42A5F5' // biru sedang
            break
        case 2:
            statusText = 'Selesai'
            bgColor = '#66BB6A' // hijau sedang
            break
        default:
            statusText = 'Tidak Diketahui'
            bgColor = '#BDBDBD' // abu-abu sedang untuk status tidak dikenal
    }

    return (
        <Box
            sx={{
                backgroundColor: bgColor,
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '4px 8px',
                textAlign: 'center',
                display: 'inline-block',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                minWidth: '100px',
            }}
        >
            {statusText}
        </Box>
    )
}

export default StatusRendererWork
