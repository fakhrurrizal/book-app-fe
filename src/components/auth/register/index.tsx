import IconifyIcon from "@/components/icon"
import TextField from "@/components/text-field.component"
import Transition from "@/components/transition"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { SignUpFormData, signUpSchema } from "./services"
import { useUserProfile } from "./services/register.mutation"

interface Props {
    open: boolean
    toggle: () => void
    toggleLogin: () => void
}


const RegisterView = ({ open, toggle, toggleLogin }: Props) => {

    const router = useRouter()

    const { mutateAsync: register, isLoading } = useUserProfile()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            phone: '',
            fullname: '',
            password: '',
            confirm_password: '',
        },
    })

    const handleLogin = () => {
        toggle()
        toggleLogin()
    }

    const onSubmit = async (data: SignUpFormData) => {
        try {
            await register({ ...data, role_id: 2 })
            handleLogin()
        } catch (error) {
            console.error('Submission error:', error)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={toggle}
            TransitionComponent={Transition}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                className: ` border-2 border-primary  rounded-xl  p-8  relative  overflow-visible `,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '-40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1
                }}
            >
                <Avatar
                    src="/logo.png"
                    className="border-4 border-primary "
                    sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: 'white',
                        padding: '8px'
                    }}
                />
            </Box>

            <DialogContent sx={{ padding: 0, paddingTop: '40px' }}>
                {/* Title */}
                <Box className="text-center mb-8">
                    <Typography
                        variant="h4"
                        className="text-primary"
                        sx={{
                            fontSize: '36px',
                            fontWeight: '700',
                            marginBottom: '24px'
                        }}
                    >
                        Daftar
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                control={control}
                                size='medium'
                                error={!!errors.fullname}
                                name='fullname'
                                label='Nama Lengkap*'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                control={control}
                                size='medium'
                                error={!!errors.email}
                                name='email'
                                label='Email*'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                control={control}
                                inputFormat='PHONE'
                                size='medium'
                                error={!!errors.phone}
                                placeholder='812xxxxxxx'
                                name='phone'
                                label='Phone*'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                control={control}
                                inputFormat='PASSWORD'
                                size='medium'
                                error={!!errors.password}
                                placeholder='••••••••'
                                name='password'
                                label='Password*'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                control={control}
                                inputFormat='PASSWORD'
                                size='medium'
                                error={!!errors.confirm_password}
                                placeholder='••••••••'
                                name='confirm_password'
                                label='Konfirmasi Password*'
                            />
                        </Grid>
                    </Grid>

                    <Box className='pt-4'>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            disabled={isLoading}
                            className="bg-primary"
                            sx={{
                                borderRadius: '8px',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: '600',
                                textTransform: 'none',
                                color: 'white',
                            }}
                        >
                            {isLoading ? (
                                <Box className='flex items-center gap-2'>
                                    <IconifyIcon icon='mdi:loading' className='animate-spin' />
                                    Memproses...
                                </Box>
                            ) : (
                                'Masuk'
                            )}
                        </Button>
                    </Box>
                </form>

                <Box className='text-center mt-6'>
                    <Typography
                        variant='body2'
                        style={{
                            color: '#2E5266',
                            fontSize: '14px',
                        }}
                    >
                        Sudah punya akun?{' '}
                        <Typography
                            component='span'
                            onClick={handleLogin}
                            sx={{
                                color: '#1976D2',
                                textDecoration: 'none',
                                fontWeight: '500',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Masuk Sekarang
                        </Typography>
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterView