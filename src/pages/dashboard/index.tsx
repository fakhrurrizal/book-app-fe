'use client'

import { NextPageWithLayout } from '@/utils/helpers/getLayout'
import DashboardView from '../../view/dashboard'
import { getNavbarLayout } from '@/components/navbar-layout'

const DashboardPage: NextPageWithLayout = () => {
    return (
        <div>
            <DashboardView />
        </div>
    )
}

DashboardPage.getLayout = getNavbarLayout
export default DashboardPage
