import { MenuOutlined } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'
import { appBarHeight } from '..'
import ExpandedDrawer from './drawer'
import { GenerateMiniListItem } from './mini-navbar'
import dynamic from 'next/dynamic'
import { menu_static } from '@/utils/constants/data'
import { pathnames } from '@/utils/constants/pathnames'
import { useApplicationSettings } from '@/services/use-application-settings'
import { useAuth } from '@/services/use-auth'

// const version = require('package.json').version

const LogoForAppBar = dynamic(() => import('@/components/logo').then(mod => mod.LogoForAppBar), { ssr: false })
const UserMenu = dynamic(() => import('@/components/user-menu').then(mod => mod.UserMenu), { ssr: false })

interface NavbarProps extends PropsWithChildren<any> {
    drawerWidth?: number
}

const Navbar: React.FC<NavbarProps> = (Props: NavbarProps) => {
    const { drawerWidth } = Props

    const [currentTime, setCurrentTime] = useState<string>(dayjs().format('DD MMMM YYYY HH:mm:ss'))

    const logout = useAuth(state => state.logout)

    const list_menu = menu_static

    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    const isExpandDrawer = useApplicationSettings(state => state.value.expandSidebar)

    const toggleExpandDrawer = useApplicationSettings(state => state.toggleExpandSidebar)

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState)
    }

    const handleLogout = async () => {
        logout()
    }

    useEffect(() => {
        setCurrentTime(dayjs().format('DD MMMM YYYY HH:mm:ss'))
        const interval = setInterval(() => {
            setCurrentTime(dayjs().format('DD MMMM YYYY HH:mm:ss'))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (!currentTime) return null

    return (
        <>
            <Box
                sx={({ palette }) => ({
                    backgroundColor: palette.background.default,
                })}
            >
                <AppBar
                    position='fixed'
                    sx={{
                        backgroundColor: theme => theme.palette.background.default,
                        backgroundImage: 'none',
                        boxShadow: 'none',
                        zIndex: theme => theme.zIndex.drawer + 1,
                    }}
                    className='!shadow-sm '
                >
                    <Toolbar
                        sx={() => ({
                            minHeight: appBarHeight + 'px !important',
                        })}
                        className='flex justify-between gap-1'
                    >
                        <Box className='page-header flex gap-1 shrink-0'>
                            <div className='flex-shrink-0 hidden md:block'>
                                <LogoForAppBar />
                            </div>

                            <Box
                                sx={({ breakpoints }) => ({
                                    width: 30,
                                    display: 'flex',
                                    marginLeft: 8,
                                    alignItems: 'center',
                                    [breakpoints.down('md')]: {
                                        display: 'none',
                                    },
                                })}
                            >
                                <IconButton onClick={toggleExpandDrawer}>
                                    <MenuOutlined color='primary' />
                                </IconButton>
                            </Box>

                            <Box
                                sx={({ breakpoints }) => ({
                                    display: 'none',
                                    alignItems: 'center',
                                    [breakpoints.down('md')]: {
                                        display: 'flex',
                                    },
                                })}
                            >
                                <IconButton onClick={handleDrawerToggle}>
                                    <MenuOutlined color='primary' />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box className='flex justify-end'>
                            <div className='sm:flex items-center hidden h-full'>
                                <UserMenu handleLogout={handleLogout} />
                            </div>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant='permanent'
                    transitionDuration={300}
                    sx={({ breakpoints, palette }) => ({
                        width: drawerWidth,
                        position: 'relative',
                        flexShrink: 0,
                        transition: 'all .5s',
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: palette.background.default,
                            // borderRight: 'none'
                            pt: '3px',
                            pr: '3px',
                        },
                        [breakpoints.down('md')]: {
                            display: 'none',
                        },
                    })}
                    className='shadow-md'
                >
                    {isExpandDrawer ? (
                        <>
                            {
                                <ExpandedDrawer
                                    items={list_menu}
                                    appBarHeight={appBarHeight}
                                    handleLogout={handleLogout}
                                />
                            }
                        </>
                    ) : (
                        <GenerateMiniListItem items={list_menu} />
                    )}
                </Drawer>

                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: '80%',
                            paddingTop: appBarHeight + 'px',
                            borderRight: 'none',
                        },
                    }}
                >
                    <>{<ExpandedDrawer items={list_menu} appBarHeight={appBarHeight} handleLogout={handleLogout} />}</>
                </Drawer>
            </Box>
        </>
    )
}

export default Navbar
