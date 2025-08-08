import IconifyIcon from "@/components/icon"
import TextField from "@/components/text-field.component"
import Transition from "@/components/transition"
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { useBookLending } from "../../../../view/book-lending/services/lending-book.mutation"
import { BookLendingFormData, bookLendingSchema } from "../../../../view/book-lending/services/lending-book.schemas"
import { BookId, DataBook } from "@/types/book-response.types"
import { useAuth } from "@/services/use-auth"
import { formatNumberWithSeparator } from "@/utils/helpers/format-number.helper"
import Image from "next/image"
import dayjs from "dayjs"

interface Props {
    open: boolean
    toggle: () => void
    data: DataBook | undefined
}


const LendingBookView = ({ open, toggle, data }: Props) => {

    const user = useAuth((state) => state.value.user)

    const { mutateAsync: bookLending, isLoading } = useBookLending()

    const {
        control,
        handleSubmit,
    } = useForm<BookLendingFormData>({
        resolver: zodResolver(bookLendingSchema),
        defaultValues: {
            notes: '',
            user_id: user?.id,
            book_id: 0,
        },
    })

    const handleLogin = () => {
        toggle()
    }

    const onSubmit = async (dataSubmit: BookLendingFormData) => {
        try {
            await bookLending({ ...dataSubmit, user_id: user?.id, book_id: data?.id, status: "requested" })
            handleLogin()
        } catch (error) {
            console.error('Submission error:', error)
        }
    }

    const batasPengambilan = dayjs().add(2, 'day').format('DD MMMM YYYY')

    return (
        <Dialog
            open={open}
            onClose={toggle}
            TransitionComponent={Transition}
            maxWidth="md"
            fullWidth
            PaperProps={{
                className: `border-2 border-primary rounded-xl p-0 relative overflow-visible`,
                sx: { maxHeight: '90vh' }
            }}
        >
            <DialogContent sx={{ padding: 0 }}>
                {/* Header */}
                <Box className="bg-primary text-white p-6 rounded-t-xl">
                    <Typography
                        variant="h5"
                        className="text-center font-bold text-white"
                        sx={{ fontSize: '28px', fontWeight: '700' }}
                    >
                        Peminjaman Buku
                    </Typography>
                </Box>

                <Box className="p-6">
                    {/* Book Information Section */}
                    <Box className="mb-6">
                        <Typography variant="h6" className="text-primary font-semibold mb-4">
                            Detail Buku
                        </Typography>
                        <Box className="flex gap-4">
                            {/* Book Cover */}
                            <Box className="flex-shrink-0">
                                <Box className="w-24 h-32 rounded-lg overflow-hidden relative">
                                    <Image
                                        src={data?.image || '/default-book-image.jpg'}
                                        alt="Cover Buku"
                                        fill
                                        className="object-cover"
                                    />
                                </Box>
                            </Box>
                            {/* Book Details */}
                            <Box className="flex-1">
                                <Typography variant="subtitle1" className="font-bold text-gray-800 mb-2">
                                    Kesehatan Mental, Perspektif Psikologis dan Agama
                                </Typography>
                                <Box className="grid grid-cols-2 gap-2 text-sm">
                                    <Box>
                                        <span className="text-gray-600">Penulis:</span>
                                        <span className="ml-2 font-medium">{data?.author}</span>
                                    </Box>
                                    <Box>
                                        <span className="text-gray-600">Penerbit:</span>
                                        <span className="ml-2 font-medium">{data?.publisher}</span>
                                    </Box>
                                    <Box>
                                        <span className="text-gray-600">Tahun:</span>
                                        <span className="ml-2 font-medium"> {data?.publication_year} </span>
                                    </Box>
                                    <Box>
                                        <span className="text-gray-600">Halaman:</span>
                                        <span className="ml-2 font-medium">{formatNumberWithSeparator(data?.number_of_pages)}</span>
                                    </Box>
                                    <Box>
                                        <span className="text-gray-600">Kategori:</span>
                                        <span className="ml-2 font-medium">{data?.category?.name}</span>
                                    </Box>
                                    <Box>
                                        <span className="text-gray-600">Bahasa:</span>
                                        <span className="ml-2 font-medium">{data?.language}</span>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Availability Status */}
                    <Box className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Box className="flex items-center justify-between">
                            <Box className="flex items-center gap-2">
                                <Box className="w-3 h-3 bg-green-500 rounded-full"></Box>
                                <Typography className="text-green-700 font-medium">
                                    Tersedia untuk dipinjam
                                </Typography>
                            </Box>
                            <Typography className="text-green-600 text-sm">
                                {data?.stock_available} dari {data?.stock} eksemplar tersedia
                            </Typography>
                        </Box>
                    </Box>

                    {/* Loan Form */}
                    <Box className="mb-6">
                        <Typography variant="h6" className="text-primary font-semibold mb-4">
                            Informasi Peminjam
                        </Typography>
                        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <Box>
                                <span className="text-gray-600">Nama Lengkap:</span>
                                <span className="ml-2 font-medium">{user?.fullname}</span>
                            </Box>
                            <Box>
                                <span className="text-gray-600">ID Anggota:</span>
                                <span className="ml-2 font-medium">{user?.id_anggota}</span>
                            </Box>
                            <Box>
                                <span className="text-gray-600">Email:</span>
                                <span className="ml-2 font-medium">{user?.email}</span>
                            </Box>
                            <Box>
                                <span className="text-gray-600">No. Telepon:</span>
                                <span className="ml-2 font-medium">{user?.phone}</span>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="mb-6">
                        <Grid item xs={12}>
                            <TextField control={control} name="notes" label="Keperluan meminjam" placeholder="Tulis keperluan peminjaman buku ini..." />
                        </Grid>
                    </Box>

                    <Box className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <Typography variant="subtitle2" className="text-blue-800 font-semibold mb-3">
                            Aturan Peminjaman:
                        </Typography>
                        <Box className="text-sm text-blue-700 space-y-1">
                            <Box>• Buku harap diambil maksimal {batasPengambilan} setelah melakukan pemesanan</Box>
                            <Box>• Maksimal peminjaman 14 hari</Box>
                            <Box>• Denda keterlambatan Rp 1.000/hari</Box>
                            <Box>• Buku harus dijaga dalam kondisi baik</Box>
                            <Box>• Tidak diperkenankan meminjamkan ke orang lain</Box>
                            <Box>• Dapat diperpanjang 1x maksimal 7 hari</Box>
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box className="flex gap-3">
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={toggle}
                            sx={{
                                borderRadius: '8px',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: '600',
                                textTransform: 'none',
                                borderColor: '#gray-300',
                                color: '#gray-600',
                            }}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleSubmit(onSubmit)}
                            variant="contained"
                            disabled={isLoading}
                            className="bg-primary"
                            sx={{
                                borderRadius: '8px',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: '600',
                                textTransform: 'none',
                                color: 'white',
                            }}
                        >
                            {isLoading ? (
                                <Box className="flex items-center gap-2">
                                    <IconifyIcon icon="mdi:loading" className="animate-spin" />
                                    Memproses...
                                </Box>
                            ) : (
                                <Box className="flex items-center gap-2">
                                    <IconifyIcon icon="mdi:book-check" />
                                    Konfirmasi Peminjaman
                                </Box>
                            )}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LendingBookView