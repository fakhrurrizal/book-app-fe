import Icon from "@/components/icon";
import { useBookId } from "@/utils";
import { Card, Container, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";


export default function BookDetail() {

    const route = useRouter()

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
                <Grid item container spacing={1} xs={12} md={6} className="md:ml-10">
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
                                        Jumlah Halaman
                                    </Typography>
                                    <Typography fontSize={14} fontWeight={500} lineHeight={2}>
                                        {data?.number_of_pages}
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
                                        {data?.languange}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    )

}