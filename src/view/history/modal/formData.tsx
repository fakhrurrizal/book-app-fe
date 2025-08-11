import { StaticAutoComplete } from "@/components/auto-complete.component"
import TextField from "@/components/text-field.component"
import { BookLendingFormData } from "@/view/book-lending/services/lending-book.schemas"
import { Grid, Typography } from "@mui/material"
import Link from "next/link"
import { UseFormReturn } from "react-hook-form"
import { useMemo } from "react"

interface Props {
    form: UseFormReturn<BookLendingFormData>
    currentStatus?: string
}

export const Status: { id: string; label: string }[] = [
    { id: 'requested', label: 'Menunggu Persetujuan' },
    { id: 'borrowed', label: 'Dipinjam' },
    { id: 'rejected', label: 'Ditolak' },
    { id: 'returned', label: 'Dikembalikan' },
    { id: 'overdue', label: 'Terlambat' },
];

const FormDataCategory = ({ form, currentStatus }: Props) => {

    const availableStatuses = useMemo(() => {
        if (!currentStatus) return Status;

        if (currentStatus === 'requested') {
            return Status;
        }

        // Jika status bukan 'requested', hapus 'requested' dari opsi
        return Status.filter(status => status.id !== 'requested');

        // Atau jika Anda ingin logic yang lebih spesifik untuk flow status:
        // switch (currentStatus) {
        //     case 'requested':
        //         return Status.filter(status => ['requested', 'borrowed', 'rejected'].includes(status.id));
        //     case 'borrowed':
        //         return Status.filter(status => ['borrowed', 'returned', 'overdue'].includes(status.id));
        //     case 'overdue':
        //         return Status.filter(status => ['overdue', 'returned'].includes(status.id));
        //     case 'returned':
        //         return Status.filter(status => status.id === 'returned'); // Tidak bisa diubah lagi
        //     case 'rejected':
        //         return Status.filter(status => status.id === 'rejected'); // Tidak bisa diubah lagi
        //     default:
        //         return Status;
        // }
    }, [currentStatus]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <StaticAutoComplete
                    control={form.control}
                    name='status'
                    label='Status Peminjaman'
                    options={availableStatuses}
                    disableClearable
                />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">
                    {currentStatus === 'requested' && "Status dapat diubah ke: Dipinjam, Ditolak"}
                    {currentStatus === 'borrowed' && "Tanggal peminjaman dan jatuh tempo akan diatur otomatis"}
                    {currentStatus === 'returned' && "Tanggal pengembalian akan diatur otomatis"}
                    {(currentStatus === 'overdue' || currentStatus === 'rejected') && "Status tidak dapat dikembalikan ke Menunggu Persetujuan"}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default FormDataCategory