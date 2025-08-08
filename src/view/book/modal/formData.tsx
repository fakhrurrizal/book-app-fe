import TextField from "@/components/text-field.component"
import { Box, CircularProgress, FormHelperText, Grid } from "@mui/material"
import { UseFormReturn } from "react-hook-form"
import SwitchComponent from "@/components/switch.component"
import { Typography } from "@mui/material"
import Link from "next/link"
import Icon from "@/components/icon";
import { BookForm } from "./schema"
import { toast } from "react-toastify"
import axiosInterceptor from "@/config/axios.config"
import { ResponseUploadFile } from "@/types/responseUploadFile"
import { getApi } from "@/utils"
import { useEffect, useState } from "react"
import { useDropzone } from 'react-dropzone'
import DropzoneWrapper from "@/components/styles/react-dropzone"
import Image from "next/image"
import { ServerSideAutoComplete } from "@/components/auto-complete.component"
import { BookCategoryResponse } from "@/types/category-response.types"

interface Props {
    form: UseFormReturn<BookForm>
    is_category?: boolean
    isEdit?: boolean
}


const FormDataBook = ({ form, is_category = false, isEdit = false }: Props) => {

    const [image, setImage] = useState(form.watch("image"))

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 5000000,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: async (acceptedFiles: any) => {
            setLoadingImage(true);
            try {
                const file = acceptedFiles[0];

                form.setValue('image', file);
                setImage(URL.createObjectURL(file))
                form.clearErrors('image');
            } catch (error) {
                console.error('Error handling dropped file:', error);
                toast.error('Failed to handle dropped file.');
            } finally {
                setLoadingImage(false);
            }
        },
        onDropRejected: () => {
            toast.error('Ukuran maksimal 5 MB. Jenis file yang diperbolehkan: *.jpeg, *.jpg, *.png, *.gif');
        }
    });
    const [loadingImage, setLoadingImage] = useState<boolean>(false)

    // const uploadImage = async (file: File) => {
    //     console.log("file", file)
    //     try {
    //         const formData = new FormData()

    //         formData.append('file', file)
    //         formData.append('name', '')

    //         form.setValue('image', file)
    //         form.clearErrors('image')
    //     } catch (error) {
    //         console.log("error")
    //         setLoadingImage(false)
    //     }
    // }

    const img = () => {

        return !loadingImage ? (
            <Image key={form.watch("title")} alt={form.watch("title")} width={80} height={120} src={image} />
        ) : (
            <Box>
                <CircularProgress size='1.3rem' />
                <Typography fontSize={11}>Mohon Tunggu ...</Typography>
            </Box>
        )
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <DropzoneWrapper>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 100,
                                ...({ pointerEvents: 'none' })
                            }}
                        >
                            <input {...getInputProps()} />

                            {form.watch("image") || form.watch("image")?.name?.length ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {img()}
                                    </Box>
                                    <Typography fontSize={11} marginTop={1}>
                                        {!loadingImage && 'Klik untuk ganti'}
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mb: 1,
                                            width: 25,
                                            height: 25,
                                            paddingY: 2,
                                            display: 'flex',
                                            borderRadius: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon icon='tabler:upload' fontSize='1rem' />
                                    </Box>

                                    <Typography sx={{ fontSize: '13px' }}>Seret file di sini atau klik untuk mengunggah.</Typography>
                                    <Typography sx={{ color: 'text.secondary', fontSize: '11px' }}>
                                        Jenis file yang diperbolehkan: *.jpeg, *.jpg, *.png,
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </div>
                </DropzoneWrapper>

                {form.formState.errors?.image && <FormHelperText sx={{ color: 'error.main' }}>{form.formState.errors.image.message?.toString()}</FormHelperText>}
            </Grid>

            <Grid item xs={12}>
                <TextField control={form.control} name="book_code" label="ISBN" placeholder="Masukan ISBN" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="title" label="Judul Buku" placeholder="Masukan Judul Buku" />
            </Grid>
            <Grid item xs={12}>
                <ServerSideAutoComplete<BookForm, { id: number; label: string }, BookCategoryResponse>
                    queryEndpoint={{ status: true, }}
                    control={form.control}
                    endpoint="book_category"
                    name="category_id"
                    label="Pilih Kategori"
                    formatOptions={(response) => {
                        const options = response.data;
                        if (!options) return [];
                        return options.map((option) => ({
                            id: option.id,
                            label: option.name,
                        }));
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} multiline minRows={2} name="description" label="Sinopsis" placeholder="Masukan Sinopsis Buku" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="language" label="Bahasa" placeholder="Masukan Bahasa" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="author" label="Penulis" placeholder="Masukan Nama Penulis" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="number_of_pages" label="Jumlah Halaman" inputFormat="NUMBER" placeholder="Masukan Jumlah Halaman" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="stock" label="Stok" inputFormat="NUMBER" placeholder="Masukan Stok Buku" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="publisher" label="Penerbit" placeholder="Masukan Penerbit" />
            </Grid>
            <Grid item xs={12}>
                <TextField control={form.control} name="publication_year" InputProps={{ inputProps: { maxLength: 4 }, }} label="Tahun Terbit" inputFormat="YEAR" placeholder="Masukan Tahun Terbit" />
            </Grid>

        </Grid>
    )
}

export default FormDataBook