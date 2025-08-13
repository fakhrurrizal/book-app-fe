import HeaderSectionTableCustom from '@/components/custom-table/header'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import IconifyIcon from '@/components/icon'
import PaginationSectionTableCustom from '@/components/pagination'
import { CustomTooltip } from '@/components/tooltip'
import { Order } from '@/utils/api-response/pagination'
import { useBookCategoory } from '@/utils/queries/use-book-category'
import { SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddTrip from './modal/add'
import FilterCategoryBook from './modal/filter'
import { BookCategoryFilterForm } from './modal/schema'
import RowOptions from './table/row-options'

const HeaderItems = [
    {
        label: 'Nama Kategori',
        alignCenter: false,
    },
    {
        label: 'Ikon',
        alignCenter: true,
    },

    {
        label: 'Keterangan',
        alignCenter: false,
    },

    {
        label: 'Action',
        alignCenter: true,
    },
]

const BookCategoryListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const router = useRouter()

    const { sort, transportation_type_id } = router.query

    const form = useForm<BookCategoryFilterForm>({
        defaultValues: {
            order: { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
            sort: { id: "id", label: "" },
        },
    })

    const { data: { data: ListData = [], recordsFiltered = 0 } = { data: [] }, isLoading } =
        useBookCategoory({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            transportationType: transportation_type_id as string,
            sort: sort ? (sort as Order) : undefined,
        })

    const handleLimitChange = useCallback((e: SelectChangeEvent) => {
        setPageSize(parseInt(e.target.value, 10))
    }, [])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        setPage(1)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchValue(searchValue)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchValue])

    const handlePageChange = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const toggleAdd = () => setAddOpen(!addOpen)

    const toggleFilter = () => setFilterOpen(!filterOpen)

    return (
        <>
            <div className='custom__styled__container'>
                <HeaderSectionTableCustom title={'Daftar Kategori Buku'} />
                <ToolbarSectionTableCustom
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    toggleAdd={toggleAdd}
                    addButtonLabel={'Tambah baru'}
                    isLoading={isLoading}
                    toggleFilter={toggleFilter}
                />
                <CustomStyledTableContainer isLoading={isLoading} recordsFiltered={recordsFiltered}>
                    <CustomStyledTable>
                        <TableHeaderCustomTable data={HeaderItems} />
                        <tbody className='text-xs'>
                            {!isLoading &&
                                Array.isArray(ListData) &&
                                ListData?.map(item => {
                                    return (
                                        <Fragment key={item?.id}>
                                            <CustomStyledTableRow>
                                                <CustomStyledTableHead>{item?.name}</CustomStyledTableHead>
                                                <CustomStyledTableData className="text-center">
                                                    <div className="flex justify-center items-center h-full">
                                                        <IconifyIcon icon={item?.icon} className='text-primary' fontSize={40} />
                                                    </div>
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='truncate max-w-[190px]'>
                                                    <CustomTooltip title={item?.description ?? ''}>
                                                        <span className='block truncate'>{item?.description}</span>
                                                    </CustomTooltip>
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    <RowOptions data={item} />
                                                </CustomStyledTableData>
                                            </CustomStyledTableRow>
                                        </Fragment>
                                    )
                                })}
                        </tbody>
                    </CustomStyledTable>
                </CustomStyledTableContainer>
                <PaginationSectionTableCustom
                    page={page}
                    pageSize={pageSize}
                    recordsFiltered={recordsFiltered}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                />
                {/* Paginasi */}
            </div>

            {addOpen && <AddTrip open={addOpen} toggle={toggleAdd} />}
            {filterOpen && <FilterCategoryBook form={form} open={filterOpen} toggle={toggleFilter} />}
        </>
    )
}

export default BookCategoryListPageViews
