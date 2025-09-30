import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import BgTopImage from "../../../public/about_top_img.jpg";
import BGBottomImage from "../../../public/about_bottom_bgimage.jpg";
import router from "next/router";
import AboutImage from "../../../public/Info.jpg";
import LoationImage from "../../../public/Location_about_Img.jpg";
import ExpenseImage from "../../../public/expanse_aboutImg.jpg";
import TravelImage from "../../../public/Travel_aboutImg.jpg";
import PictureImage from "../../../public/Picture_aboutImg.jpg";
import RatingReview from "../../../public/Ratin&Review_aboutimg.jpg"
import EmailIcon from '@mui/icons-material/Email';
import Head from "next/head";
import TIcon from "../../../public/TIconBlack.svg";

export default function AboutComponent() {
    return (
        <>

            <Head>
                <title>Tourism - About Page</title>
            </Head>

            <Grid container height={"100vh"} width={"100wh"}>
                <Grid size={12} height={{ xl: "25vh", lg: "20vh" }} >
                    <img src={BgTopImage?.src} style={{ position: "absolute", height: "25%", width: "100%", zIndex: -1 }} />
                    <Grid size={12} pt={{ xl: 3, lg: 1 }} >
                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                            <Box component={"img"} src={TIcon?.src} sx={{ height: { xl: "70px", lg: "45px" }, pl: { xl: 2.7, lg: 1 } }} />
                            <Typography sx={{ color: "black", fontSize: { xl: "25px", lg: "20px" }, fontWeight: "bold", position: "absolute", top: { xl: "7%", lg: "5.5%" }, left: { xl: "3.5%", lg: "3%" } }}>ourism</Typography>
                            <Grid width={"500px"} display={"flex"} justifyContent={"space-around"} >
                                <Button sx={{ color: "Black", fontWeight: "bold", textTransform: "none" }} onClick={() => { router.push("/home") }}>Home</Button>

                                <Button sx={{ color: "Black", fontWeight: "bold", textTransform: "none" }} onClick={() => { router.push("/contact") }}>Contact us</Button>

                                <Button sx={{ color: "Black", fontWeight: "bold", textTransform: "none", textDecoration: 'underline' }} >About us</Button>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid size={12} textAlign={"center"} alignItems={"center"}>
                        <Typography sx={{ fontWeight: "bold", fontSize: { xl: "30px", lg: "20px" } }}>About Us</Typography>
                    </Grid>
                </Grid>
                <Grid size={12} height={{ xl: "55vh", lg: "60vh" }} >
                    <Grid container>
                        <Grid size={6} height={"55vh"} p={{ lg: 5, xl: 8 }} >
                            <Typography sx={{ fontSize: { lg: "20px", xl: "30px" }, fontWeight: "bold", mt: { xl: 0, lg: 1 } }}>Discover & Explore with Tourism</Typography>
                            <Typography sx={{ pt: { lg: 4, xl: 10 }, fontSize: { xl: "16px", lg: "14px" } }}>Welcome to Tourism, your ultimate guide to exploring amazing destinations. Our platform helps you discover new places, learn about their attractions, and plan your visits effortlessly. Whether you're an adventure seeker or a cultural explorer, we bring you detailed insights to make your journey memorable.</Typography>
                            <Typography sx={{ pt: { lg: 3, xl: 4 }, fontSize: { xl: "16px", lg: "14px" } }}>Start exploring today!</Typography>
                            <Typography sx={{ color: "#2797CF", fontWeight: "bold", fontSize: { lg: "14px", xl: "20px" }, pt: { lg: 4, xl: 10 }, fontStyle: "italic" }}>"The world is a book, and those who do not travel read only one page."</Typography>
                            <Typography sx={{ fontWeight: "bold", fontSize: { lg: "14px", xl: "20px" }, textAlign: "end", pt: { lg: 2, xl: 4 } }}> - Saint Augustine</Typography>
                        </Grid>
                        <Grid size={6} height={"55vh"} >
                            <Typography textAlign={"center"} mt={{ xl: 1, lg: 4 }} fontSize={{ xl: "16px", lg: "14px" }}>Discover Essential Travel Information</Typography>
                            <Grid container mt={{ xl: 1, lg: 0 }} display={"flex"} direction={"column"} height={{ lg: "90%", xl: "92%" }} >
                                <Grid size={12} height={"50%"} >
                                    <Stack display={"flex"} direction={"row"} justifyContent={{ xl: "space-between", lg: "space-around" }} height={"25vh"} >
                                        <Grid size={4} p={1} display={"flex"} justifyContent={"center"}>
                                            <Card sx={{ height: { lg: "140px", xl: "225px" }, width: { lg: "145px", xl: "250px" }, border: "1px solid gray" }} >
                                                <Box component={"img"} src={AboutImage?.src} sx={{ height: { xl: "180px", lg: "100px" }, width: { xl: "250px", lg: "145px" } }}></Box>
                                                <Typography textAlign={"center"} mt={1} fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Info</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid size={4} p={1} display={"flex"} justifyContent={"center"}>
                                            <Card sx={{ height: { lg: "140px", xl: "225px" }, width: { lg: "145px", xl: "250px" }, border: "1px solid gray" }} >
                                                <Box component={"img"} src={LoationImage?.src} sx={{ height: { xl: "180px", lg: "100px" }, width: { xl: "250px", lg: "145px" } }}></Box>
                                                <Typography textAlign={"center"} mt={1} fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Location</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid size={4} p={1} display={"flex"} justifyContent={"center"}>
                                            <Card sx={{ height: { lg: "140px", xl: "225px" }, width: { lg: "145px", xl: "250px" }, border: "1px solid gray" }} >
                                                <Box component={"img"} src={ExpenseImage?.src} sx={{ height: { xl: "180px", lg: "100px" }, width: { xl: "250px", lg: "145px" } }}></Box>
                                                <Typography textAlign={"center"} mt={1} fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Expense</Typography>
                                            </Card>
                                        </Grid>
                                    </Stack>
                                </Grid>
                                <Grid size={12} height={"50%"} >
                                    <Stack display={"flex"} direction={"row"} justifyContent={"space-between"} height={"25vh"}>
                                        <Grid size={4} p={1} display={"flex"} justifyContent={"center"}>
                                            <Card sx={{ height: { lg: "140px", xl: "225px" }, width: { lg: "145px", xl: "250px" }, border: "1px solid gray" }} >
                                                <Box component={"img"} src={TravelImage?.src} sx={{ height: { xl: "180px", lg: "100px" }, width: { xl: "250px", lg: "145px" } }}></Box>
                                                <Typography textAlign={"center"} mt={1} fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Travel</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid size={4} p={1} display={"flex"} justifyContent={"center"}>
                                            <Card sx={{ height: { lg: "140px", xl: "225px" }, width: { lg: "145px", xl: "250px" }, border: "1px solid gray" }} >
                                                <Box component={"img"} src={PictureImage?.src} sx={{ height: { xl: "180px", lg: "100px" }, width: { xl: "250px", lg: "145px" } }}></Box>
                                                <Typography textAlign={"center"} mt={1} fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Pictures</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid size={4} p={1} display={"flex"} justifyContent={"center"}>
                                            <Card sx={{ height: { lg: "140px", xl: "225px" }, width: { lg: "145px", xl: "250px" }, border: "1px solid gray" }} >
                                                <Box component={"img"} src={RatingReview?.src} sx={{ height: { xl: "180px", lg: "100px" }, width: { xl: "250px", lg: "145px" } }}></Box>
                                                <Typography textAlign={"center"} mt={1} fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Rating & Review</Typography>
                                            </Card>
                                        </Grid>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={12} height={{ xl: "20vh", lg: "20vh" }} >
                    <img src={BGBottomImage?.src} style={{ position: "absolute", height: "20%", width: "100%", zIndex: -1 }} />
                    <Typography sx={{ color: "white", fontWeight: "bold", pl: { lg: 1, xl: 2 }, m: 2, fontSize: { xl: "16px", lg: "14px" } }}>Contact Info</Typography>
                    <Grid container height={{ xl: "12vh", lg: "6vh" }} width={"100%"} alignItems={"center"}>
                        <Grid size={6}>
                            <Stack display={"flex"} direction={"row"} justifyContent={"center"} spacing={2}>
                                <EmailIcon sx={{ color: "white" }} />
                                <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" }, pt: { xl: 0, lg: 0.5 } }}>tourism001@gmail.com</Typography>
                            </Stack>
                        </Grid>
                        <Grid size={6}>
                            <Stack display={"flex"} direction={"row"} justifyContent={"center"} spacing={2}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#ffffff" d="M17.256 12.253c-.096-.667-.611-1.187-1.274-1.342c-2.577-.604-3.223-2.088-3.332-3.734C12.193 7.092 11.38 7 10 7s-2.193.092-2.65.177c-.109 1.646-.755 3.13-3.332 3.734c-.663.156-1.178.675-1.274 1.342l-.497 3.442C2.072 16.907 2.962 18 4.2 18h11.6c1.237 0 2.128-1.093 1.953-2.305zM10 15.492c-1.395 0-2.526-1.12-2.526-2.5s1.131-2.5 2.526-2.5s2.526 1.12 2.526 2.5s-1.132 2.5-2.526 2.5M19.95 6c-.024-1.5-3.842-3.999-9.95-4C3.891 2.001.073 4.5.05 6s.021 3.452 2.535 3.127c2.941-.381 2.76-1.408 2.76-2.876C5.345 5.227 7.737 4.98 10 4.98s4.654.247 4.655 1.271c0 1.468-.181 2.495 2.76 2.876C19.928 9.452 19.973 7.5 19.95 6" /></svg>
                                <Typography sx={{ color: "white", fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" }, pt: { xl: 0, lg: 0.5 } }}>0462 123 123</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}