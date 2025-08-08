import { getNavbarLayout } from "@/components/navbar-layout"
import { NextPageWithLayout } from "@/utils/helpers/getLayout"
import HistoryListPageViews from "@/view/history"

const HistoryList: NextPageWithLayout = () => {
    return (
        <>
            <HistoryListPageViews />
        </>
    )
}

HistoryList.getLayout = getNavbarLayout
export default HistoryList
