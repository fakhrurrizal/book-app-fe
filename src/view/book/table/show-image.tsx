import { ModalCustom } from '@/components/custom-modal'
import { Stack } from '@mui/material'

interface Props {
    open: boolean
    toggle: () => void
    image: string | undefined
}

const ShowImage = ({ open, toggle, image }: Props) => {
    return (
        <ModalCustom
            open={open}
            title=''
            toggle={toggle}
            onClose={toggle}
            hiddenClose
            maxWidth='xs'
            hideButton
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }}

        // buttonOkProps={{
        //     onClick: handleSubmit(onSubmit),
        //     children: isLoading ? <CircularProgress size={22} /> : 'Simpan',
        //     disabled: isLoading,
        // }}
        >
            <Stack width={300} height={'auto'}>
                <img src={image} alt='image' />
            </Stack>
        </ModalCustom>
    )
}

export default ShowImage
