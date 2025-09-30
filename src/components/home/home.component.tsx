import Head from "next/head";
import { Box, Button, Grid, Stack, Typography, Fab, Card, Snackbar, Alert, Dialog, DialogContent, DialogTitle } from "@mui/material";
import BackgroundImage from "../../../public/HomeBg.jpg"
import TIcon from "../../../public/Ticon.svg"
import route from "next/router"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dot from "../../../public/Group 154.svg"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AddEditDestination from "../destination/add_edit_destination/add_edit.destination.component";
import RegistrationForm from "../login_registration/registration.component";
import LoginForm from "../login_registration/login.component";
import LoadingAnimation from "../../../public/loading/loading.animation.json"
import dynamic from "next/dynamic";
import DestinationApi from "@/api/destination.api";
import NodataImage from "../../../public/nodatafound/nodata.svg"

const destinationApi = new DestinationApi()

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function DestinationHome() {

    const [data, setData] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slider1, setSlider1] = useState<any>();
    const [slider2, setSlider2] = useState<any>();
    const [settingAutoPlay, setSettingAutoPlay] = useState(true);
    const [addEditDestinationFormEnable, setAddEditDestinationFormEnable] = useState(false);
    const [registrationFormEnable, setRegistrationFormEnable] = useState(false);
    const [loginFormEnable, setLoginFormEnable] = useState(false);
    const [destinationData, setDestinationData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeDestination, setActiveDestination] = useState<any>();
    const [dashboardButtonShow, setDashboardButtonShow] = useState(false);
    const [loginLogoutButtonShow, setLoginLogoutButtonShow] = useState(false);
    const [logoutConfirmEnable, setLogoutConfirmEnable] = useState(false);
    const [logoutSuccessMessage, setLogoutSuccessMessage] = useState(false);

    const handleReadDestination = async () => {
        setIsLoading(true)
        let request = {
            "filter": {
                "IsDeleted": false
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
            }, 5000)
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
    }

    useEffect(() => {
        handleReadDestination()

        const AdminType = localStorage.getItem("AdminType")

        if (AdminType === "SuperAdmin") {
            setDashboardButtonShow(true)
            setLoginLogoutButtonShow(true)
        }
        if (AdminType === "Admin") {
            setLoginLogoutButtonShow(true)
        }

    }, [loginLogoutButtonShow])

    const loadingAnimation = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        }
    }

    useEffect(() => {
        if (destinationData.length === 1) {
            setActiveDestination(destinationData[0] || "");
        }
        else if (destinationData.length > 1) {
            setActiveDestination(destinationData[0] || "");
        }
    }, [destinationData]);
    const settings = useMemo(() => ({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: destinationData?.length === 1 ? 1 : destinationData?.length === 2 ? 2 : destinationData?.length >= 3 ? 3 : 0,
        slidesToScroll: 1,
        autoplay: settingAutoPlay,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        arrows: false,
        centerMode: true,
        centerPadding: "-10px",
        beforeChange: (oldIndex: any, newIndex: any) => { setActiveIndex(newIndex) },
        afterChange: (index: any) => {
            setActiveDestination(destinationData[index] || "")
        },
    }), [settingAutoPlay, destinationData])

    const setting = useMemo(() => ({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: settingAutoPlay,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        arrows: false
    }), [settingAutoPlay]);

    const handleAddDestination = () => {

        const user = localStorage.getItem("AdminName");

        if (!user) {
            setLoginFormEnable(true)
        }
        else {
            setAddEditDestinationFormEnable(true)
        }
    }

    return (
        <>
            <Head>
                <title>Tourism - Home</title>
            </Head>

            <Box sx={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }} >

                <img src={BackgroundImage?.src} style={{ position: "absolute", width: "100%", height: "100%", zIndex: -1 }} />
                <Box style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: -1 }} />
                <Grid container >

                    <Grid size={12} >
                        <Grid container sx={{ justifyContent: "space-between", justifyItems: "center" }} p={1} >

                            <Grid size={3.5}  >
                                <Box component={"img"} src={TIcon?.src} sx={{ height: { xl: "70px", lg: "50px" } }} />
                                <Typography sx={{ color: "white", fontSize: { xl: "30px", lg: "25px" }, fontWeight: "bold", position: "absolute", top: { xl: "4.5%", lg: "4.4%" }, left: { lg: "3.1%", xl: "2.7%" } }} >ourism</Typography>
                            </Grid>

                            <Grid size={3.5} pt={{ xl: 2, lg: 1 }} >
                                <Button sx={{ borderRadius: { xl: "10px", lg: "8px" }, bgcolor: "#6DA7D0", p: { xl: 2, lg: 0.5 }, width: { xl: "200px", lg: "120px" } }}
                                    onClick={() => { route.push('/explore') }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z" /><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485" /></g></svg>

                                    <Typography sx={{ color: "white", fontWeight: "bold", pl: { xl: 2, lg: 1 }, fontSize: { xl: "18px", lg: "12px" } }} >Explore</Typography>
                                </Button>
                            </Grid>

                            <Grid size={4} sx={{ alignContent: 'center', justifyContent: 'center' }}   >
                                <Stack display={"flex"} direction={"row"} justifyContent={"space-around"} >
                                    <Button sx={{ color: "white", fontWeight: "bold", fontSize: { lg: "12px", xl: "14px" }, textDecoration: 'underline' }}>Home</Button>
                                    <Button sx={{ color: "white", fontWeight: "bold", fontSize: { lg: "12px", xl: "14px" } }} onClick={() => { route.push('/contact') }}>Contact Us</Button>
                                    <Button sx={{ color: "white", fontWeight: "bold", fontSize: { lg: "12px", xl: "14px" } }} onClick={() => { route.push('/about') }}>About Us</Button>
                                    {dashboardButtonShow && <Button title="Dashboard" sx={{ color: "white", fontWeight: "bold", fontSize: { lg: "12px", xl: "14px" } }} onClick={() => { route.push('/dashboard/destinationdetails') }}>Dashboard</Button>}
                                    <Button sx={{ color: "white", fontWeight: "bold", fontSize: { lg: "12px", xl: "14px" } }} onClick={() => { loginLogoutButtonShow ? setLogoutConfirmEnable(true) : setLoginFormEnable(true) }} >{loginLogoutButtonShow ? "Logout" : "Login"}</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={12} display={"inline-block"}>
                        <Grid pr={{ xl: 8, lg: 3 }} pt={{ xl: 5, lg: 0 }} textAlign={"end"}>

                            <Fab sx={{ bgcolor: "#6DA7D0", height: { xl: "60px", lg: "40px" }, width: { xl: "60px", lg: "40px" }, '&:hover': { background: '#6DA7D0', width: { xl: "250px", lg: "170px" }, height: { xl: "60px", lg: "40px" }, borderRadius: "10px" } }} onMouseEnter={() => setData(true)}
                                onMouseLeave={() => setData(false)} onClick={() => { handleAddDestination(), setSettingAutoPlay(false) }} ><AddIcon sx={{ color: "#ffffff", fontSize: { xl: "40px", lg: "30px" } }} />{data && <Typography sx={{ color: "white", fontWeight: "bold", p: 1, fontSize: { xl: "14px", lg: "12px" } }}>Add Destination</Typography>}</Fab>
                        </Grid>

                        {isLoading ? <><Box mt={10} width={"100%"}> <Lottie options={loadingAnimation} height={300} width={300} /></Box></> : <>

                            {destinationData?.length > 0 ?
                                (destinationData?.length === 1 ? <>
                                    {destinationData?.map((data: any, index: any) => (
                                        <><Grid container>
                                            <Grid size={4}>
                                                <Box key={index} onChange={() => { setActiveDestination(data?.DestinationName) }} >
                                                    <Stack p={{ xl: 6, lg: 2 }} height={"100%"} display={"flex"} direction={"column"} spacing={{ xl: 8, lg: 8 }}>
                                                        <Typography sx={{ color: "#ffffff", fontSize: { xl: "50px", lg: "25px" }, fontWeight: "bold" }}>{data?.DestinationName}, {data?.Location[0]?.State},{data?.Location[0]?.Country}</Typography>
                                                        <Typography sx={{ color: "#ffffff", fontSize: { xl: "20px", lg: "16px" }, overflow: "hidden", textWrap: "wrap", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 7, WebkitBoxOrient: "vertical", position: "relative" }}>{data?.Description}</Typography>
                                                    </Stack>
                                                </Box>

                                                <Box textAlign={"center"}>
                                                    <Button sx={{ borderRadius: { xl: "10px", lg: "8px" }, bgcolor: "#6DA7D0", p: { xl: 2, lg: 0.5 }, pt: { xl: 2, lg: 0.5 }, width: { xl: "200px", lg: "100px" }, alignSelf: "start", mt: 3 }}
                                                        onClick={() => { localStorage.removeItem("TabIndex"), localStorage.setItem("DestinationID", activeDestination?.DestinationID), route.push(`/destination/${activeDestination?.DestinationName}/details/${activeDestination?.DestinationID}`) }} >
                                                        <Typography sx={{ color: "white", fontWeight: "bold", pl: 2, pt: { lg: 1 }, fontSize: { lg: "12px", xl: "18px" } }} >View</Typography>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="20" viewBox="0 0 448 512"><path fill="#ffffff" d="m190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3" /></svg>
                                                    </Button>
                                                </Box>
                                            </Grid>
                                            <Grid size={8}>
                                                <Box key={index}  >
                                                    <Grid container>
                                                        <Stack display={"flex"} direction={"column"} sx={{ pl: activeIndex !== index ? { lg: "20px", xl: 0 } : 0 }}  >
                                                            <Typography sx={{ color: "#ffffff", fontWeight: "bold" }}>{data?.DestinationName},{data?.Location[0]?.State}</Typography>
                                                            <Grid mt={0.3}> <img src={Dot?.src} alt="No Image" ></img></Grid>
                                                            <Card sx={{ height: activeIndex === index ? { xl: "450px", lg: "350px" } : { xl: "400px", lg: "300px" }, width: activeIndex === index ? { xl: "320px", lg: "260px" } : { xl: "310px", lg: "220px" }, borderRadius: "20px", mt: 1 }} >
                                                                <Box position="relative" height="450px" width="320px">
                                                                    <Box component={"img"} src={data?.Image[0]?.Image} alt="No Image" height={{ xl: "450px", lg: "350px" }} width={{ xl: "320px", lg: "260px" }} style={{ zIndex: 1, objectFit: "cover" }} />
                                                                    <Box position="absolute" top={0} left={0} height="100%" width="100%" bgcolor={activeIndex === index ? "none" : "rgba(0, 0, 0, 0.4)"} zIndex={2} />
                                                                </Box>
                                                            </Card>
                                                        </Stack>
                                                        <Stack display={"flex"} direction={"column"} sx={{ pl: { lg: "150px", xl: "250px" }, mt: 6 }}  >
                                                            <Typography sx={{ color: "#ffffff", fontWeight: "bold" }}>Add One More Data...</Typography>
                                                            <Grid mt={0.3}> <img src={Dot?.src} alt="No Image" ></img></Grid>
                                                            <Box sx={{ height: { xl: "400px", lg: "300px" }, width: { xl: "310px", lg: "220px" }, borderRadius: "20px", mt: 1, border: "2px dashed whitesmoke", textAlign: "center", alignContent: "center", cursor: "pointer" }} bgcolor={"rgba(0, 0, 0, 0.4)"}
                                                                onClick={() => { handleAddDestination(), setSettingAutoPlay(false) }} >
                                                                <AddIcon sx={{ color: 'whitesmoke', textAlign: "center", fontSize: "100px" }} />
                                                            </Box>
                                                        </Stack>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        </>))}
                                </>
                                    :
                                    <>
                                        <Grid container alignItems={"center"} >
                                            <Grid size={4} >
                                                <Slider ref={setSlider1} {...setting} key={settingAutoPlay.toString()} >
                                                    {destinationData?.map((data: any, index: any) => (
                                                        <Box key={index} onChange={() => { setActiveDestination(data?.DestinationName) }} >
                                                            <Stack p={{ xl: 6, lg: 2 }} height={"100%"} display={"flex"} direction={"column"} spacing={{ xl: 8, lg: 8 }}>
                                                                <Typography sx={{ color: "#ffffff", fontSize: { xl: "50px", lg: "25px" }, fontWeight: "bold" }}>{data?.DestinationName}, {data?.Location[0]?.State},{data?.Location[0]?.Country}</Typography>
                                                                <Typography sx={{ color: "#ffffff", fontSize: { xl: "20px", lg: "16px" }, overflow: "hidden", textWrap: "wrap", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 7, WebkitBoxOrient: "vertical", position: "relative" }}>{data?.Description}</Typography>
                                                            </Stack>
                                                        </Box>
                                                    ))}
                                                </Slider>

                                                <Box textAlign={"center"}>
                                                    <Button sx={{ borderRadius: { xl: "10px", lg: "8px" }, bgcolor: "#6DA7D0", p: { xl: 2, lg: 0.5 }, pt: { xl: 2, lg: 0.5 }, width: { xl: "200px", lg: "100px" }, alignSelf: "start", mt: 3 }}
                                                        onClick={() => { localStorage.removeItem("TabIndex"), localStorage.setItem("DestinationID", activeDestination?.DestinationID), route.push(`/destination/${activeDestination?.DestinationName}/details/${activeDestination?.DestinationID}`) }} >
                                                        <Typography sx={{ color: "white", fontWeight: "bold", pl: 2, pt: { lg: 1 }, fontSize: { lg: "12px", xl: "18px" } }} >View</Typography>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="20" viewBox="0 0 448 512"><path fill="#ffffff" d="m190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3" /></svg>
                                                    </Button>
                                                </Box>
                                            </Grid>

                                            <Grid size={8} mt={{ xl: 5, lg: 1 }}>
                                                <Slider ref={setSlider2} {...settings} key={settingAutoPlay.toString()}  >
                                                    {destinationData?.map((data: any, index: any) => (
                                                        <Box key={index} sx={{ mt: activeIndex !== index ? 6 : 0 }} >
                                                            <Stack display={"flex"} direction={"column"} sx={{ pl: activeIndex !== index ? { lg: "20px", xl: 0 } : 0 }}  >
                                                                <Typography sx={{ color: "#ffffff", fontWeight: "bold" }}>{data?.DestinationName},{data?.Location[0]?.State}</Typography>
                                                                <Grid mt={0.3}> <img src={Dot?.src} alt="No Image" ></img></Grid>
                                                                <Card sx={{ height: activeIndex === index ? { xl: "450px", lg: "350px" } : { xl: "400px", lg: "300px" }, width: activeIndex === index ? { xl: "320px", lg: "260px" } : { xl: "310px", lg: "220px" }, borderRadius: "20px", mt: 1 }} >
                                                                    <Box position="relative" height="450px" width="320px">
                                                                        <Box component={"img"} src={data?.Image[0]?.Image} alt="No Image" height={{ xl: "450px", lg: "350px" }} width={{ xl: "320px", lg: "260px" }} style={{ zIndex: 1, objectFit: "cover" }} />
                                                                        <Box position="absolute" top={0} left={0} height="100%" width="100%" bgcolor={activeIndex === index ? "none" : "rgba(0, 0, 0, 0.4)"} zIndex={2} />
                                                                    </Box>
                                                                </Card>
                                                            </Stack>
                                                        </Box>
                                                    ))}
                                                </Slider>
                                            </Grid>
                                        </Grid>

                                        <Grid size={12} justifyContent={"center"} display={'flex'} alignItems={"center"} mt={{ xl: 4, lg: 1.5 }} >
                                            <Stack display={"flex"} justifyContent={'space-between'} direction={"row"} width={"40%"} >
                                                <Button onClick={() => { slider1?.slickPrev(); slider2?.slickPrev() }} >
                                                    <ArrowCircleLeftIcon sx={{ color: "rgba(217, 217, 217, 0.5)", fontSize: { xl: "70px", lg: "50px" }, borderRadius: "50%" }} />
                                                </Button>

                                                <Button onClick={() => { slider1?.slickNext(); slider2?.slickNext() }}  >
                                                    <ArrowCircleRightIcon sx={{ color: "rgba(217, 217, 217, 0.5)", fontSize: { xl: "70px", lg: "50px" } }} />
                                                </Button>
                                            </Stack>

                                        </Grid>
                                    </>)
                                :
                                <>
                                    <Grid size={12} display={"flex"} justifyContent={"center"}  >
                                        <Box component={"img"} src={NodataImage?.src} style={{ borderRadius: "10px" }} height={{ xl: "500px", lg: "400px" }} width={{ xl: "500px", lg: "400px" }}></Box>
                                    </Grid>
                                </>
                            }
                        </>}
                    </Grid>
                </Grid>
            </Box>

            {
                logoutConfirmEnable && <>
                    <Dialog open={true} maxWidth={'sm'}>
                        <DialogTitle>
                            <Typography fontWeight={"bold"} fontSize={"20px"}>Logout </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to Logout?
                            </Typography>

                            <Stack direction={"row"} justifyContent={"center"} spacing={6} mt={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#4CAF50",
                                        color: "white",
                                        '&:hover': { bgcolor: "#388E3C" },
                                        fontWeight: "bold"
                                    }}
                                    size="small"
                                    onClick={() => { (localStorage?.removeItem("AdminID"), localStorage?.removeItem("AdminName"), localStorage?.removeItem("AdminType"), setLoginLogoutButtonShow(false)), setLogoutConfirmEnable(false), setDashboardButtonShow(false) }}
                                >
                                    Yes
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{
                                        fontWeight: "bold",
                                        bgcolor: "#F44336",
                                        color: "white",
                                        '&:hover': { bgcolor: "#D32F2F" }
                                    }}
                                    size="small"
                                    onClick={() => { setLogoutConfirmEnable(false) }}
                                >
                                    No
                                </Button>
                            </Stack>
                        </DialogContent>
                    </Dialog>
                </>
            }

            {addEditDestinationFormEnable && <AddEditDestination type="add" InputData={{}} InputFunction={{ disableForm: () => { setAddEditDestinationFormEnable(false), setSettingAutoPlay(true) } }} />}

            {registrationFormEnable && <RegistrationForm InputFunction={{ disableForm: () => { setRegistrationFormEnable(false), setSettingAutoPlay(true) }, loginForm: () => { setRegistrationFormEnable(false), setLoginFormEnable(true) } }} />}

            {loginFormEnable && <LoginForm InputFunction={{
                disableForm: () => { setLoginFormEnable(false), setSettingAutoPlay(true) },
                loginFormSuccess: () => { setLoginFormEnable(false), setSettingAutoPlay(true), setLoginLogoutButtonShow(true) },
                registrationForm: () => { setLoginFormEnable(false), setRegistrationFormEnable(true) }
            }} />}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={logoutSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setLogoutSuccessMessage(false)}>
                <Alert onClose={() => setLogoutSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Name or Email ID is already exist
                </Alert>
            </Snackbar>
        </>
    )
}