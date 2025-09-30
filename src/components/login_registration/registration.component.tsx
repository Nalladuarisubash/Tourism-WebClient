import { Dialog, DialogContent, Grid, Button, TextField, Typography, Box, Snackbar, Alert } from "@mui/material";
import RegImage from "../../../public/registratio-image.jpg";
import { useState } from "react";
import OtpInput from "react-otp-input";
import EmailBox from "../../../public/emailbox.png";
import AuthenticationApi from "../../api/login_registration.api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const authenticationApi = new AuthenticationApi();

export default function RegistrationForm({ InputFunction }: any) {

    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false)
    const [formData, setFormData] = useState({
        "AdminName": "",
        "EmailID": "",
        "Country": "",
        "ContactNumber": "",
        "Password": "",
        "ConfirmPassword": ""
    })
    const [emailVerification, setEmailVerification] = useState(false)
    const [otpCode, setOtpCode] = useState<any>("")
    const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState(false)
    const [registrationDuplicateMessage, setRegistrationDuplicateMessage] = useState(false)
    const [registrationErrorMessage, setRegistrationErrorMessage] = useState(false)
    const [registrationFormNotMatchMessage, setRegistrationFormNotMatchMessage] = useState(false)

    const handleChange = (e: any) => {
        setFormData((prevState: any) => {
            return {
                ...prevState,
                [e?.target.name]: e?.target?.value,
            };
        })
    }

    const handleChangeOTP = (value: any) => {
        if (/^\d*$/.test(value)) {
            setOtpCode(value);
        }
    }

    const handleAddAdmin = async () => {
        if (otpCode !== "") {

            let request = {
                "data": {
                    "AdminName": formData?.AdminName,
                    "EmailID": formData?.EmailID,
                    "Country": formData?.Country,
                    "ContactNumber": formData?.ContactNumber,
                    "Password": formData?.Password,
                    "ConfirmPassword": formData?.ConfirmPassword,
                    "OTP": parseInt(otpCode),
                    "CreatedBy": formData?.AdminName
                }
            }

            const createAdmin: any = await authenticationApi?.createAdmin(request)

            if (createAdmin?.status === 200) {
                setRegistrationSuccessMessage(true)
                setTimeout(() => {
                    setEmailVerification(false)
                    InputFunction?.loginForm()
                }, 5000)
            }
            else if (createAdmin?.status === 400) {
                setRegistrationSuccessMessage(true)
            }

        }
        else {

            let request = {
                "data": {
                    "AdminName": formData?.AdminName,
                    "EmailID": formData?.EmailID,
                    "Country": formData?.Country,
                    "ContactNumber": formData?.ContactNumber,
                    "Password": formData?.Password,
                    "ConfirmPassword": formData?.ConfirmPassword
                }
            }

            const createAdmin: any = await authenticationApi?.createAdmin(request)

            if (createAdmin?.status === 200) {
                setEmailVerification(true)
            }
            else if (createAdmin?.status === 409) {
                setRegistrationDuplicateMessage(true)
            }
            else {
                setRegistrationFormNotMatchMessage(true)
            }
        }

    }

    return (
        <>
            {
                emailVerification === false ?
                    <Dialog maxWidth={"md"} fullWidth open={true}>
                        <DialogContent>
                            <Grid container display={"flex"} justifyContent={"space-between"}>
                                <Grid size={11.5} sx={{ position: "absolute" }} display={"flex"} justifyContent={"right"}  >
                                    <Button sx={{ p: 0, m: 0 }} onClick={() => { InputFunction?.disableForm() }}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                                </Grid>

                                <Grid size={6}  >
                                    <form onSubmit={(e: any) => { e.preventDefault(), handleAddAdmin() }}>

                                        <Grid container display={"flex"} justifyContent={"center"} spacing={1.5}>
                                            <Grid size={10.5} display={"flex"} justifyContent={"center"}  >
                                                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Registration</Typography>
                                            </Grid>
                                            <Grid size={10.5}  >
                                                <Typography>Full Name</Typography>
                                                <TextField required size="small" sx={{ width: "350px" }} placeholder="Enter your name..."
                                                    value={formData?.AdminName} name={"AdminName"} onChange={(e: any) => { handleChange(e) }} > </TextField>
                                            </Grid>
                                            <Grid size={10.5}>
                                                <Typography>Email Address</Typography>
                                                <TextField required type="email" size="small" sx={{ width: "350px" }} placeholder="Enter your email..."
                                                    value={formData?.EmailID} name={"EmailID"} onChange={(e: any) => { handleChange(e) }} > </TextField>
                                            </Grid>
                                            <Grid size={10.5}>
                                                <Typography>Country</Typography>
                                                <TextField required size="small" sx={{ width: "350px" }} placeholder="Entery your country..."
                                                    value={formData?.Country} name={"Country"} onChange={(e: any) => { handleChange(e) }} > </TextField>
                                            </Grid>
                                            <Grid size={10.5}>
                                                <Typography>Contact Number</Typography>
                                                <TextField required size="small" sx={{ width: "350px" }} placeholder="Entery contact number..."
                                                    value={formData?.ContactNumber} name={"ContactNumber"} onChange={(e: any) => { handleChange(e) }} > </TextField>
                                            </Grid>
                                            <Grid size={10.5}>
                                                <Typography>Password</Typography>
                                                <TextField required size="small" sx={{ width: "350px" }} placeholder="Enter Password..."
                                                    value={formData?.Password} name={"Password"} onChange={(e: any) => { handleChange(e) }}
                                                    type={passwordVisibility ? "text" : "password"}
                                                    InputProps={{
                                                        endAdornment: passwordVisibility ? < VisibilityIcon /> : <VisibilityOffIcon onClick={() => { setPasswordVisibility(true), setTimeout(() => { setPasswordVisibility(false) }, 1500) }} />
                                                    }} inputProps={{ minLength: 8 }}> </TextField>
                                            </Grid>
                                            <Grid size={10.5}>
                                                <Typography>Confirm Password</Typography>
                                                <TextField required size="small" sx={{ width: "350px" }} placeholder="Enter Confirm Password..."
                                                    value={formData?.ConfirmPassword} name={"ConfirmPassword"} onChange={(e: any) => { handleChange(e) }}
                                                    type={confirmPasswordVisibility ? "text" : "password"}
                                                    InputProps={{
                                                        endAdornment: confirmPasswordVisibility ? < VisibilityIcon /> : <VisibilityOffIcon onClick={() => { setConfirmPasswordVisibility(true), setTimeout(() => { setConfirmPasswordVisibility(false) }, 1500) }} />
                                                    }} inputProps={{ minLength: 8 }}> </TextField>
                                            </Grid>
                                            <Grid size={10.5} display={"flex"} justifyContent={"center"}>
                                                <Typography sx={{ fontSize: "13px", fontWeight: "bold", mt: 1, cursor: "pointer" }}
                                                    onClick={() => { InputFunction?.loginForm() }}> Already have an account? <Typography sx={{ textDecoration: "underline", display: "inline-block", fontSize: "13px", fontWeight: "bold", cursor: "pointer",color:"blue" }}>Log in</Typography></Typography>

                                            </Grid>
                                            <Button type="submit" variant="outlined" size={"small"} sx={{ pt: 1, bgcolor: "#84D06D", color: "black", fontWeight: "bold", width: "100px" }}>Submit</Button>
                                        </Grid>
                                    </form>

                                </Grid>
                                <Grid size={6}>
                                    <img src={RegImage.src} height={"550px"} width={"450px"}></img>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    :
                    <Dialog maxWidth={"md"} fullWidth open={true}>
                        <DialogContent>
                            <Box sx={{ position: "absolute", width: "96%" }} display={"flex"} justifyContent={"right"}  >
                                <Button sx={{ p: 0, m: 0 }} onClick={() => { InputFunction.disableForm(), setEmailVerification(false) }}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                            </Box>
                            <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Grid size={6}  >
                                    <form onSubmit={(e: any) => { e.preventDefault(), handleAddAdmin() }}>
                                        <Grid container display={"flex"} justifyContent={"center"} spacing={2}>
                                            <Grid size={10.5} display={"flex"} justifyContent={"center"}>
                                                <img src={EmailBox.src} height={"200px"}></img>
                                            </Grid>
                                            <Grid size={8} >
                                                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>Verify your email</Typography>
                                            </Grid>

                                            <Grid size={8}>
                                                <Typography>Please enter the 4 digit code sent to</Typography>
                                                <Typography>{formData?.EmailID}</Typography>
                                            </Grid>

                                            <Grid size={8}>
                                                <OtpInput
                                                    value={otpCode}
                                                    onChange={handleChangeOTP}
                                                    numInputs={4}
                                                    renderSeparator={<span>-</span>}
                                                    renderInput={(props) => (
                                                        <input {...props} style={{
                                                            width: "50px",
                                                            height: "50px",
                                                            fontSize: "20px",
                                                            textAlign: "center",
                                                            borderRadius: "8px",
                                                            border: "1px solid #ccc",
                                                            outline: "none",
                                                        }} />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid size={12} display={"flex"} justifyContent={"center"}>
                                                <Typography sx={{ fontSize: "13px", fontWeight: "bold", mt: 1, cursor: "pointer" }}
                                                    onClick={() => { handleAddAdmin() }}>Resend Code</Typography>
                                            </Grid>

                                            <Grid size={12} display={"flex"} justifyContent={"center"}>
                                                <Button type="submit" variant="outlined" size={"small"} sx={{ pt: 1, bgcolor: "#84D06D", color: "black", fontWeight: "bold", width: "100px", textTransform: "none" }}>Confirm</Button>

                                            </Grid>

                                            <Grid size={10.5} display={"flex"} justifyContent={"center"}>
                                                <Typography sx={{ fontSize: "13px", fontWeight: "bold", mt: 1, cursor: "pointer" }}
                                                    onClick={() => { setEmailVerification(false) }}>Change Email?</Typography>

                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid size={6}>
                                    <img src={RegImage.src} height={"550px"} width={"450px"}></img>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
            }

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={registrationSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setRegistrationSuccessMessage(false)}>
                <Alert onClose={() => setRegistrationSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Admin Registration Successfully
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={registrationErrorMessage}
                autoHideDuration={5000}
                onClose={() => setRegistrationErrorMessage(false)}>
                <Alert onClose={() => setRegistrationErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Something went wrong
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={registrationDuplicateMessage}
                autoHideDuration={5000}
                onClose={() => setRegistrationDuplicateMessage(false)}>
                <Alert onClose={() => setRegistrationDuplicateMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Name or Email ID is already exist
                </Alert>
            </Snackbar>
             <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={registrationFormNotMatchMessage}
                autoHideDuration={5000}
                onClose={() => setRegistrationFormNotMatchMessage(false)}>
                <Alert onClose={() => setRegistrationFormNotMatchMessage(false)} severity="warning" sx={{ width: '100%' }}>
                    Password and Confirm Password do not match
                </Alert>
            </Snackbar>
        </>
    )
}