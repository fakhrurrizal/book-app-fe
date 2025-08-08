import Icon from "@/components/icon";
import { getHomeNavbarLayout } from "@/components/navbar-layout";
import DataNotFound from "@/components/not-found";
import { useBook } from "@/utils";
import { NextPageWithLayout } from "@/utils/helpers/getLayout";
import FilterBook from "@/view/book/modal/filter";
import RowOptionsBook from "@/view/book/modal/rowOptionBook";
import { Button, Card, CardActions, CardContent, CircularProgress, Container, Grid, IconButton, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
    category_id: z.object({
        id: z.number().optional(),
        label: z.string().optional(),
    }),
    sort: z.object({
        id: z.string().optional(),
        label: z.string().optional(),
    }),
    order: z.object({
        id: z.string().optional(),
        label: z.string().optional(),
    }),
}).transform((data) => {
    const newData: any = data;

    if (data.category_id) {
        newData.category_id = data.category_id.id;
    }

    if (data.order) {
        newData.order = data.order.id;
    }

    if (data.sort) {
        newData.sort = data.sort.id;
    }

    return data;
});

export type SchemaForm = z.infer<typeof schema>;


const BookAll: NextPageWithLayout = () => {

    const [searchValue, setSearchValue] = useState('')

    const route = useRouter()

    const [openModal, setOpenModal] = useState<boolean>(false)

    const [openAdd, setOpenAdd] = useState<boolean>(false)

    const [manage, setManage] = useState<boolean>(false)


    const toggleManage = () => setManage(!manage)

    const toggle = () => setOpenModal(!openModal)

    const toggleAdd = () => setOpenAdd(!openAdd)


    const form = useForm<SchemaForm>({
        defaultValues: {
            category_id: { id: 0, label: "Semua Kategori" },
            order: { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
            sort: { id: "id", label: "" },
        }
    });

    const { data: { data: BookList = [], } = { data: [] }, isLoading } = useBook({
        search: searchValue,
        categoryId: form.watch("category_id.id") ?? "",
        order: form.watch("order.id") ?? "",
        sort: form.watch("sort.id") ?? ""
    })

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }


    return (
        <Container className="flex flex-col pt-3 mb-6  text-center">
            <div className="relative">
                <div className=" flex items-center animate__animated animate__backInDown">
                    <IconButton onClick={() => route.push('/category')}>
                        <Icon icon={'ion:arrow-back'} className="text-2xl text-primary" />
                    </IconButton>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary animate__animated animate__backInDown">
                        Pilih Buku
                    </h1>
                    <p className="text-[16px] mt-3 animate__animated animate__fadeIn animate__delay-1s">
                        Pilih buku yang ingin kamu cari
                    </p>
                </div>
            </div>
            <Stack className="animate__animated animate__fadeIn animate__delay-2s">
                <Grid container spacing={2} marginTop={4} >
                    <Grid item xs={10} md={10.5}>
                        <TextField
                            size='small'
                            name='search'
                            value={searchValue}
                            onChange={handleSearch}
                            label='Cari buku...'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={1} md={0.9} marginTop={-1}>
                        <IconButton onClick={toggle}><Icon icon={'ion:filter'} className="text-3xl text-secondary" /></IconButton>
                    </Grid>

                </Grid>
                <Grid container spacing={3} marginTop={2}>


                    <Grid item xs={12} className="flex justify-end">
                        {manage && <Button onClick={toggleAdd} variant="outlined">Tambah Buku</Button>}
                    </Grid>
                    {isLoading ? (
                        <Grid item xs={12}>
                            <div className="flex flex-col items-center justify-center">
                                <CircularProgress className="text-primary" />
                                <p className="mt-3">Mohon Tunggu ...</p>
                            </div>
                        </Grid>
                    ) : BookList && BookList.length > 0 ? (
                        BookList?.map((item, index) => (
                            <Grid item xs={12} md={3} key={index}>
                                <Card
                                    className=" bg-primary bg-opacity-15 hover:border-2 border-2 border-transparent relative text-center flex flex-col rounded-md"
                                    sx={{ maxHeight: 620, minHeight: 620 }}
                                >
                                    <Image
                                        src={item.image || '/default-book-image.jpg'}
                                        alt={item.title}
                                        width={100}
                                        height={200}
                                        style={{ width: '100%', maxHeight: 380, minHeight: 380 }}
                                        objectFit="cover"
                                        className="rounded-md"
                                    />

                                    <CardContent className="flex flex-col flex-1 px-4">
                                        <span className="font-semibold text-left text-gray-800 text-[18px] min-h-14">
                                            {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                                        </span>

                                        <span className="text-gray-600 text-left mt-2 text-[14px] line-clamp-2">
                                            {item.description.length > 120 ? item.description.slice(0, 120) + '...' : item.description}
                                        </span>

                                        <span className="text-gray-500 text-left text-[14px] mt-2">
                                            Tahun Terbit: {item.publication_year}
                                        </span>
                                    </CardContent>

                                    <CardActions className="px-4 pb-4">
                                        <button
                                            className="w-full text-sm font-semibold bg-primary text-white py-2 rounded hover:bg-[#5db93b] transition"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                route.push(`/book/detail/${item?.id}`)
                                            }}
                                        >
                                            Lihat Detail
                                        </button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <DataNotFound />
                    )}
                    {/* <Grid item xs={12} marginTop={4}>
                        <PaginationSectionTableCustom
                            page={page}
                            pageSize={pageSize}
                            recordsFiltered={recordsFiltered}
                            handleLimitChange={handleLimitChange}
                            handlePageChange={handlePageChange}
                        />
                    </Grid> */}
                </Grid>
            </Stack>
            {openModal &&
                <FilterBook open={openModal} toggle={toggle} form={form} />
            }
        </Container>
    )
}

BookAll.getLayout = getHomeNavbarLayout
export default BookAll