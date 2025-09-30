import { Alert, Avatar, Box, Button, Card, Grid, IconButton, Menu, MenuItem, Snackbar, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import TIcon from "../../../public/TIconBlack.svg";
import router from "next/router";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TickMark from "../../../public/subway_tick.svg"
import CrossMark from "../../../public/cross_mark.svg"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useState } from "react";
import OverAllDetaisApi from "../../api/destination.api";
import DestinationApi from "../../api/destination.api";
import LoadingAnimation from "../../../public/loading/loading.animation.json";
import dynamic from "next/dynamic";
import NodataImage from "../../../public/nodatafound/nodata.svg";
import Head from "next/head";

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const overAllDetails = new OverAllDetaisApi();
const destinationApi = new DestinationApi();

export default function DestinationDashboard() {

    let tableHeaders = ["Request By", "DestinationName, State, Country", "Basic Details", "Location Details", "Expense Details", "Transport Details", "Pictures", "Status", "Action"]
    const avatarColorCodes = ["#E5D4FF", "#FFD6A5", "#A8E6CF", "#FFB6B9", "#C7CEEA", "#F6C6EA", "#ACE7EF", "#D4A5A5", "#87CEFA", "#F7C8E0"]
    const [menuOpen, setMenuOpen] = useState<any>(null)
    const [overAllData, setOverAllData] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedData, setSelectedData] = useState({})
    const [destinationStatusSuccessMessage, setDestinationStatusSuccessMessage] = useState(false)
    const [destinationStatusErrorMessage, setDestinationStatusErrorMessage] = useState(false)

    const handleReadOverAllDetails = async () => {
        setIsLoading(true)
        let request = {
            "filter": {},
            "fileds": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }

        const readOverAllDetails: any = await overAllDetails?.readOverAllDetails(request);

        if (readOverAllDetails?.status === 200) {
            setOverAllData(readOverAllDetails?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        else if (readOverAllDetails?.status === 404) {
            setOverAllData([])
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }

    const handleEditDestinationStatus = async (DestinationID: any, Status: string) => {

        let request = {
            "filter": { "DestinationID": DestinationID },
            "fields": {
                "Status": Status
            }
        }

        const editDestinationStatus: any = await destinationApi?.editDestination(request);

        if (editDestinationStatus?.status === 200) {
            setDestinationStatusSuccessMessage(true)
            handleReadOverAllDetails()
            setMenuOpen(null)
        }
        else {
            setDestinationStatusErrorMessage(true)
        }
    }

    useEffect(() => {
        handleReadOverAllDetails()
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
                <title>Tourism - Destination Overview</title>
            </Head>

            <Box height={"100vh"} width={"100wh"} bgcolor={"whitesmoke"}  >
                <Grid container justifyContent={"center"} spacing={{ xl: 5, lg: 2 }} >
                    <Grid size={{ xl: 11, lg: 11.5 }} >
                        <Grid container justifyContent={"space-between"} >
                            <Grid size={4}>
                                <Box component={"img"} src={TIcon?.src} mt={1} sx={{ height: { xl: "70px", lg: "50px" } }} />
                                <Typography sx={{ color: "black", fontSize: "25px", fontWeight: "bold", position: "absolute", top: { xl: "5.5%", lg: "5.5%" }, left: { xl: "6.5%", lg: "4.5%" } }}>ourism</Typography>
                            </Grid>

                            <Grid size={{ xl: 3, lg: 4 }} sx={{ alignContent: 'center', justifyContent: 'center' }} pt={3}>
                                <Typography fontSize={{ xl: "30px", lg: "25px" }} fontWeight={"bold"}  >Destination Details</Typography>
                            </Grid>

                            <Grid size={{ xl: 3, lg: 4 }} sx={{ alignContent: 'center', justifyContent: 'center' }} pt={3}>
                                <Stack display={"flex"} direction={"row"} justifyContent={"end"}>
                                    <Button title="Home" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/home") }} ><HomeOutlinedIcon sx={{ fontSize: "30px" }} /></Button>
                                    <Box component="span" sx={{ borderBottom: "2px solid black", display: "inline-block", lineHeight: 1 }} >
                                        <Button title="Destination Details" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/destinationdetails") }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M85.333 127.999h341.334v256H85.333zM42.667 426.665V85.332h426.666v341.333zm64-268.19h32v86.857l42.666-32v32l53.334-32v85.333h-128zM384 170.665v32H277.333v-32zm0 96v-32H277.333v32zm0 64v-32H277.333v32z" clip-rule="evenodd" /></svg>
                                        </Button>
                                    </Box>
                                    <Button title="Admin Details" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/admindetails") }} ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20zm-8-2v-1.25c0-1.66-3.34-2.5-5-2.5s-5 .84-5 2.5V17zM9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7zm0 2v1h6V9zm0 2v1h4v-1z" /></svg></Button>
                                    <Button title="Contact Us Message" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/contactdetails") }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H2V5h20zM21 6h-7v5h7zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7zM9 12a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3a3 3 0 0 0 3 3m0-4a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m6 8.59c0-2.5-3.97-3.59-6-3.59s-6 1.09-6 3.59V18h12zM5.5 16c.72-.5 2.2-1 3.5-1s2.77.5 3.5 1z" /></svg>
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xl: 11, lg: 11.5 }} sx={{ overflow: "scroll", maxHeight: `calc(90vh - 10vh)` }}>

                        <Table stickyHeader >
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#6DA7D0" }}>
                                    {tableHeaders.map((data: any) => (
                                        <TableCell sx={{ bgcolor: "#6DA7D0" }}>
                                            <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xl: "16px", lg: "13px" } }}>{data}</Typography>
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {isLoading ?
                                    <TableRow>
                                        <TableCell colSpan={9}>
                                            <Box sx={{ mt: { xl: "150px", lg: "60px" } }}> <Lottie options={loadingAnimation} height={300} width={300} /></Box>
                                        </TableCell>
                                    </TableRow> :
                                    <>

                                        {overAllData?.length > 0 ? overAllData?.map((data: any, index: any) => (
                                            <TableRow sx={{ bgcolor: "white", m: 0, p: 1 }}>
                                                <TableCell sx={{ m: 0, p: 1 }}>
                                                    <Stack display={"flex"} direction={"row"}>
                                                        <Avatar key={index} sx={{
                                                            height: { xl: "40px", lg: "35px" }, width: { xl: "40px", lg: "35px" }, bgcolor: avatarColorCodes[index % avatarColorCodes.length],
                                                        }}><Typography sx={{ color: "black", fontWeight: "bold", pt: { xl: 1, lg: 0.5 }, fontSize: { xl: "25px", lg: "20px" }, pl: { xl: 0.2, lg: 0.1 } }}>{data?.CreatedBy?.slice(0, 1)}</Typography></Avatar>
                                                        <Typography sx={{ fontWeight: "bold", pt: 1.2, pl: 1, fontSize: { xl: "16px", lg: "13px" } }}> {data?.CreatedBy}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ m: 0, p: 1 }}>
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}><Typography sx={{ display: "inline-block", fontWeight: "bold", fontSize: { xl: "16px", lg: "13px" } }} >{data?.DestinationName}</Typography>, {data?.State}, {data?.Country}</Typography></TableCell>
                                                <TableCell sx={{ textAlign: "center", pr: 5, m: 0, p: 1 }}>
                                                    <Typography sx={{ pt: 1 }}>{data?.BasicInfo === true ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} /> : <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center", pr: 6, m: 0, p: 1 }} >
                                                    <Typography sx={{ pt: 1 }}>{data?.LocationInfo === true ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} /> : <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center", pr: 6, m: 0, p: 1 }}>
                                                    <Typography sx={{ pt: 1 }}>{data?.ExpenseInfo === true ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} /> : <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center", pr: 6, m: 0, p: 1 }}>
                                                    <Typography sx={{ pt: 1 }}>{data?.TransportInfo === true ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} /> : <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center", pr: 4, m: 0, p: 1 }} >
                                                    <Typography sx={{ pt: 1 }}>{data?.PictureInfo === true ? <img src={TickMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} /> : <img src={CrossMark.src} alt={"Unavailable"} style={{ display: "inline-block" }} />}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ m: 0, p: 1 }} >
                                                    <Card sx={{ textAlign: "center", border: '2px solid whitesmoke' }}>
                                                        <Typography sx={{ color: data?.Status === "New" ? "#4A7EC3" : data?.Status === "Approved" ? "#8BC34A" : "#C34A4A", fontWeight: "bold", pt: 0.5, fontSize: { xl: "16px", lg: "13px" } }}>
                                                            {data?.Status}
                                                        </Typography>
                                                    </Card>

                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center", pr: 5, m: 1, p: 1 }}>

                                                    <IconButton onClick={(e: any) => { setMenuOpen(e.currentTarget), setSelectedData(data) }} >
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                    {data === selectedData &&
                                                        <Menu key={index} anchorEl={menuOpen}
                                                            open={Boolean(menuOpen)}
                                                            onClose={() => { setMenuOpen(null) }} >
                                                            <MenuItem key={index} onClick={() => { handleEditDestinationStatus(data?.DestinationID, "Approved") }} >Approved</MenuItem>
                                                            <MenuItem key={index} onClick={() => { handleEditDestinationStatus(data?.DestinationID, "Rejected") }} >Rejected</MenuItem>
                                                        </Menu>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                            :
                                            <>
                                                <TableRow>
                                                    <TableCell colSpan={9}>
                                                        <Grid size={12} display={"flex"} justifyContent={"center"} >
                                                            <Box component={"img"} src={NodataImage?.src} style={{ borderRadius: "10px" }} height={{ xl: "500px", lg: "350px" }} width={{ xl: "500px", lg: "400px" }}></Box>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        }
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Box >

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={destinationStatusSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setDestinationStatusSuccessMessage(false)}>
                <Alert onClose={() => setDestinationStatusSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Edit Destination Status Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={destinationStatusErrorMessage}
                autoHideDuration={5000}
                onClose={() => setDestinationStatusErrorMessage(false)}>
                <Alert onClose={() => setDestinationStatusErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Something went wrong...
                </Alert>
            </Snackbar>
        </>
    )
}