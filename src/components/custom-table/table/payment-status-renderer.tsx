import IconifyIcon from '@/components/icon'
import { Button } from '@mui/material'
import { Box } from '@mui/material'

interface Props {
    row: any
    handleContinue: any
    handlePayment: any
    handleContinuePayment: any
}

export const StatusButtonRenderer = (props: Props) => {
    const { row, handleContinue, handleContinuePayment, handlePayment } = props

    const status = row?.status

    interface StatusButtonProps {
        statusRedaksi: string
        clickAction?: any
    }

    const StatusButton = (props: StatusButtonProps) => {
        const { statusRedaksi, clickAction } = props

        return (
            <>
                <Box
                    sx={{
                        marginX: 'auto',
                        width: 'fit-content',
                        borderBottom: '1.5px solid transparent',
                        ':hover': { borderBottom: clickAction ? '1.5px solid #447eff' : '' },
                    }}
                >
                    {clickAction ? (
                        <Button
                            variant='text'
                            endIcon={<IconifyIcon icon='iconamoon:arrow-right-2-bold' />}
                            sx={{
                                px: 0,
                                py: 0,
                                fontSize: '13px',
                                fontWeight: 600,
                                ':hover': { backgroundColor: 'transparent' },
                                textAlign: 'left',
                            }}
                            onClick={clickAction}
                        >
                            <span>{statusRedaksi}</span>
                        </Button>
                    ) : (
                        <Box
                            sx={{
                                color: '#447eff',
                                fontSize: '13px',
                                fontWeight: 600,
                                letterSpacing: '0.25px',
                                ':hover': { cursor: 'default' },
                            }}
                        >
                            <span>{statusRedaksi}</span>
                        </Box>
                    )}
                </Box>
            </>
        )
    }

    if (row.step_status === 4 && row?.transaction_id === 0) {
        return <StatusButton statusRedaksi='Lanjut ke proses pembayaran' clickAction={handlePayment} />
    } else if (row?.transaction_id !== 0 && status === 0) {
        return <StatusButton statusRedaksi='Lakukan pembayaran' clickAction={handleContinuePayment} />
    } else if (status === 1) {
        return <StatusButton statusRedaksi='Menunggu Moderasi' />
    } else if (status === 2) {
        return <StatusButton statusRedaksi='Sedang dalam proses moderasi' />
    } else if (status === 3) {
        return <StatusButton statusRedaksi='Menunggu waktu tayang' />
    } else if (status === 4) {
        return <StatusButton statusRedaksi='Campaign ditolak' />
    } else if (status === 5) {
        return <StatusButton statusRedaksi='Sedang tayang' />
    } else if (status === 6) {
        return <StatusButton statusRedaksi='Sudah tayang' />
    } else if (row?.step_status < 4) {
        return <StatusButton statusRedaksi='Lanjut isi campaign' clickAction={handleContinue} />
    }
    // else if (status === 7) {
    //     return <StatusButton statusRedaksi='Lanjut ke proses pembayaran' clickAction={handlePayment} />
    // } else if (status === 8) {
    //     return <StatusButton statusRedaksi='Lakukan pembayaran' clickAction={handleContinuePayment} />
    // }
    else {
        return (
            <>
                <StatusButton statusRedaksi='Error occured' />
            </>
        )
    }
}
