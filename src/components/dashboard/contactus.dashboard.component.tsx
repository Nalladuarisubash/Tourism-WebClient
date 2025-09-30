import { Avatar, Box, Button, Card, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import router from "next/router"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TIcon from "../../../public/TIconBlack.svg";
import UserApi from "../../api/user.api";
import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingAnimation from "../../../public/loading/loading.animation.json";
import dynamic from "next/dynamic";
import NodataImage from "../../../public/nodatafound/nodata.svg"
import Head from "next/head";

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const userApi = new UserApi();

export default function ContactUsDashbord() {

    const avatarColorCodes = ["#E5D4FF", "#FFD6A5", "#A8E6CF", "#FFB6B9", "#C7CEEA", "#F6C6EA", "#ACE7EF", "#D4A5A5", "#87CEFA", "#F7C8E0"]
    const [userData, setUserData] = useState<any>()
    const [isLoading, setIsLoading] = useState(false)
    const [messageShowEnable, setMessageShowEnable] = useState(false)
    const [messageData, setMessageData] = useState<any>()

    let Headers = [
        { headerName: "UserName", xl: 2, pl: 2, lg: 1.9 },
        { headerName: "EmailID", xl: 2, pl: 1, lg: 2.05 },
        { headerName: "Country", xl: 1.5, lg: 1.5 },
        { headerName: "Subject", xl: 3.5, lg: 3.5 },
        { headerName: "Message", xl: 1.5, lg: 1.5 },
        { headerName: "CreatedDate", xl: 1 },
    ]

    const handleReadContactUs = async () => {
        setIsLoading(true)
        let request = {
            "filter": {},
            "fileds": {},
            "page": 0,
            "limit": 100,
            "sort": {}
        }

        const readAdmin: any = await userApi?.readUserContact(request);

        if (readAdmin?.status === 200) {

            setUserData(readAdmin?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)

        }
        else if (readAdmin?.status === 404) {
            setUserData([])
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
        handleReadContactUs()
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
                <title>Tourism - Contact Details</title>
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
                                <Typography fontSize={{ xl: "30px", lg: "25px" }} fontWeight={"bold"} >Contact Details</Typography>
                            </Grid>

                            <Grid size={3} sx={{ alignContent: 'center', justifyContent: 'center' }} pt={3}>
                                <Stack display={"flex"} direction={"row"} justifyContent={"end"}>
                                    <Button title="Home" sx={{ color: "Black", fontWeight: "bold" }} onClick={() => { router?.push("/home") }} ><HomeOutlinedIcon sx={{ fontSize: "35px" }} /></Button>
                                    <Button title="Destination Details" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/destinationdetails") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M85.333 127.999h341.334v256H85.333zM42.667 426.665V85.332h426.666v341.333zm64-268.19h32v86.857l42.666-32v32l53.334-32v85.333h-128zM384 170.665v32H277.333v-32zm0 96v-32H277.333v32zm0 64v-32H277.333v32z" clip-rule="evenodd" /></svg>
                                    </Button>
                                    <Button title="Admin Details" sx={{ color: "black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/admindetails") }} ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20zm-8-2v-1.25c0-1.66-3.34-2.5-5-2.5s-5 .84-5 2.5V17zM9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7zm0 2v1h6V9zm0 2v1h4v-1z" /></svg></Button>
                                    <Box component="span" sx={{ borderBottom: "2px solid black", display: "inline-block", lineHeight: 1 }}>
                                        <Button title="Contact Us Message" sx={{ color: "Black", fontWeight: "bold" }} onClick={() => { router.push("/dashboard/contactdetails") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H2V5h20zM21 6h-7v5h7zm-1 2l-2.5 1.75L15 8V7l2.5 1.75L20 7zM9 12a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3a3 3 0 0 0 3 3m0-4a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m6 8.59c0-2.5-3.97-3.59-6-3.59s-6 1.09-6 3.59V18h12zM5.5 16c.72-.5 2.2-1 3.5-1s2.77.5 3.5 1z" /></svg>
                                        </Button>
                                    </Box>
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
                                    {userData?.length > 0 ? userData?.map((data: any, index: any) => (
                                        <Card sx={{ mt: 0.5, p: { xl: 1, lg: 0.5 }, alignItems: "center" }}>
                                            <Grid container display={"flex"} alignItems={"center"} >
                                                <Grid size={2.1} >
                                                    <Stack display={"flex"} direction={"row"}>
                                                        <Avatar key={index} sx={{
                                                            height: { xl: "30px", lg: "35px" }, width: { xl: "35px", lg: "35px" }, color: "black", fontWeight: "bold",
                                                            bgcolor: avatarColorCodes[index % avatarColorCodes.length], ml: 2, pt: 0.5, fontSize: { xl: "20px", lg: "25px" }, pl: 0.1
                                                        }}>{data?.UserName.slice(0, 1)}</Avatar>
                                                        <Typography sx={{ fontWeight: "bold", pl: 1, pt: 1.2, fontSize: { xl: "16px", lg: "13px" } }}> {data?.UserName}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid size={2} ><Typography>{data?.EmailID}</Typography></Grid>
                                                <Grid size={1.5} ><Typography>{data?.Country}</Typography></Grid>
                                                <Grid size={3.5} ><Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data?.Subject}</Typography></Grid>
                                                <Grid size={1.5} ><Button title={"Click View Message"} onClick={() => { setMessageData(data), setMessageShowEnable(true) }}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" strokeWidth={"2px"} stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M8.5 15.5h7m-7-5H12M10.5 3q-.337.016-.67.037c-4.184.279-7.516 3.664-7.79 7.914a20 20 0 0 0 0 2.525c.1 1.548.783 2.98 1.588 4.19c.467.848.159 1.906-.328 2.83c-.35.665-.526.998-.385 1.239c.14.24.455.248 1.084.263c1.245.03 2.084-.323 2.75-.815c.377-.279.566-.418.696-.434s.387.09.899.3c.46.19.995.308 1.485.34c1.425.095 2.914.096 4.342 0c4.183-.278 7.515-3.663 7.789-7.913a20 20 0 0 0 0-2.525q-.032-.484-.114-.951M17.5 5h.009" /><path d="M21.795 4.59c.137.183.205.275.205.41s-.068.227-.205.41C21.18 6.23 19.61 8 17.5 8s-3.68-1.77-4.295-2.59C13.068 5.226 13 5.134 13 5s.068-.227.205-.41C13.82 3.77 15.39 2 17.5 2s3.68 1.77 4.295 2.59" /></g></svg></Button></Grid>
                                                <Grid size={1} textAlign={"center"}><Typography justifyContent={"end"}>{data?.CreatedDate ? new Date(data?.CreatedDate).toLocaleDateString() : "-"}</Typography></Grid>
                                            </Grid>
                                        </Card>
                                    ))
                                        : <>
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
            {
                messageShowEnable && <>
                    <Dialog open={true}>
                        <DialogTitle >
                            <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                <Typography fontSize={"20px"} fontWeight={"bold"}>{messageData?.UserName}</Typography>
                                <Button sx={{ m: 0, p: 0 }} onClick={() => { setMessageShowEnable(false) }}><CancelIcon sx={{ fontSize: "30px" }} /></Button>
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                {messageData?.Message}
                            </Typography>
                        </DialogContent>
                    </Dialog>
                </>
            }
        </>
    )
}