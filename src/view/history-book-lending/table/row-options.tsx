import EditIcon from '@mui/icons-material/Edit'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Fragment, MouseEvent, useState } from 'react'

import EditCategory from '../modal/edit'

interface Props {
    data: any
}

const RowOptions = ({ data }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openEdit, setOpenEdit] = useState(false)

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

    return (
        <Fragment>
            <IconButton size='small' disabled={data?.status === 'borrowed'} onClick={handleRowOptionsClick}>
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
            </Menu>

            {openEdit && <EditCategory toggle={toggleEdit} open={openEdit} data={data} />}
        </Fragment>
    )
}

export default RowOptions
