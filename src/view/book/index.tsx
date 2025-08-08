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
import RowOptions from './table/row-options'
import { SchemaForm } from '@/pages/category/[ID]'
import { useBook } from '@/utils'
import Image from 'next/image'
import ShowImage from './table/show-image'
import { formatNumberWithSeparator } from '@/utils/helpers/format-number.helper'

const HeaderItems = [
    {
        label: 'Nama Buku',
        alignCenter: false,
    },
    {
        label: 'Gambar',
        alignCenter: true,
    },
    {
        label: 'Kategori',
        alignCenter: false,
    },

    {
        label: 'Sinopsis',
        alignCenter: false,
    },
    {
        label: 'Jumlah Halaman',
        alignCenter: true,
    },

    {
        label: 'Action',
        alignCenter: true,
    },
]

const BookListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const [openImage, setOpenImage] = useState(false)

    const router = useRouter()

    const form = useForm<SchemaForm>({
        defaultValues: {
            category_id: { id: 0, label: "Semua Kategori" },
            order: { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
            sort: { id: "id", label: "" },
        },
    })

    const { data: { data: ListData = [], recordsFiltered = 0 } = { data: [] }, isLoading } =
        useBook({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            categoryId: form.watch("category_id.id") ?? "",
            sort: form.watch("sort.id") ?? "",
            order: form.watch("order.id") ?? "",
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

    const toggleImage = () => setOpenImage(!openImage)

    return (
        <>
            <div className='custom__styled__container'>
                <HeaderSectionTableCustom title={'Daftar Buku'} />
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
                                                <CustomStyledTableHead>{item?.title}</CustomStyledTableHead>
                                                <CustomStyledTableData className="text-center">
                                                    <div className="flex justify-center items-center h-full">
                                                        <Image onClick={toggleImage} className='cursor-pointer' src={item?.image} alt={item?.title} height={40} width={40} />
                                                    </div>
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className="text-center">
                                                    {item?.category?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className="max-w-[190px]">
                                                    <CustomTooltip title={item?.description ?? ''}>
                                                        <span className="block overflow-hidden text-ellipsis line-clamp-2">
                                                            {item?.description}
                                                        </span>
                                                    </CustomTooltip>
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className="text-center">
                                                    {formatNumberWithSeparator(item?.number_of_pages)}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    <RowOptions data={item} />
                                                </CustomStyledTableData>
                                                {openImage && (
                                                    <ShowImage
                                                        open={openImage}
                                                        toggle={toggleImage}
                                                        image={item.image || ''}
                                                    />
                                                )}
                                            </CustomStyledTableRow>
                                        </Fragment>
                                    )
                                })}
                        </tbody>
                    </CustomStyledTable>
                </CustomStyledTableContainer>

                {/* Paginasi */}
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

export default BookListPageViews
