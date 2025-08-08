import { ReactElement } from 'react'
import { DefaultLayout } from '../layout'
import NavbarHome from '../layout/navbar-home'
import { PrivateRoute } from '../private-route'

export const getNavbarLayout = (page: ReactElement) => {
    return (
        <PrivateRoute>
            <DefaultLayout>{page}</DefaultLayout>
        </PrivateRoute>
    )
}

export const getHomeNavbarLayout = (page: ReactElement) => {
    return <NavbarHome>{page}</NavbarHome>
}
