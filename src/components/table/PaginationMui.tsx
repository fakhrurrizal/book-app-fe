import React from 'react'
import { Pagination } from '@mui/material'

interface PaginationMuiProps {
    total: number
    page: number
    pageSize: number
    onPageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void
}
const PaginationMui: React.FC<PaginationMuiProps> = ({ total, page, pageSize, onPageChange }) => {
    return (
        <Pagination
            count={Math.ceil(total / pageSize)}
            page={page}
            onChange={onPageChange}
            shape='rounded'
            color='primary'
        />
    )
}

export default PaginationMui
