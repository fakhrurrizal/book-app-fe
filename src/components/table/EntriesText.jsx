import React from 'react'

const EntriesText = ({ currentPage, pageSize, totalEntries }) => {
    const startEntry = (currentPage - 1) * pageSize + 1
    const endEntry = Math.min(currentPage * pageSize, totalEntries)
    const textStyle = {
        fontSize: '.81rem',
        color: '#a5a3ae',
    }

    return (
        <p style={textStyle}>
            Menampilkan {startEntry} sampai {endEntry} dari {totalEntries} data
        </p>
    )
}

export default EntriesText
