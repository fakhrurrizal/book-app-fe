import Icon from "@/components/icon";
import DataNotFound from "@/components/not-found";
import { useBookCategoory } from "@/utils/queries/use-book-category";
import AddCategory from "@/view/category/add";
import RowOptionsCategory from "@/view/category/rowOptions";
import { Card, CircularProgress, Container, Grid, IconButton, Stack, alpha } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Category() {

    const router = useRouter()

    const [openAdd, setOpenAdd] = useState<boolean>(false)

    const [manage, setManage] = useState<boolean>(false)

    const toggle = () => setOpenAdd(!openAdd)

    const toggleManage = () => setManage(!manage)

    const { data: { data: CategoryList = [], } = { data: [] }, isLoading } = useBookCategoory({
        pageSize: 50,
        searchValue: "",
        pageIndex: 1,
    })

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <CircularProgress className="text-primary" />
                <p className="mt-3">Mohon Tunggu ...</p>
            </div>
        );
    }

    return (
        <Container className="flex flex-col pt-3  text-center">
            <h1 className="text-4xl mt-10 font-bold text-primary animate__animated animate__backInDown ">
                Pilih Kategori
            </h1>
            <p className="text-[20px] mt-3 animate__animated animate__fadeIn animate__delay-1s">
                Pilih kategori buku yang ingin kamu cari
            </p>
            <Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} className="justify-end animate__animated animate__fadeIn animate__delay-1s hidden md:flex">
                        <IconButton onClick={toggleManage}>
                            {manage ?
                                <Icon icon={'carbon:close-outline'} className="text-3xl text-secondary" style={{ fontWeight: 800 }} />
                                :
                                <Icon icon={'ep:setting'} className="text-3xl text-secondary" style={{ fontWeight: 800 }} />
                            }
                        </IconButton>
                    </Grid>


                    {manage &&
                        <Grid item xs={12} md={4} className="animate__animated animate__fadeIn">
                            <Card sx={({ palette }) => ({ background: alpha(palette.primary.main, 0.3) })} onClick={toggle} className=" cursor-pointer  h-[220px] border-2 border-primary relative px-5 py-8 m-2 text-center flex flex-col rounded-3xl items-center justify-center">
                                {/* <div className="absolute top-5 right-5 w-16 h-16 bg-primary opacity-70 rounded-full blur-2xl"></div> */}
                                <div className="flex items-center justify-center mb-2">
                                    <Icon icon={"tabler:category-plus"} className="text-7xl text-secondary" style={{ fontWeight: 800 }} />
                                </div>
                                <p className="font-semibold text-gray mt-4">{'Tambah Kategori'}</p>
                            </Card>
                        </Grid>
                    }
                    {CategoryList && CategoryList?.length > 0 ? CategoryList?.map((item, index) => (
                        <Grid item xs={12} md={4} key={index} className="animate__animated animate__fadeIn animate__delay-1s">
                            <Card sx={({ palette }) => ({ background: alpha(palette.primary.main, 0.255) })} onClick={() => { if (!manage) { router.push(`/category/${item?.id}`) } }} key={index} className="cursor-pointer  bg-opacity-15 hover:border-2 h-[220px] border-2 border-transparent hover:border-primary relative px-5 py-8 m-2 text-center flex flex-col rounded-4xl items-center justify-center">
                                <div className="flex items-center justify-center mb-2">
                                    <Icon icon={item?.icon} className="text-7xl text-secondary" style={{ fontWeight: 800 }} />
                                </div>
                                <p className="font-semibold text-gray mt-4">{item?.name}</p>
                                {manage && <RowOptionsCategory data={item} />}
                            </Card>
                        </Grid>
                    )) : <DataNotFound />}


                </Grid>
                {CategoryList && CategoryList?.length > 0 &&
                    <Grid container spacing={3} marginBottom={4} marginTop={1} className="animate__animated animate__fadeIn animate__delay-1s">
                        <Grid item xs={12}>
                            <Link href="/book/all" className="hover:text-primary delay-75"> Lihat Semua Buku <Icon icon='arrow-filled' className="text-1xl text-secondary" /> </Link>
                        </Grid>
                    </Grid>
                }
            </Stack>
            {openAdd &&
                <AddCategory open={openAdd} toggle={toggle} />
            }
        </Container>
    )
}