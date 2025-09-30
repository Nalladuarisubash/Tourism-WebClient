import { Dialog, DialogContent, Grid, Button, TextField, Typography, Box, Snackbar, Alert } from "@mui/material";
import RegImage from "../../../public/registratio-image.jpg"
import { useState } from "react";
import LoginApi from "../../api/login_registration.api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const loginApi = new LoginApi();

export default function LoginForm({ InputFunction }: any) {

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [formData, setFormData] = useState({
        "EmailID": "",
        "Password": ""
    })
    const [loginSuccessMessage, setLoginSuccessMessage] = useState(false)
    const [loginInvalidDataMessage, setLoginInvalidDataMessage] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState(false)

    const handleChange = (e: any) => {
        setFormData((prevState: any) => {
            return {
                ...prevState,
                [e?.target?.name]: e?.target?.value,
            };
        })
    }

    const handleLogin = async () => {
        let request = {
            "filter": {
                "EmailID": formData?.EmailID,
                "Password": formData?.Password
            }
        }

        const adminLogin: any = await loginApi?.loginAdmin(request)

        if (adminLogin?.status === 200) {
            localStorage?.setItem("AdminName", adminLogin?.data[0]?.AdminName)
            localStorage?.setItem("AdminID", adminLogin?.data[0]?.AdminID)
            localStorage?.setItem("AdminType", adminLogin?.data[0]?.AdminType)
            setLoginSuccessMessage(true)
            setTimeout(() => {
                InputFunction?.loginFormSuccess()
            }, 3000)
        }
        else if (adminLogin?.status === 404) {
            setLoginInvalidDataMessage(true)
        }
        else {
            setLoginErrorMessage(true)
        }
    }

    return (
        <>
            <Dialog maxWidth={"md"} fullWidth open={true}>
                <DialogContent>
                    <Box sx={{ position: "absolute", width: "96%" }} display={"flex"} justifyContent={"right"}  >
                        <Button sx={{ p: 0, m: 0 }} onClick={() => { InputFunction?.disableForm() }}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                    </Box>
                    <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

                        <Grid size={6}  >
                            <form onSubmit={(e: any) => { e.preventDefault(), handleLogin() }}>
                                <Grid container display={"flex"} justifyContent={"center"} spacing={4}>
                                    <Grid size={10.5} display={"flex"} justifyContent={"center"}  >
                                        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Log In to Your Account</Typography>
                                    </Grid>

                                    <Grid size={10.5}>
                                        <Typography>Email Address</Typography>
                                        <TextField required size="small" sx={{ width: "350px" }} placeholder="Enter your email..."
                                            value={formData?.EmailID} name="EmailID" onChange={(e: any) => { handleChange(e) }}> </TextField>
                                    </Grid>

                                    <Grid size={10.5}>
                                        <Typography>Password</Typography>
                                        <TextField required size="small" sx={{ width: "350px" }} placeholder="Enter your Password..."
                                            type={passwordVisibility ? "text" : "password"} value={formData?.Password} name="Password" onChange={(e: any) => { handleChange(e) }}
                                            InputProps={{
                                                endAdornment: passwordVisibility ? < VisibilityIcon /> : <VisibilityOffIcon onClick={() => { setPasswordVisibility(true), setTimeout(() => { setPasswordVisibility(false) }, 1000) }} />
                                            }}
                                            inputProps={{
                                                minLength: 8
                                            }}> </TextField>
                                    </Grid>

                                    <Grid size={10.5} display={"flex"} justifyContent={"center"}>
                                        <Typography sx={{ fontSize: "13px", fontWeight: "bold", mt: 1 }}
                                            onClick={() => { InputFunction?.registrationForm() }}>Don't have an account? <Typography sx={{ textDecoration: "underline", display: "inline-block", fontSize: "13px", fontWeight: "bold", cursor: "pointer",color:"blue" }}>Register now</Typography></Typography>

                                    </Grid>
                                    <Button type="submit" variant="outlined" size={"small"} sx={{ pt: 1, bgcolor: "#84D06D", color: "black", fontWeight: "bold", width: "100px", textTransform: "none" }}>Login</Button>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid size={6}>
                            <Box component={"img"} src={RegImage.src} height={{ xl: "550px", lg: "450px" }} width={{ xl: "450px", lg: "350p" }}></Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={loginSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setLoginSuccessMessage(false)}>
                <Alert onClose={() => setLoginSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Login Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={loginInvalidDataMessage}
                autoHideDuration={5000}
                onClose={() => setLoginInvalidDataMessage(false)}>
                <Alert onClose={() => setLoginInvalidDataMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Invalid Email Address or Password
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={loginErrorMessage}
                autoHideDuration={5000}
                onClose={() => setLoginErrorMessage(false)}>
                <Alert onClose={() => setLoginErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Something went wrong...
                </Alert>
            </Snackbar>
        </>
    )
}