import { Box, Button, Card, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Head from "next/head";
import TIcon from "../../../public/TIconBlack.svg";
import route from "next/router";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LabelIcon from '@mui/icons-material/Label';
import { useEffect, useState } from "react";
import DestinationApi from "@/api/destination.api";
import dynamic from "next/dynamic";
import LoadingAnimation from "../../../public/loading/loading.animation.json"
import NodataImage from "../../../public/nodatafound/nodata.svg"
import ClearIcon from "@mui/icons-material/Clear";

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const destinationApi = new DestinationApi()

export default function DestinationExplore() {

    const [destinationData, setDestinationData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchData, setSearchData] = useState("")
    console.log('seatrchhhhhhhhhhhhhhh', 'color: #ff0000', searchData);

    const handleReadDestination = async (searchData: any) => {
        setIsLoading(true)
        let request = {
            "filter": {
                "IsDeleted": false,
                "Country": searchData
            },
            "fields": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }

        const readDestination: any = await destinationApi?.readDestination(request);

        if (readDestination?.status === 200) {
            setDestinationData(readDestination?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
    }

    useEffect(() => {
        handleReadDestination("")
    }, [])

    const loadingAnimation = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        }
    }

    return (
        <>
            <Head>
                <title>Tourism - Explore</title>
            </Head>
            <Box height={"100vh"} width={"100vw"} bgcolor={"whitesmoke"} >
                <Grid container height={"10vh"} p={{ xl: 1, lg: 0.5 }}>
                    <Grid size={4}>
                        <Box component={"img"} src={TIcon?.src} mt={1} sx={{ height: { xl: "70px", lg: "45px" } }} />
                        <Typography sx={{ color: "black", fontSize: "25px", fontWeight: "bold", position: "absolute", top: { xl: "6.5%", lg: "5.5%" }, left: { xl: "2.8%", lg: "2.5%" } }}>ourism</Typography>
                    </Grid>

                    <Grid size={5} pt={{ xl: 4, lg: 2.5 }}>
                        <TextField type="search" size="small" sx={{ width: "70%", bgcolor: "rgba(217, 217, 217, 0.5)", borderRadius: "40px" }}
                            InputProps={{
                                sx: { borderRadius: "40px", color: "black", pl: 2, pt: 0.5 },
                                startAdornment: <Button onClick={() => { searchData !== "" && handleReadDestination(searchData) }}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z" /><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485" /></g></svg></Button>,
                                endAdornment: searchData && (
                                    <InputAdornment position="end">
                                        <Button
                                            onClick={() => { setSearchData(""), handleReadDestination("") }} >
                                            <ClearIcon />
                                        </Button>
                                    </InputAdornment>
                                )
                            }}
                            value={searchData}
                            placeholder="Search Destination Country..."
                            onChange={(e: any) => { setSearchData(e.target.value), (e.target.value) === "" && handleReadDestination("") }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    searchData !== '' && handleReadDestination(searchData);
                                }
                            }}>
                        </TextField>
                    </Grid>

                    <Grid size={3} sx={{ alignContent: 'center', justifyContent: 'center' }} pt={{ xl: 3, lg: 1.5 }}>
                        <Stack display={"flex"} direction={"row"} justifyContent={"space-around"}>
                            <Button sx={{ color: "black", fontWeight: "bold" }} onClick={() => { route.push("/home") }} >Home</Button>
                            <Button sx={{ color: "black", fontWeight: "bold" }} onClick={() => { route.push("/contact") }}>Contact Us</Button>
                            <Button sx={{ color: "black", fontWeight: "bold" }} onClick={() => { route.push("/about") }}>About Us</Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Box sx={{ overflowY: "scroll" }} mt={2} maxHeight={"85%"} height={"85%"} >

                    {isLoading ? <><Box mt={20}> <Lottie options={loadingAnimation} height={300} width={300} /></Box></> : <>
                        <Grid container mt={3} width={"100%"} justifyContent={"center"} >
                            {destinationData?.length > 0 ? destinationData?.map((data: any, index: any) => (
                                <Grid key={index} size={{ xs: 2.7, xl: 2.1 }} display={"flex"} justifyContent={"space-around"}  >
                                    <Card sx={{ height: "350px", width: "250px", mt: 5, borderRadius: "20px" }}>
                                        <img src={data?.Image[0]?.Image} alt="Image" height={"280px"} width={"250px"}></img>
                                        <Grid container pl={1} pt={0.5}>
                                            <Grid size={8.7} display={"flex"} justifyContent={"left"}>
                                                <Typography sx={{}}><LabelIcon sx={{ color: "#D32F2F" }} /></Typography>
                                                <Typography sx={{ pt: 0.3, pl: 1, overflow: "hidden", whiteSpace: 'nowrap', textOverflow: "ellipsis", width: "250px" }}>{data?.DestinationName}</Typography>

                                            </Grid>
                                            <Grid size={3.3} ><Button sx={{ justifyContent: "end", p: 0, pr: 0.7 }} ><InfoOutlinedIcon onClick={() => { localStorage.removeItem("TabIndex"), route.push(`destination/${data.DestinationName}/details/${data?.DestinationID}`) }} sx={{ color: 'black' }} /></Button> </Grid>
                                            <Grid size={10.5} display={"flex"} justifyContent={"left"}>
                                                <Typography sx={{ display: "inline-block" }}><LocationOnIcon sx={{ color: "#D32F2F" }} /></Typography>
                                                <Typography sx={{ display: "inline-block", pt: 0.3, pl: 1 }}>{data?.Location[0]?.Country || 'N/A'}</Typography>
                                            </Grid>
                                            <Typography sx={{ display: "inline-block" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512"><path fill="currentColor" d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120m8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0M288 152a40 40 0 1 0 0-80a40 40 0 1 0 0 80" /></svg></Typography>
                                        </Grid>
                                    </Card>
                                </Grid>
                            )) : <>
                                <Grid size={12} display={"flex"} justifyContent={"center"} >
                                    <img src={NodataImage?.src} style={{ borderRadius: "10px" }} height={"500px"} width={"500px"}></img>
                                </Grid>
                            </>
                            }
                        </Grid>
                    </>}
                </Box>
            </Box >
        </>
    )
}