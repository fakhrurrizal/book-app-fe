import { Slide, Stack, Typography } from '@mui/material'
import { ModalCustom } from '../custom-modal'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef } from 'react'

interface Props {
    toggle: () => void
    open: boolean
    handleDelete: () => void
    name: any
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

const ModalDelete = ({ toggle, open, handleDelete, name }: Props) => {
    return (
        <ModalCustom
            TransitionComponent={Transition}
            title='Hapus Data'
            open={open}
            fullWidth
            maxWidth='sm'
            toggle={toggle}
            buttonOkProps={{ onClick: handleDelete, variant: 'contained', color: 'error', children: 'Hapus' }}
        >
            <Stack spacing={3} sx={{ paddingX: 2.1, paddingY: 2.5 }}>
                <Typography fontSize={14} textAlign='center'>
                    Apakah anda yakin ingin menghapus data <strong>{name}</strong> ini ?
                </Typography>
            </Stack>
        </ModalCustom>
    )
}

export default ModalDelete
