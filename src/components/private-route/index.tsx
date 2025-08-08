'use client'

import { useAuth } from '@/services/use-auth'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const user = useAuth(state => state.value.user)

    // useEffect(() => {
    //     if (!user && router.asPath !== '/') {
    //         const currentPath = router.pathname
    //         const currentQuery = { ...router.query, isLogin: 'true' }

    //         router.replace({
    //             pathname: currentPath,
    //             query: currentQuery,
    //         }, undefined, { shallow: true })
    //     }
    // }, [user, router])

    useEffect(() => {
        if (!user) {
            router.push('/category')
        }
    }, [user, router])

    return <>{children}</>
}
