import Icon from "@/components/icon";
import DataNotFound from "@/components/not-found";
import { useBook } from "@/utils";
import { Card, CardActions, CardContent, CircularProgress, Container, Grid, IconButton, Stack, TextField } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FilterBook from "./filter";
import { useRouter } from "next/router";
import { useBookCategoryId } from "@/utils/queries/use-book-category";

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


export default function BookId() {

    const [searchValue, setSearchValue] = useState('')

    const route = useRouter()

    const { ID } = route.query

    const [openModal, setOpenModal] = useState<boolean>(false)

    const { data: dataCategory, refetch: refetchCategory, isLoading: isLoadingCategory } = useBookCategoryId(ID)

    const toggle = () => setOpenModal(!openModal)

    const form = useForm<SchemaForm>({
        defaultValues: {
            category_id: { id: 0, label: "Semua Kategori" },
            order: { id: "desc", label: "Terbesar Ke Terkecil" },
            sort: { id: "id", label: "Diurutkan Berdasarkan ID" },
        }
    });

    const { data: { data: BookList = [], } = { data: [] }, isLoading, refetch } = useBook({
        pageSize: 50,
        searchValue: "",
        pageIndex: 1,
        search: searchValue,
        categoryId: dataCategory?.id,
        order: form.watch("order.id") ?? "",
        sort: form.watch("sort.id") ?? ""
    })

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    useEffect(() => {
        refetchCategory()
        if (ID) {
            refetch()
        }
    }, [ID, refetch, refetchCategory])

    return (
        <Container className="flex flex-col pt-2 mb-6 text-center relative">
            <div className="relative">
                <div className=" flex items-center animate__animated animate__backInDown">
                    <IconButton onClick={() => route.push('/category')}>
                        <Icon icon={'ion:arrow-back'} className="text-2xl text-primary" />
                    </IconButton>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary animate__animated animate__backInDown">
                        Pilih Buku {dataCategory?.name}
                    </h1>
                    <p className="text-[20px] mt-3 animate__animated animate__fadeIn animate__delay-1s">
                        Pilih buku yang ingin kamu cari
                    </p>
                </div>
            </div>

            <Stack className="animate__animated animate__backInDown animate__delay-1s">
                <Grid container spacing={2} marginTop={4} >
                    <Grid item xs={11}>
                        <TextField
                            size='small'
                            name='search'
                            value={searchValue}
                            onChange={handleSearch}
                            label='Cari buku...'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={1} marginTop={-1}>
                        <IconButton onClick={toggle}><Icon icon={'ion:filter'} className="text-3xl text-secondary" /></IconButton>
                    </Grid>
                </Grid>
                <Grid container spacing={3} marginTop={4}>
                    {isLoading || isLoadingCategory ? (
                        <Grid item xs={12}>
                            <div className="flex flex-col items-center justify-center">
                                <CircularProgress className="text-primary" />
                                <p className="mt-3">Mohon Tunggu ...</p>
                            </div>
                        </Grid>
                    ) : BookList && BookList.length > 0 ? (
                        BookList.map((item, index) => (
                            <Grid item xs={12} md={3} key={index}>
                                <Card
                                    className="bg-primary bg-opacity-15 hover:border-2 border-2 border-transparent relative text-center flex flex-col rounded-md"
                                    sx={{ maxHeight: 680, minHeight: 680 }}
                                >
                                    <Image
                                        src={item.image || '/default-book-image.jpg'}
                                        alt={item.title}
                                        width={100}
                                        height={200}
                                        style={{ width: '100%', maxHeight: 400, minHeight: 400 }}
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                    <CardContent className="flex flex-col">
                                        <span className="font-semibold text-left text-gray-800 text-[18px] min-h-14">
                                            {item.title.length > 45 ? item.title.slice(0, 45) + '...' : item.title}
                                        </span>
                                        <span className="text-gray-600 text-left mt-2 text-[14px]">
                                            {item.description.length > 150 ? item.description.slice(0, 150) + '...' : item.description}
                                        </span>
                                    </CardContent>
                                    <CardActions className="mt-auto justify-start">
                                        <span className="text-gray-500 text-left text-[14px]">
                                            Tahun Terbit: {item.publication_year}
                                        </span>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <DataNotFound />
                    )}
                </Grid>
            </Stack>
            {openModal &&
                <FilterBook open={openModal} toggle={toggle} form={form} />
            }
        </Container>
    )
}