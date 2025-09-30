import { Box, Button, Card, Dialog, DialogContent, DialogTitle, Divider, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TickMark from "../../../../public/subway_tick.svg";
import CrossMark from "../../../../public/cross_mark.svg";
import dynamic from "next/dynamic";
import LoadingAnimation from "../../../../public/loading/loading.animation.json";
import router from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import CancelIcon from '@mui/icons-material/Cancel';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function DestinationDetails({ InputData }: any) {

    const [isLoading, setIsLoading] = useState(false)
    const [destinationDescriptionEnable, setDestinationDescriptionEnable] = useState(false)
    const [descriptionData, setDestinationData] = useState<any>()

    const loadingAnimation = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        }
    }

    useEffect(() => {
        let destinationID = localStorage?.getItem("DestinationID") || router?.query?.destinationid

        if (destinationID) {
            setIsLoading(true)

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        else {
            router?.push("/home")
        }

    }, [])

    return (
        <>

            <Head>
                <title>Tourism - Details</title>
            </Head>

            {isLoading ? <><Box mt={{ xl: 20, lg: 5 }}> <Lottie options={loadingAnimation} height={300} width={300} /></Box></> : <>
                <Grid container p={{ xl: 2.5, lg: 1.5 }} spacing={{ xl: 3, lg: 2 }} justifyContent={"center"} >

                    <Grid size={12} mt={1} >
                        <Stack display={"flex"} direction={"row"} spacing={6} justifyContent={"center"} >
                            <Card sx={{ height: { lg: "200px", xl: "320px" }, width: "550px", border: "1px solid", borderRadius: "10px" }}>
                                <Grid container p={{ lg: 1, xl: 3 }} height={"100%"} justifyContent={"space-between"} >
                                    <Typography sx={{ display: "flex", alignItems: "center", fontSize: { xl: "30px", lg: "20px" }, fontWeight: 'bold' }} >{InputData?.DestinationData?.DestinationName} </Typography>

                                    <Grid size={12} display={"flex"} alignItems={"center"}  >

                                        {InputData?.DestinationData?.Description?.length > 100 ? <>
                                            <Stack direction={"row"} >
                                                <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" }, }} >Description</Typography>
                                                <Typography pl={1} >:</Typography>
                                                <Stack direction={"row"} alignItems={"end"} spacing={0}>
                                                    <Typography pl={1} sx={{
                                                        width: { lg: "85%", xl: "100%" },
                                                        fontSize: { xl: "16px", lg: "14px" }, overflow: "hidden", textWrap: "wrap", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", position: 'relative'
                                                    }} >{InputData?.DestinationData?.Description}</Typography>

                                                    <Button size="small" sx={{ textTransform: "none", position: "absolute", left: { xl: "30.2%", lg: "26.5%" }, top: { lg: "32.5%", xl: "31.5%" }, '&:hover': { textDecoration: "underline" } }} onClick={() => { setDestinationData(InputData?.DestinationData?.Description); setDestinationDescriptionEnable(true) }} >more</Button>
                                                </Stack>
                                            </Stack></> : <>
                                            <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" }, }} >Description</Typography>
                                            <Typography pl={1} >:</Typography>
                                            <Typography pl={1} sx={{
                                                fontSize: { xl: "16px", lg: "14px" }, overflow: "hidden", textWrap: "wrap", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                                            }} >{InputData?.DestinationData?.Description}</Typography>
                                        </>}

                                    </Grid>
                                    <Grid size={12} display={"flex"} alignItems={"center"}  >
                                        <Stack direction={"row"}>
                                            <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >Category</Typography>
                                            <Typography pl={3} >:</Typography>
                                            <Typography pl={1} sx={{ fontSize: { xl: "16px", lg: "14px" } }} >{InputData?.DestinationData?.Category}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={12} display={"flex"} alignItems={"center"}  >
                                        <Stack direction={"row"}>
                                            <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >EntryFee</Typography>
                                            <Typography pl={3} >:</Typography>
                                            <Typography pl={1} sx={{ fontSize: { xl: "16px", lg: "14px" } }} >{InputData?.DestinationData?.EntryFee}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={12} display={"flex"} alignItems={"center"} >
                                        <Stack direction={"row"}>
                                            <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >Best time to visit</Typography>
                                            <Typography pl={1} >:</Typography>
                                            <Typography pl={1} sx={{ fontSize: { xl: "16px", lg: "14px" } }}>{InputData?.DestinationData?.TimeToVisit}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Stack>
                                </Stack>
                            </Card>

                            <Card sx={{ height: { lg: "200px", xl: "320px" }, width: "550px", border: "1px solid", borderRadius: "10px" }} >

                                <Grid container height={"100%"} >
                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"center"} alignItems={"center"}>

                                        <Typography sx={{ fontWeight: "bold", fontSize: { xl: "20px", lg: "14px" } }}>Adventures</Typography>

                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.Boating ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Boating</Typography>
                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 5, lg: 0 }} alignItems={"center"} >
                                        {
                                            InputData?.AdventureData?.RidingAndRacing ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Riding & Racing</Typography>
                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.Swimming ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Swimming</Typography>
                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 5, lg: 0 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.WildlifeSafari ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Wildlife Safari</Typography>
                                    </Grid>
                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.Surfing ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Surfing</Typography>
                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 5, lg: 0 }} alignItems={"center"} >
                                        {
                                            InputData?.AdventureData?.Photography ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Photography</Typography>
                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.Trekking ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Trekking</Typography>
                                    </Grid>

                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 5, lg: 0 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.CulturalTours ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Cultural Tours</Typography>
                                    </Grid>
                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.Camping ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} > Camping</Typography>
                                    </Grid>
                                    <Grid size={6} display={"flex"} direction={"row"} pl={{ xl: 5, lg: 0 }} alignItems={"center"}>
                                        {
                                            InputData?.AdventureData?.AerialAndUnderwaterAdventures ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                :
                                                <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                        }
                                        <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} >Paragliding</Typography>
                                    </Grid>
                                </Grid>

                            </Card>
                            <Card sx={{ height: { lg: "200px", xl: "320px" }, width: "550px", border: "1px solid", borderRadius: "10px" }}>
                                <Grid size={12} display={"flex"} direction={"row"} justifyContent={"center"} alignItems={"center"} mt={{ xl: 2, lg: 1 }}>
                                    <Typography sx={{ fontWeight: "bold", fontSize: { xl: "20px", lg: "14px" } }}>Location</Typography>
                                </Grid>
                                <Grid container p={{ lg: 2, xl: 3 }} spacing={{ xl: 3.5, lg: 0.5 }}>
                                    <Grid size={12} >
                                        <Stack display={"flex"} direction={"row"} justifyContent={"space-around"} >
                                            <Typography sx={{ width: { lg: "170px", xl: "170px" }, pl: 10, fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }}   >Country</Typography>
                                            <Typography fontWeight={"bold"}>:</Typography>
                                            <Typography sx={{ width: { lg: "200px", xl: "200px" }, pl: 8, fontSize: { xl: "16px", lg: "14px" } }}>{InputData?.LocationData?.Country || "-"}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={12}>
                                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                            <Typography sx={{ width: { lg: "170px", xl: "170px" }, pl: 10, fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >State</Typography>
                                            <Typography fontWeight={"bold"}>:</Typography>
                                            <Typography sx={{ width: { lg: "200px", xl: "200px" }, pl: 8, fontSize: { xl: "16px", lg: "14px" } }}>{InputData?.LocationData?.State || "-"}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={12}>
                                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                            <Typography sx={{ width: { lg: "170px", xl: "170px" }, pl: 10, fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >City</Typography>
                                            <Typography fontWeight={"bold"}>:</Typography>
                                            <Typography sx={{ width: { lg: "200px", xl: "200px" }, pl: 8, fontSize: { xl: "16px", lg: "14px" } }}>{InputData?.LocationData?.City || "-"}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={12}>
                                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                            <Typography sx={{ width: { lg: "170px", xl: "170px" }, pl: 10, fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >Latitude</Typography>
                                            <Typography fontWeight={"bold"}>:</Typography>
                                            <Typography sx={{ width: { lg: "200px", xl: "200px" }, pl: 8, fontSize: { xl: "16px", lg: "14px" } }}>{InputData?.LocationData?.Latitude || "-"}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={12}>
                                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                            <Typography sx={{ width: { lg: "170px", xl: "170px" }, pl: 10, fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" } }} >Longitude</Typography>
                                            <Typography >:</Typography>
                                            <Typography sx={{ width: { lg: "200px", xl: "200px" }, pl: 8, fontSize: { xl: "16px", lg: "14px" } }}>{InputData?.LocationData?.Latitude || "-"}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Stack>
                    </Grid>

                    <Grid size={{ lg: 12, xl: 11.5 }} >
                        <Card sx={{ height: { lg: "125px", xl: "200px" }, border: "1px solid", borderRadius: "10px" }}>
                            <Grid container height={"100%"} >
                                <Grid size={5.9} p={{ xl: 4, lg: 0.5 }}>

                                    <Typography sx={{ fontWeight: "bold", fontSize: { xl: "20px", lg: "14px" } }} >Expenses (Per Head)</Typography>

                                    <Box sx={{ overflow: "hidden", borderRadius: "10px", border: "0.5px solid gray" }}>
                                        <Table sx={{ p: 0, m: 0, borderCollapse: "collapse" }} >
                                            <TableHead sx={{ bgcolor: "gray" }}>
                                                <TableRow >
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>Budget Type</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>Estimated Cost (Per Day)</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>

                                                <TableRow >
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>Stay</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}> ₹ {InputData?.ExpenseData?.StayMinimum} - ₹ {InputData?.ExpenseData?.StayMaximum}</Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>Food</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>₹ {InputData?.ExpenseData?.FoodMinimum} - ₹ {InputData?.ExpenseData?.FoodMaximum}</Typography>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow >
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>Travel</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ p: 0, border: "0.5px solid gray" }}>
                                                        <Typography sx={{ pl: 1, fontSize: { xl: "16px", lg: "14px" } }}>₹ {InputData?.ExpenseData?.TravelMinimum} - ₹ {InputData?.ExpenseData?.TravelMaximum}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Grid>
                                <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: "black" }} />
                                <Grid size={5.9} pl={5} justifyContent={"center"}   >
                                    <Typography sx={{ fontWeight: "bold", fontSize: { xl: "20px", lg: "14px" }, pt: { xl: 3, lg: 1 }, textAlign: "center" }}>Transport</Typography>

                                    <Grid container pt={{ xl: 6, lg: 3 }}>

                                        <Grid size={3} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                            {
                                                InputData?.TransportData?.Bus ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                    :
                                                    <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                            }
                                            <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} >Bus</Typography>
                                        </Grid>

                                        <Grid size={3} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                            {
                                                InputData?.TransportData?.Train ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                    :
                                                    <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                            }
                                            <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} >Train</Typography>
                                        </Grid>


                                        <Grid size={3} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                            {
                                                InputData?.TransportData?.Flight ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                    :
                                                    <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                            }
                                            <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} >Flight</Typography>
                                        </Grid>


                                        <Grid size={3} display={"flex"} direction={"row"} pl={{ xl: 8, lg: 2 }} alignItems={"center"}>
                                            {
                                                InputData?.TransportData?.Ship ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                                    :
                                                    <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />
                                            }
                                            <Typography sx={{ display: "inline-block", pl: 2, fontSize: { xl: "16px", lg: "14px" } }} >Ship</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid >

                {destinationDescriptionEnable &&
                    <Dialog open={true}>
                        <DialogTitle >
                            <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                <Typography fontSize={"20px"} fontWeight={"bold"}>Description</Typography>
                                <Button sx={{ m: 0, p: 0 }} onClick={() => { setDestinationDescriptionEnable(false) }}><CancelIcon sx={{ fontSize: "30px" }} /></Button>
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                {descriptionData}
                            </Typography>
                        </DialogContent>
                    </Dialog>}
            </>}
        </>
    )
}