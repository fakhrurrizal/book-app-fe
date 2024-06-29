import { BookCategory } from "@/types/category-response.types"
import { Box, Typography } from "@mui/material"
import { useState } from "react"
import EditCategory from "./edit"
import { useDeleteCategory } from "@/utils/mutations/use-category"
import { queryClient } from "@/pages/_app"

interface Props {
    data: BookCategory
}

const RowOptionsCategory = ({ data }: Props) => {

    const { mutateAsync : deleted_data } = useDeleteCategory(data?.id)

    const [editData, setEditData] = useState<boolean>(false)

    const toggleEdit = () => setEditData(!editData)

    const onDelete = async() =>{
        try{
            await deleted_data()
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK_CATEGORY'] });
        }catch(error){
            console.log("err", error)
        }
    }

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box component="span" onClick={toggleEdit} sx={{ cursor: 'pointer' }} className="hover:text-primary">
                <Typography>Edit</Typography>
            </Box>
            {' | '}
            <Box component="span" onClick={onDelete} sx={{ cursor: 'pointer' }} className="hover:text-primary">
                <Typography>Hapus</Typography>
            </Box>
            {editData && <EditCategory data={data} open={editData} toggle={toggleEdit} />}
        </Box>
    )

}

export default RowOptionsCategory