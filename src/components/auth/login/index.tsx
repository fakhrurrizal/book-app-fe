import { ModalCustom } from "@/components/custom-modal"
import IconifyIcon from "@/components/icon"
import TextField from "@/components/text-field.component"
import axiosInterceptor from "@/config/axios.config"
import { useAuth } from "@/services/use-auth"
import { BookCategory } from "@/types/category-response.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Dialog, Fade, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginForm, loginSchema, useLoginMutation } from "./services"
import { Avatar } from "@mui/material"
import { DialogContent } from "@mui/material"
import Transition from "@/components/transition"
import { toast } from "react-toastify"

interface Props {
    open: boolean
    toggle: () => void
    toggleRegister: () => void
}


const LoginView = ({ open, toggle, toggleRegister }: Props) => {

    const router = useRouter()

    const { mutateAsync: login, isLoading: isLoading } = useLoginMutation()

    const setAuth = useAuth(state => state.setAuth)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await login(data)
            const user = res?.data?.user
            const accessToken = 'Bearer ' + res?.data?.access_token
            setAuth({ accessToken, user })
            axiosInterceptor.defaults.headers.common['Authorization'] = accessToken
            axios.defaults.headers.common['Authorization'] = accessToken
            toast.success("Berhasil masuk")
            if (user?.role?.id === 2) {
                toggle()
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const handleRegister = () => {
        toggle()
        toggleRegister()
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
                        Login
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <Grid container spacing={2}>
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
                                inputFormat='PASSWORD'
                                size='medium'
                                error={!!errors.password}
                                placeholder='••••••••'
                                name='password'
                                label='Password*'
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

                {/* Register Link */}
                <Box className="text-center mt-6">
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666',
                            fontSize: '14px'
                        }}
                    >
                        Belum punya akun?{' '}
                        <Typography
                            component="span"
                            onClick={handleRegister}
                            sx={{
                                color: '#1976D2',
                                textDecoration: 'none',
                                fontWeight: '500',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Daftar Sekarang
                        </Typography>
                    </Typography>
                </Box>

                {/* Back Link */}
                <Box className="text-center mt-4">
                    <Typography
                        component="span"
                        onClick={toggle}
                        sx={{
                            color: '#1976D2',
                            textDecoration: 'none',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '14px',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Kembali
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginView