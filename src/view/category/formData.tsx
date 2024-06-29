import TextField from "@/components/text-field.component"
import { Grid } from "@mui/material"
import { UseFormReturn } from "react-hook-form"
import { BookCategorySchemaForm } from "./schema"
import SwitchComponent from "@/components/switch.component"
import { Typography } from "@mui/material"
import Link from "next/link"

interface Props {
    form: UseFormReturn<BookCategorySchemaForm>
}

const FormDataCategory = ({ form }: Props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField control={form.control} name="name" label="Nama Kategori" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="icon" label="Icon" />
                <Typography fontSize={11}>
                    Cari icon{' '}
                    <Link target='_blank' href='https://icon-sets.iconify.design/'>
                        {' '}
                        <a>disini</a>
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="description" label="Deskripsi" />
            </Grid>
            <Grid item xs={12}>
                <SwitchComponent control={form.control} label="Status" name='status' />
            </Grid>
        </Grid>
    )
}

export default FormDataCategory