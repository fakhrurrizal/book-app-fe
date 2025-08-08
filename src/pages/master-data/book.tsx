import { getNavbarLayout } from "@/components/navbar-layout"
import { NextPageWithLayout } from "@/utils/helpers/getLayout"
import BookListPageViews from "@/view/book"

const BookList: NextPageWithLayout = () => {
    return (
        <>
            <BookListPageViews />
        </>
    )
}

BookList.getLayout = getNavbarLayout
export default BookList
