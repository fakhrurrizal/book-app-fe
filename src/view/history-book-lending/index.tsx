import HeaderSectionTableCustom from '@/components/custom-table/header'
import CustomStyledTable from '@/components/custom-table/table/custom-styled-table'
import CustomStyledTableContainer from '@/components/custom-table/table/custom-styled-table-container'
import { CustomStyledTableData, CustomStyledTableHead } from '@/components/custom-table/table/custom-styled-table-head'
import CustomStyledTableRow from '@/components/custom-table/table/custom-styled-table-row'
import TableHeaderCustomTable from '@/components/custom-table/table/header'
import ToolbarSectionTableCustom from '@/components/custom-table/toolbar'
import PaginationSectionTableCustom from '@/components/pagination'
import { CustomTooltip } from '@/components/tooltip'
import { Order } from '@/utils/api-response/pagination'
import { useBookLending } from '@/utils/queries/use-book-lending'
import { SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RowOptions from './table/row-options'
import { useAuth } from '@/services/use-auth'

const HeaderItems = [
    {
        label: 'Tanggal Permintaan',
        alignCenter: false,
    },
    {
        label: 'Nama Lengkap',
        alignCenter: false,
    },
    {
        label: 'Nama buku',
        alignCenter: false,
    },
    {
        label: 'Tanggal Dipinjam',
        alignCenter: true,
    },
    {
        label: 'Batas Pengembalian',
        alignCenter: true,
    },
    {
        label: 'Tanggal Dikembalikan',
        alignCenter: true,
    },
    {
        label: 'Status',
        alignCenter: true,
    },
    {
        label: 'Action',
        alignCenter: true,
    },
]
const HistoryBookLendingListPageViews = () => {
    const [pageSize, setPageSize] = useState<number>(10)

    const [page, setPage] = useState<number>(1)

    const [addOpen, setAddOpen] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState('')

    const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

    const user = useAuth((state) => state.value.user)

    const router = useRouter()

    const { sort } = router.query

    const { data: { data: ListData = [], recordsFiltered = 0 } = { data: [] }, isLoading } =
        useBookLending({
            pageSize: pageSize,
            searchValue: debouncedSearchValue,
            pageIndex: page,
            sort: sort ? (sort as Order) : undefined,
            userID: user?.id
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

    const formatLendingDate = (date: string | null | undefined, status: string) => {
        if (status === 'requested') {
            return "-";
        }

        if (!dayjs(date).isValid() || date === "0001-01-01T00:00:00Z") {
            return "-";
        }

        return dayjs(date).format("DD-MMM-YYYY");
    };

    const formatReturnDate = (date: string | null | undefined, status: string) => {
        if (status === 'returned') {
            return "-";
        }

        if (!dayjs(date).isValid() || date === "0001-01-01T00:00:00Z") {
            return "-";
        }

        return dayjs(date).format("DD-MMM-YYYY");
    };

    return (
        <>
            <div className='custom__styled__container'>
                <HeaderSectionTableCustom title={'Daftar Riwayat Peminjaman'} />
                <ToolbarSectionTableCustom
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    toggleAdd={toggleAdd}
                    isLoading={isLoading}
                    disabledAdd
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
                                                <CustomStyledTableHead>{dayjs(item?.created_at).format("DD-MMMM-YYYY")}</CustomStyledTableHead>
                                                <CustomStyledTableData >
                                                    {item?.user?.name}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='truncate max-w-[190px]'>
                                                    <CustomTooltip title={item?.description ?? ''}>
                                                        <span className='block truncate'>  {item?.book?.name}</span>
                                                    </CustomTooltip>
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {formatLendingDate(item?.borrow_date, item?.status)}
                                                </CustomStyledTableData>

                                                <CustomStyledTableData className='text-center'>
                                                    {formatLendingDate(item?.due_date, item?.status)}
                                                </CustomStyledTableData>
                                                <CustomStyledTableData className='text-center'>
                                                    {formatReturnDate(item?.return_date, item?.status)}
                                                </CustomStyledTableData>


                                                <CustomStyledTableData className='text-center'>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${item?.status === 'approved'
                                                            ? 'bg-green-100 text-green-800'
                                                            : item?.status === 'requested'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : item?.status === 'borrowed'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : item?.status === 'rejected' || item?.status === 'cancel'
                                                                        ? 'bg-red-100 text-red-800'
                                                                        : item?.status === 'returned'
                                                                            ? 'bg-green-50 text-green-700'
                                                                            : item?.status === 'overdue'
                                                                                ? 'bg-orange-300 text-orange-500'
                                                                                : 'bg-orange-500 text-orange-800'
                                                            }`}
                                                    >
                                                        {item?.status === 'requested'
                                                            ? 'Menunggu Persetujuan'
                                                            : item?.status === 'approved'
                                                                ? 'Disetujui'
                                                                : item?.status === 'borrowed'
                                                                    ? 'Dipinjam'
                                                                    : item?.status === 'rejected'
                                                                        ? 'Ditolak'
                                                                        : item?.status === 'returned'
                                                                            ? 'Dikembalikan'
                                                                            : item?.status === 'overdue'
                                                                                ? 'Terlambat'
                                                                                : 'Dibatalkan'}
                                                    </span>

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

                {/* Paginasi */}
                <PaginationSectionTableCustom
                    page={page}
                    pageSize={pageSize}
                    recordsFiltered={recordsFiltered}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default HistoryBookLendingListPageViews
