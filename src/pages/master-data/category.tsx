import { getNavbarLayout } from "@/components/navbar-layout"
import { NextPageWithLayout } from "@/utils/helpers/getLayout"
import BookCategoryListPageViews from "@/view/category"

const CategoryList: NextPageWithLayout = () => {
    return (
        <>
            <BookCategoryListPageViews />
        </>
    )
}

CategoryList.getLayout = getNavbarLayout
export default CategoryList
