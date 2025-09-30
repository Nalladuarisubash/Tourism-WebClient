import { Avatar, Box, Button, Card, Grid, Stack, Typography } from "@mui/material"
import router from "next/router"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TIcon from "../../../public/TIconBlack.svg";
import AdminApi from "../../api/login_registration.api";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../../public/loading/loading.animation.json";
import dynamic from "next/dynamic";
import NodataImage from "../../../public/nodatafound/nodata.svg"
import Head from "next/head";

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const adminApi = new AdminApi();

export default function AdminDetailDashbord() {

    const avatarColorCodes = ["#E5D4FF", "#FFD6A5", "#A8E6CF", "#FFB6B9", "#C7CEEA", "#F6C6EA", "#ACE7EF", "#D4A5A5", "#87CEFA", "#F7C8E0"]
    const [adminData, setAdminData] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)

    let Headers = [
        { headerName: "Admin Name", xl: 1.8, lg: 1.8, pl: 2 },
        { headerName: "EmailID", xl: 2, lg: 2.5, pl: 1 },
        { headerName: "Country", xl: 1.5, lg: 1.2 },
        { headerName: "ContactNumber", xl: 1.5, lg: 1.5 },
        { headerName: "CreatedDate", xl: 1.5 },
        { headerName: "No of Destination", xl: 1.5 },
        { headerName: "Approved", xl: 1, lg: 1 },
        { headerName: "Rejected", xl: 1, pl: 3 }
    ]

    const handleReadAdmin = async () => {
        setIsLoading(true)
        let request = {
            "filter": {},
            "fileds": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }

        const readAdmin: any = await adminApi?.readAdmin(request);

        if (readAdmin?.status === 200) {
            setAdminData(readAdmin?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
        else if (readAdmin?.status === 404) {
            setAdminData([])
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

    useEffect(() => {
        handleReadAdmin()
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
                <title>Tourism - Admin Details</title>
            </Head>

            <Box height={"100vh"} width={"100wh"} bgcolor={"whitesmoke"} >
                <Grid container justifyContent={"center"} spacing={{ xl: 5, lg: 2 }} >
                    <Grid size={{ xl: 11, lg: 11.5 }} >
                        <Grid container justifyContent={"space-between"} >
                            <Grid size={4}>
                                <Box component={"img"} src={TIcon?.src} mt={1} sx={{ height: { xl: "70px", lg: "50px" } }} />
                                <Typography sx={{ color: "black", fontSize: "25px", fontWeight: "bold", position: "absolute", top: { xl: "5.5%", lg: "5.5%" }, left: { xl: "6.5%", lg: "4.6%" } }}>ourism</Typography>
                            </Grid>

                            <Grid size={3} sx={{ alignContent: 'center', justifyContent: 'center' }} pt={3}>
                                <Typography fontWeight={"bold"} fontSize={{ xl: "30px", lg: "25px" }}  >Admin Details</Typography>
                            </Grid>

                            <Grid size={3} sx={{ alignContent: 'center', justifyContent: 'center' }} pt={3}>
                                <Stack display={"flex"} direction={"row"} justifyContent={"end"}>
                                    <Button title="Home" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router?.push("/home") }} ><HomeOutlinedIcon sx={{ fontSize: "35px" }} /></Button>
                                    <Button title="Destination Details" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/destinationdetails") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M85.333 127.999h341.334v256H85.333zM42.667 426.665V85.332h426.666v341.333zm64-268.19h32v86.857l42.666-32v32l53.334-32v85.333h-128zM384 170.665v32H277.333v-32zm0 96v-32H277.333v32zm0 64v-32H277.333v32z" clip-rule="evenodd" /></svg>
                                    </Button>
                                    <Box component="span" sx={{ borderBottom: "2px solid black", display: "inline-block", lineHeight: 1 }}>
                                        <Button title="Admin Details" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/admindetails") }} ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20zm-8-2v-1.25c0-1.66-3.34-2.5-5-2.5s-5 .84-5 2.5V17zM9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7zm0 2v1h6V9zm0 2v1h4v-1z" /></svg></Button>
                                    </Box>

                                    <Button title="Contact Us Message" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/contactdetails") }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H2V5h20zM21 6h-7v5h7zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7zM9 12a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3a3 3 0 0 0 3 3m0-4a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m6 8.59c0-2.5-3.97-3.59-6-3.59s-6 1.09-6 3.59V18h12zM5.5 16c.72-.5 2.2-1 3.5-1s2.77.5 3.5 1z" /></svg>
                                    </Button>

                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xl: 11, lg: 11.5 }} >
                        <Grid container>
                            <Grid size={12} bgcolor={"#6DA7D0"}>
                                <Grid container>
                                    {Headers?.map((data: any) => (
                                        <Grid size={{ xl: data?.xl, lg: data?.lg }} p={2}>
                                            <Typography sx={{ pl: data?.pl, fontWeight: "bold", fontSize: { xl: "16px", lg: "13px" } }}>{data?.headerName}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid size={12} sx={{ overflow: "scroll", maxHeight: `calc(90vh - 10vh)` }}>
                                {isLoading ? <><Box mt={{ xl: 20, lg: 10 }}> <Lottie options={loadingAnimation} height={300} width={300} /></Box></> : <>
                                    {adminData?.length > 0 ? adminData?.map((data: any, index: any) => (
                                        <Card sx={{ mt: 1, p: 1 }}>
                                            <Grid container display={"flex"} alignItems={"center"} >
                                                <Grid size={{ xl: 1.9, lg: 2 }} ><Stack display={"flex"} direction={"row"}>
                                                    <Avatar key={index} sx={{
                                                        height: { xl: "35px", lg: "35px" }, width: { xl: "40px", lg: "35px" }, color: "black", fontWeight: "bold",
                                                        bgcolor: avatarColorCodes[index % avatarColorCodes.length], ml: 2, pt: 0.5, fontSize: { xl: "25px", lg: "25px" }, pl: 0.1
                                                    }}>{data.AdminName.slice(0, 1)}</Avatar>
                                                    <Typography sx={{ fontWeight: "bold", pl: 1, pt: 1.2, fontSize: { xl: "16px", lg: "13px" } }}> {data?.AdminName}</Typography>
                                                </Stack></Grid>
                                                <Grid size={{ xl: 2, lg: 2.5 }}   >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.EmailID}</Typography>
                                                </Grid>
                                                <Grid size={{ xl: 1.5, lg: 1.2 }} >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.Country}</Typography>
                                                </Grid>
                                                <Grid size={{ xl: 1.6, lg: 1.5 }} >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.ContactNumber}</Typography>
                                                </Grid>
                                                <Grid size={{ xl: 1.8, lg: 1.7 }} >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.CreatedDate ? new Date(data?.CreatedDate).toLocaleDateString() : "-"}</Typography>
                                                </Grid>
                                                <Grid size={{ xl: 1.4, lg: 1.2 }} >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.DestinationData?.totalDestinationCount}</Typography>
                                                </Grid>
                                                <Grid size={{ xl: 1.2, lg: 1.2 }} >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.DestinationData?.approvalStatus}</Typography>
                                                </Grid>
                                                <Grid size={{ xl: 0.6, lg: 0.5 }} >
                                                    <Typography sx={{ fontSize: { xl: "16px", lg: "13px" } }}>{data?.DestinationData?.notApprovalStatus}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    ))
                                        :
                                        <>
                                            <Grid size={12} display={"flex"} justifyContent={"center"} >
                                                <Box component={"img"} src={NodataImage?.src} style={{ borderRadius: "10px" }} height={{ xl: "500px", lg: "400px" }} width={{ xl: "500px", lg: "400px" }}></Box>
                                            </Grid>
                                        </>
                                    }
                                </>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}