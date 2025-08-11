'use client'

import { useAuth } from '@/services/use-auth'
import { Icon } from '@iconify/react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactNode, useState, useEffect } from 'react'
import LoginView from '../auth/login'
import RegisterView from '../auth/register'
import { Badge } from '@mui/material'

const getInitials = (fullname: string) => {
    if (!fullname) return '';

    return fullname
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
};

const NavbarHome = ({ children }: { children: ReactNode }) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    const [openLogin, setOpenLogin] = useState<boolean>(false)

    const [openRegister, setOpenRegister] = useState<boolean>(false)

    const toggleLogin = () => setOpenLogin(!openLogin)

    const toggleRegister = () => setOpenRegister(!openRegister)

    const user = useAuth(state => state.value?.user)

    const logout = useAuth(state => state.logout)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleAvatarClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleAvatarClose()
        logout()
        router.push('/')
    }

    const handleProfile = () => {
        handleAvatarClose()
        router.push('/dashboard')
    }

    const handleHistory = () => {
        handleAvatarClose()
        router.push('/history-book-lending')
    }


    const navItems = [
        { label: 'Kategori', path: '/category' },
        { label: 'Daftar Buku', path: '/book/all' },
    ]

    if (!mounted) {
        return (
            <>
                <AppBar
                    position='fixed'
                    elevation={0}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)', // semi-transparan putih
                        backdropFilter: 'blur(12px)',                // efek blur
                        WebkitBackdropFilter: 'blur(12px)',          // dukungan Safari
                        boxShadow: 'none',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)', // opsional: garis bawah halus
                    }}
                >
                    <Container maxWidth='lg'>
                        <Toolbar disableGutters sx={{ py: 0 }}>
                            <Box className='flex justify-center items-center mb-3'>
                                <Image src='/logo.png' alt='Logo' width={70} height={70} />
                            </Box>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                                {navItems.map(item => (
                                    <Button
                                        key={item.label}
                                        onClick={() => router.push(item.path)}
                                        sx={{
                                            mx: 2,
                                            color: '#1e293b',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            textTransform: 'none',

                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                                <Button
                                    variant='contained'
                                    disabled
                                    sx={{
                                        backgroundColor: '#f3f4f6',
                                        borderRadius: 25,
                                        px: 4,
                                        py: 1.2,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                    }}
                                >
                                    Loading...
                                </Button>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                                <IconButton
                                    color='inherit'
                                    aria-label='open drawer'
                                    edge='start'
                                    onClick={handleDrawerToggle}
                                    sx={{ color: '#64748b' }}
                                >
                                    <Icon icon='mdi:menu' width={24} height={24} />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                    }}
                >
                    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                        <Typography variant='h6' sx={{ my: 2, }} className='text-primary'>
                            Book App
                        </Typography>
                        <List>
                            {navItems?.map(item => (
                                <ListItem key={item.label} disablePadding>
                                    <Button
                                        fullWidth
                                        onClick={() => router.push(item.path)}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            px: 3,
                                            py: 1.5,
                                            color: '#64748b',
                                        }}
                                    >
                                        <ListItemText primary={item.label} />
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ px: 2, mt: 2 }}>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled
                                sx={{
                                    backgroundColor: '#f3f4f6',
                                    borderRadius: 25,
                                }}
                            >
                                Loading...
                            </Button>
                        </Box>
                    </Box>
                </Drawer>

                <Box
                    component='main'
                    sx={({ breakpoints }) => ({
                        flexGrow: 1,
                        paddingY: 3,
                        paddingX: 6,
                        minHeight: `calc(100vh - 65px)`,
                        marginTop: `80px`,
                        borderTopLeftRadius: theme => theme.shape.borderRadius + 'px',
                        borderTopRightRadius: theme => theme.shape.borderRadius + 'px',
                        marginRight: '0px',
                        [breakpoints.down('md')]: {
                            marginX: '8px',
                            paddingRight: 2,
                            paddingY: 1,
                        },
                    })}
                    className='bg-[#ffffff] !rounded-md'
                >
                    {children}
                </Box>
            </>
        )
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ my: 2, }} className='text-primary'>
                Book App
            </Typography>
            <List>
                {navItems.map(item => (
                    <ListItem key={item.label} disablePadding>
                        <Button
                            fullWidth
                            onClick={() => router.push(item.path)}
                            sx={{
                                justifyContent: 'flex-start',
                                px: 3,
                                py: 1.5,
                                color: '#64748b',
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </Button>
                    </ListItem>
                ))}
            </List>

            {Number(user?.id) > 0 ? (
                <Box sx={{ px: 2, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Badge
                        overlap='circular'
                        sx={{
                            ml: 2,
                            cursor: 'pointer',
                            background: 'none',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Avatar sx={({ palette }) => ({ background: palette.primary.main })}>
                            <Typography sx={{ color: 'white' }}>{user?.fullname?.slice(0, 1).toUpperCase()}</Typography>
                        </Avatar>
                    </Badge>

                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={handleProfile}
                        className='text-primary border-primary hover:bg-primary hover:text-white'
                        sx={{
                            mb: 1,
                            borderRadius: 8,
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: '#dc2626',
                            borderRadius: 25,
                            '&:hover': {
                                backgroundColor: '#b91c1c',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            ) : (
                <Box sx={{ px: 2, mt: 2 }}>
                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={toggleLogin}
                        className='text-primary border-primary hover:bg-primary hover:text-white'
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            fontSize: "14px",
                        }}
                    >
                        Masuk
                    </Button>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={toggleRegister}
                        className='text-white bg-primary border-primary  hover:text-white'
                        sx={{
                            borderRadius: 2,
                            fontSize: "14px",
                        }}
                    >
                        Daftar
                    </Button>
                </Box>
            )}
        </Box>
    )

    return (
        <>
            <AppBar
                position='fixed'
                elevation={0}
                sx={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                }}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{ py: 0 }}>
                        <Box className='flex justify-center items-center mb-3 pt-3'>
                            <div className="w-[60px] h-[60px] border-2 p-1 border-primary rounded-full overflow-hidden">
                                <Image src="/logo.png" alt="Logo" width={60} height={60} />
                            </div>
                        </Box>
                        <Box className='ps-10' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            {navItems?.map(item => (
                                <Button
                                    key={item.label}
                                    onClick={() => router.push(item.path)}
                                    className='text-primary '
                                    sx={{
                                        mx: 2,
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        textTransform: 'none',

                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                            {Number(user?.id) > 0 ? (
                                <Badge
                                    onClick={handleAvatarClick}
                                    overlap='circular'
                                    sx={{
                                        ml: 2,
                                        cursor: 'pointer',
                                        background: 'none',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                >
                                    <Avatar sx={({ palette }) => ({ background: palette.primary.main })}>
                                        <Typography sx={{ color: 'white' }}>{user?.fullname?.slice(0, 1).toUpperCase()}</Typography>
                                    </Avatar>
                                </Badge>

                            ) : (
                                <>
                                    <Button
                                        variant='contained'
                                        onClick={toggleRegister}
                                        className='text-white bg-primary border-primary  hover:text-white'
                                        sx={{
                                            borderRadius: 2,
                                            fontSize: "14px",
                                            px: 4,
                                            py: 1.2,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                        }}
                                    >
                                        Daftar
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={toggleLogin}
                                        className='text-primary border-primary hover:bg-primary hover:text-white'
                                        sx={{
                                            borderRadius: 2,
                                            fontSize: "14px",
                                            px: 4,
                                            py: 1.2,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                        }}
                                    >
                                        Masuk
                                    </Button>
                                </>
                            )}
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleDrawerToggle}
                                sx={{ color: '#64748b' }}
                            >
                                <Icon icon='mdi:menu' width={24} height={24} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
                sx={{
                    mt: 1,
                    '& .MuiPaper-root': {
                        borderRadius: 2,
                        minWidth: 180,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {user?.role?.id === 1 ? (
                    <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                        <Icon icon="mdi:view-dashboard-outline" width={20} height={20} style={{ marginRight: 8 }} />
                        Dashboard
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleHistory} sx={{ py: 1.5 }}>
                        <Icon icon="mdi:book-clock" width={20} height={20} style={{ marginRight: 8 }} />
                        Riwayat Peminjaman
                    </MenuItem>
                )}

                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#dc2626' }}>
                    <Icon icon='mdi:logout' width={20} height={20} style={{ marginRight: 8 }} />
                    Logout
                </MenuItem>
            </Menu>

            <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
                }}
            >
                {drawer}
            </Drawer>
            <Box
                component='main'
                sx={({ breakpoints }) => ({
                    flexGrow: 1,
                    paddingY: 3,
                    paddingX: 6,
                    minHeight: `100vh`,
                    paddingTop: `80px`,
                    borderTopLeftRadius: theme => theme.shape.borderRadius + 'px',
                    borderTopRightRadius: theme => theme.shape.borderRadius + 'px',
                    marginRight: '0px',
                    [breakpoints.down('md')]: {
                        marginX: '8px',
                        paddingRight: 2,
                        paddingTop: 10,
                    },
                })}
                className='bg-[#f8f7fa] !rounded-md'
            >
                {children}
            </Box>

            {openLogin && <LoginView open={openLogin} toggle={toggleLogin} toggleRegister={toggleRegister} />}
            {openRegister && <RegisterView open={openRegister} toggle={toggleRegister} toggleLogin={toggleLogin} />}
        </>
    )
}

export default NavbarHome
