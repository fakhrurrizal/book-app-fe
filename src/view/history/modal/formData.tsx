import { StaticAutoComplete } from "@/components/auto-complete.component"
import TextField from "@/components/text-field.component"
import { BookLendingFormData } from "@/pages/book/detail/lending-book/services/lending-book.schemas"
import { Grid, Typography } from "@mui/material"
import Link from "next/link"
import { UseFormReturn } from "react-hook-form"

interface Props {
    form: UseFormReturn<BookLendingFormData>
}

export const Status: { id: string; label: string }[] = [
    { id: 'requested', label: 'Menunggu Persetujuan' },
    { id: 'borrowed', label: 'Dipinjam' },
    { id: 'rejected', label: 'Ditolak' },
    { id: 'returned', label: 'Dikembalikan' },
    { id: 'overdue', label: 'Terlambat' },
];


const FormDataCategory = ({ form }: Props) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <StaticAutoComplete
                    control={form.control}
                    name='status'
                    label='Status Peminjaman'
                    options={Status}
                    disableClearable
                />
            </Grid>
        </Grid>
    )
}

export default FormDataCategory