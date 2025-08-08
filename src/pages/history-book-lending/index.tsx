import { getHomeNavbarLayout } from "@/components/navbar-layout"
import { NextPageWithLayout } from "@/utils/helpers/getLayout"
import HistoryBookLendingListPageViews from "@/view/history-book-lending"

const HistoryBookLendingList: NextPageWithLayout = () => {
    return (
        <>
            <HistoryBookLendingListPageViews />
        </>
    )
}

HistoryBookLendingList.getLayout = getHomeNavbarLayout
export default HistoryBookLendingList
