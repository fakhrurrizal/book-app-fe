import { queryClient } from "@/pages/_app"
import { DataBook } from "@/types/book-response.types"
import { useDeleteBook } from "@/utils/mutations/use-book"
import { Box, Typography } from "@mui/material"
import { useState } from "react"
import EditBook from "./edit"
import ModalDelete from "@/components/modal-delete"

interface Props {
    data: DataBook
    toggleManage: () => void
}

const RowOptionsBook = ({ data, toggleManage }: Props) => {

    const { mutateAsync: deleted_data } = useDeleteBook(data?.id)

    const [editData, setEditData] = useState<boolean>(false)

    const toggleEdit = () => setEditData(!editData)


    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const toggleDelete = () => {
        setOpenDelete(!openDelete)
    }

    const onDelete = async () => {
        try {
            await deleted_data()
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK'] });
            toggleDelete()
        } catch (error) {
            console.log("err", error)
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box component="span" onClick={toggleEdit} sx={{ cursor: 'pointer' }} className="hover:text-primary">
                <Typography>Edit</Typography>
            </Box>
            {' | '}
            <Box component="span" onClick={toggleDelete} sx={{ cursor: 'pointer' }} className="hover:text-primary">
                <Typography>Hapus</Typography>
            </Box>
            {editData && <EditBook data={data} open={editData} toggle={toggleEdit} />}
            {openDelete && (
                <ModalDelete
                    toggle={toggleDelete}
                    handleDelete={onDelete}
                    name={data?.title}
                    open={openDelete}
                />
            )}
        </Box>
    )

}

export default RowOptionsBook