import { Alert, Box, Button, Grid, Snackbar, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import router from "next/router";
import BgImage from "../../../public/contact_Bg_Image.jpg"
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import UserApi from "../../api/user.api";
import Head from "next/head";
import TIcon from "../../../public/TIconBlack.svg";

const userApi = new UserApi();

export default function ContactComponent() {

    const [formData, setFormData] = useState({
        "UserName": "",
        "EmailID": "",
        "Subject": "",
        "Country": "",
        "Message": ""
    });
    const [addContactSuccessMessage, setAddContactSuccessMessage] = useState(false)
    const [addContactErrorMessage, setAddContactErrorMessage] = useState(false)

    const handleFormChange = (e: any) => {
        setFormData((prevState: any) => {
            return {
                ...prevState,
                [e?.target.name]: e?.target.value
            }
        })
    }

    const handleUserContact = async () => {

        let request = {
            data: {
                "UserName": formData?.UserName,
                "EmailID": formData?.EmailID,
                "Subject": formData?.Subject,
                "Country": formData?.Country,
                "Message": formData?.Message,
                "CreatedBy": formData?.UserName
            }
        }

        const userContact: any = await userApi?.createUserContact(request)

        if (userContact?.status === 200) {
            setAddContactSuccessMessage(true)
            setFormData({
                UserName: "",
                EmailID: "",
                Subject: "",
                Country: "",
                Message: ""
            })
        }
        else {
            setAddContactErrorMessage(true)
        }
    }

    return (
        <>

            <Head>
                <title>Tourism - Contact Page</title>
            </Head>

            <Box sx={{ height: "100vh", position: "absolute", width: "100vw", background: "linear-gradient(to bottom, #FAFEFF 50%, #DDE5E9 50%)", zIndex: -2 }} >
                <Grid container >
                    <Grid size={12} p={{ xl: 3, lg: 1 }} >
                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                            <Box component={"img"} src={TIcon?.src} sx={{ height: { xl: "70px", lg: "45px" } }} />
                            <Typography sx={{ color: "black", fontSize: { xl: "25px", lg: "20px" }, fontWeight: "bold", position: "absolute", top: { xl: "7%", lg: "5.5%" }, left: { xl: "3.5%", lg: "3%" } }}>ourism</Typography>
                            <Grid width={{ xl: "500px", lg: "300px" }} display={"flex"} justifyContent={"space-around"} >
                                <Button sx={{ color: "Black", fontWeight: "bold", textTransform: "none" }} onClick={() => { router.push("/home") }}>Home</Button>

                                <Button sx={{ color: "Black", fontWeight: "bold", textDecoration: 'underline', textTransform: "none" }} >Contact us</Button>

                                <Button sx={{ color: "Black", fontWeight: "bold", textTransform: "none" }} onClick={() => { router.push("/about") }}>About us</Button>
                            </Grid>
                        </Stack>
                    </Grid>

                    <Grid size={12} display={"flex"} justifyContent={'center'}>
                        <Typography sx={{ fontWeight: "bold", fontSize: { xl: "35px", lg: "20px" } }}>Contact Us</Typography>
                    </Grid>


                    <Grid container justifyContent={"center"}>
                        <Grid size={9}>
                            <img src={BgImage?.src} style={{ position: "absolute", height: "75%", width: "75%", zIndex: -1 }} />
                            <Grid container >
                                <Grid size={6} height={"57vh"} p={{ lg: 5, xl: 10 }}  >
                                    <Stack display={"flex"} direction={"column"} spacing={{ xl: 12, lg: 7 }} >
                                        <Typography sx={{ textAlign: "center", fontSize: { xl: "30px", lg: "20px" }, fontWeight: "bold" }} >Get in Touch</Typography>
                                        <Typography sx={{ fontSize: { xl: "18px", lg: "16px" } }}>We’d love to hear from you! Whether you have questions, need assistance, or want to share your travel experiences, our team is here to help. Your feedback is valuable to us as we continue to improve and enhance your journey with Tourism</Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={6} height={"57vh"} pr={{ lg: 5, xl: 10 }} pt={{ lg: 5, xl: 10 }}  >
                                    <form onSubmit={(e: any) => { e.preventDefault(), handleUserContact() }}>
                                        <Grid container spacing={{ lg: 1, xl: 7.3 }} >
                                            <Grid size={6} >
                                                <Typography fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Name</Typography>
                                                <TextField required size="small" sx={{ bgcolor: "#FFFFFF80" }} placeholder="Enter your name..." fullWidth
                                                    onChange={(e: any) => { handleFormChange(e) }} name="UserName" value={formData?.UserName}></TextField>
                                            </Grid>
                                            <Grid size={6} >
                                                <Typography fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Email Address</Typography>
                                                <TextField required type="email" size="small" sx={{ bgcolor: "#FFFFFF80" }} placeholder="Enter your email..." fullWidth
                                                    onChange={(e: any) => { handleFormChange(e) }} name="EmailID" value={formData?.EmailID}></TextField>
                                            </Grid>
                                            <Grid size={6} >
                                                <Typography fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Subject</Typography>
                                                <TextField required size="small" sx={{ bgcolor: "#FFFFFF80" }} placeholder="Enter your subject..." fullWidth
                                                    onChange={(e: any) => { handleFormChange(e) }} name="Subject" value={formData?.Subject}></TextField>
                                            </Grid>
                                            <Grid size={6} >
                                                <Typography fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Country</Typography>
                                                <TextField required size="small" sx={{ bgcolor: "#FFFFFF80" }} placeholder="Enter your country..." fullWidth
                                                    onChange={(e: any) => { handleFormChange(e) }} name="Country" value={formData?.Country}></TextField>
                                            </Grid>
                                            <Grid size={12} >
                                                <Typography fontWeight={"bold"} fontSize={{ xl: "16px", lg: "14px" }}>Message</Typography>
                                                <TextareaAutosize required style={{ backgroundColor: "#FFFFFF80", borderRadius: "4px", width: "100%" }} minRows={6} maxRows={6} placeholder="Enter your message..." onChange={(e: any) => { handleFormChange(e) }} name="Message" value={formData?.Message} >

                                                </TextareaAutosize>
                                            </Grid>
                                            <Grid size={12} textAlign={"center"} >
                                                <Button type="submit" variant="outlined" sx={{ bgcolor: "#FAC759", color: "black", textTransform: "none" }}><Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "14px" }, mt: { xl: 0, lg: 0.4 } }}>Send Message</Typography></Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid size={12}   >
                                    <Typography sx={{ color: "white", fontWeight: "bold", pl: { lg: 5, xl: 10 }, fontSize: { xl: "16px", lg: "14px" } }}>Contact Info</Typography>
                                    <Grid container height={"12vh"} width={"100%"} alignItems={"center"}>
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
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={addContactSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setAddContactSuccessMessage(false)}>
                <Alert onClose={() => setAddContactSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Send Message Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={addContactErrorMessage}
                autoHideDuration={5000}
                onClose={() => setAddContactErrorMessage(false)}>
                <Alert onClose={() => setAddContactErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Something went wrong...
                </Alert>
            </Snackbar>
        </>
    )
}