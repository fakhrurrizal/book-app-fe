import LoginView from "@/components/auth/login";
import RegisterView from "@/components/auth/register";
import Icon from "@/components/icon";
import { getHomeNavbarLayout } from "@/components/navbar-layout";
import { useAuth } from "@/services/use-auth";
import { useBookId } from "@/utils";
import { NextPageWithLayout } from "@/utils/helpers/getLayout";
import { Card, Container, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LendingBookView from "./lending-book";
import { formatNumberWithSeparator } from "@/utils/helpers/format-number.helper";


const BookDetail: NextPageWithLayout = () => {

    const [openLogin, setOpenLogin] = useState<boolean>(false)

    const [openRegister, setOpenRegister] = useState<boolean>(false)

    const [openConfirm, setOpenConfirm] = useState<boolean>(false)

    const toggleLogin = () => setOpenLogin(!openLogin)

    const toggleRegister = () => setOpenRegister(!openRegister)

    const toggleConfirm = () => setOpenConfirm(!openConfirm)

    const route = useRouter()

    const user = useAuth((state) => state.value.user)

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const { ID } = route.query

    const { data, isLoading } = useBookId(ID)

    return (
        <Container className="flex flex-col pt-3 mb-6">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <IconButton onClick={() => route.back()}>
                        <Icon icon={'ion:arrow-back'} className="text-2xl text-primary" />
                    </IconButton>
                </Grid>
                <Grid item xs={12} md={3.6}>
                    {isLoading ?
                        <Skeleton variant="rounded" width={"100%"} height={500} />
                        :
                        <Card className="justify-end bg-primary p-1 bg-opacity-15 hover:border-2 border-2 text-right border-transparent flex rounded-md">
                            <Image
                                src={data?.image || '/default-book-image.jpg'}
                                alt={data?.title ?? "Buku"}
                                width={120}
                                height={200}
                                style={{ width: '100%', maxHeight: 500, minHeight: 500 }}
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </Card>
                    }
                </Grid>
                <Grid item container spacing={1} xs={12} md={7.3} className="md:ml-10">
                    <Grid item xs={12}>
                        {isLoading ?
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            :
                            <Typography className="md:text-[17px]">{data?.author}</Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {isLoading ?
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            :
                            <Typography fontSize={27}>{Number(data?.title?.length) > 75 ? `${data?.title.slice(0, 75)}...` : data?.title}</Typography>
                        }

                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontSize={16} fontWeight={700} >Deskripsi Buku</Typography>
                        {isLoading ?
                            <Skeleton variant="rectangular" width={"100%"} height={60} />
                            :
                            <>
                                <Typography fontSize={14} fontWeight={500} lineHeight={2} marginTop={1.4}>
                                    {isExpanded || Number(data?.description?.length) <= 200 ? data?.description : `${data?.description.slice(0, 200)}...`}
                                </Typography>
                                {Number(data?.description?.length) > 200 && (
                                    <Typography
                                        component="span"
                                        className="cursor-pointer text-primary"
                                        onClick={toggleReadMore}
                                    >
                                        {isExpanded ? ' Baca Lebih Sedikit' : ' Baca Selengkapnya'}
                                    </Typography>
                                )}
                            </>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontSize={16} fontWeight={700} >Detail Buku</Typography>
                        {isLoading ?
                            <Skeleton variant="rectangular" width={"100%"} height={60} />
                            :
                            <Grid container spacing={3} marginTop={0.1}>
                                <Grid item xs={12} md={6}>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={1}>
                                        Kategori
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={2}>
                                        {data?.category?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={1}>
                                        Jumlah Halaman
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={2}>
                                        {formatNumberWithSeparator(data?.number_of_pages)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={1}>
                                        Penerbit
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={2}>
                                        {data?.publisher}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={1}>
                                        Tahun Terbit
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={2}>
                                        {data?.publication_year}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={1}>
                                        Bahasa
                                    </Typography>
                                    <Typography textTransform="capitalize" fontSize={14} fontWeight={500} lineHeight={2}>
                                        {data?.language}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <button
                                        className="w-full text-sm font-semibold bg-primary text-white py-2 rounded hover:bg-[#5db93b] transition flex items-center justify-center gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!user) {
                                                toggleLogin()
                                            } else {
                                                toggleConfirm()
                                            }
                                        }}
                                    >
                                        <Icon icon="mdi:book-open-page-variant" width={20} height={20} />
                                        Pinjam Buku
                                    </button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
            {openLogin && <LoginView open={openLogin} toggle={toggleLogin} toggleRegister={toggleRegister} />}
            {openRegister && <RegisterView open={openRegister} toggle={toggleRegister} toggleLogin={toggleLogin} />}
            {openConfirm && <LendingBookView open={openConfirm} toggle={toggleConfirm} data={data} />}
        </Container>

    )

}

export default BookDetail
BookDetail.getLayout = getHomeNavbarLayout