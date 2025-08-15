import { useState, MouseEvent, Fragment } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import EditCategory from '../modal/edit'
import ModalDelete from '@/components/modal-delete'
import { getApi, } from '@/utils'
import axiosInterceptor from '@/config/axios.config'
import { queryClient } from '@/pages/_app'

interface Props {
    data: any
}

const RowOptions = ({ data }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
        setAnchorEl(null)
    }

    const toggleEdit = () => {
        setOpenEdit(prev => !prev)
        handleRowOptionsClose()
    }

    const toggleDelete = () => {
        setOpenDelete(prev => !prev)
        handleRowOptionsClose()
    }

    const handleDelete = async () => {
        try {
            await axiosInterceptor.delete(`${getApi('book')}/${data?.id}`)
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK_CATEGORY'] })
            toggleDelete()
        } catch (error) {
            console.error('Gagal menghapus perusahaan:', error)
        }
    }

    return (
        <Fragment>
            <IconButton size='small' onClick={handleRowOptionsClick}>
                <MoreVertOutlinedIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={rowOptionsOpen}
                onClose={handleRowOptionsClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ style: { minWidth: '8rem' } }}
                keepMounted
            >
                <MenuItem onClick={toggleEdit} sx={{ '& svg': { mr: 1 } }}>
                    <EditIcon sx={{ fontSize: '17px' }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={toggleDelete} sx={{ '& svg': { mr: 1 } }}>
                    <DeleteIcon sx={{ fontSize: '17px' }} />
                    Hapus
                </MenuItem>
            </Menu>

            {openEdit && <EditCategory toggle={toggleEdit} open={openEdit} data={data} />}
            {openDelete && (
                <ModalDelete toggle={toggleDelete} handleDelete={handleDelete} name={data?.name} open={openDelete} />
            )}
        </Fragment>
    )
}

export default RowOptions
