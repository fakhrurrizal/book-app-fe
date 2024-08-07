import EntriesText from '@/components/table/EntriesText'
import PaginationMui from '@/components/table/PaginationMui'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface Props {
    page: number
    pageSize: number
    recordsFiltered: number
    handleLimitChange: (e: SelectChangeEvent) => void
    handlePageChange: (event: any, newPage: number) => void
}

const PaginationSectionTableCustom = ({
    page,
    pageSize,
    recordsFiltered,
    handleLimitChange,
    handlePageChange,
}: Props) => {
    return (
        <>
            {recordsFiltered ? (
                <section className='w-full mt-[5px]  px-1 pb-3'>
                    <div className='flex justify-between gap-5 items-center py-[5px] px-5'>
                        <div className='flex flex-1 gap-5 items-center !text-slate-700'>
                            <EntriesText currentPage={page} pageSize={pageSize} totalEntries={recordsFiltered || 0} />
                        </div>
                        <div>
                            <div className='flex gap-5 items-center'>
                                <div className='flex gap-3 items-center'>
                                    <p className='text-nowrap'>Per Page: </p>
                                    <FormControl fullWidth sx={{ minWidth: '50px' }}>
                                        <Select
                                            value={pageSize.toString()}
                                            onChange={handleLimitChange}
                                            placeholder='Per Page...'
                                        >
                                            <MenuItem value='10'>10</MenuItem>
                                            <MenuItem value='25'>25</MenuItem>
                                            <MenuItem value='50'>50</MenuItem>
                                            <MenuItem value='100'>100</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <PaginationMui
                                    total={recordsFiltered || 0}
                                    page={page}
                                    pageSize={pageSize}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    )
}

export default PaginationSectionTableCustom
