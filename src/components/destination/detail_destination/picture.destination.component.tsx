import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Fab, Grid, Snackbar, Stack, Typography } from "@mui/material";
import Beach from "../../../../public/beach-chair.jpg"
import Tree from "../../../../public/trees-travel-ocean-pool-night.jpg"
import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import RegistrationForm from "../../login_registration/registration.component";
import LoginForm from "../../login_registration/login.component";
import dynamic from "next/dynamic";
import router from "next/router";
import LoadingAnimation from "../../../../public/loading/loading.animation.json"
import PictureApi from '@/api/picture.api';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Head from "next/head";

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const pictureApi = new PictureApi();

export default function DestinationPicture({ InputData, InputFunction }: any) {

    const [addPictureEnable, setAddPictureEnable] = useState(false)
    const [addPictureData, setAddPictureData] = useState([]);
    const [picturesData, setPicturesData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false)
    const [registrationFormEnable, setRegistrationFormEnable] = useState(false)
    const [loginFormEnable, setLoginFormEnable] = useState(false)
    const [selectPicture, setSelectPicture] = useState<any>()
    const [deletePictureEnable, setDeletePictureEnable] = useState(false)
    const [confirmDeleteEnable, setConfirmDeleteEnable] = useState(false)
    const [pictureUploadSuccessMessage, setPictureUploadSuccessMessage] = useState(false)
    const [commonErrorMessage, setCommonErrorMessage] = useState(false)
    const [pictureDeleteSuccessMessage, setPictureDeleteSuccessMessage] = useState(false)
    const [coverImageUnableDeleteMessage, setcoverImageUnableMessage] = useState(false)
    const [pictureUploadDuplicateMessage, setPictureuploadDuplicateMessage] = useState(false)

    const handleAddPicture = () => {

        const user = localStorage.getItem("AdminName")

        if (!user) {
            setLoginFormEnable(true)
        }
        else {
            setAddPictureEnable(true)
        }

    }

    const handlePicturesUpload = async () => {

        let destinationID: any = router?.query?.destinationid || localStorage?.getItem("DestinationID")

        let createdBy: any = localStorage?.getItem("Admin")

        const formData = new FormData();

        formData.append("DestinationID", destinationID);
        formData.append("CreatedBy", createdBy);

        [...addPictureData].forEach((file: any) => {
            formData.append("Image", file);
        });

        let createPicture: any = await pictureApi?.createPicture(formData);

        if (createPicture?.status === 200) {
            setPictureUploadSuccessMessage(true)
            setIsLoading(true)
            setAddPictureEnable(false)
            setAddPictureData([])
            InputFunction?.ReadPicture()
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)

        }
        else if (createPicture?.status === 409) {
            setPictureuploadDuplicateMessage(true)
        }
        else if (createPicture?.status === undefined) {
            setCommonErrorMessage(true)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        setPicturesData(InputData?.PicturesData ? InputData?.PicturesData : [])

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [InputData])

    const loadingAnimation = {
        loop: true,
        autoplay: true,
        animationData: LoadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        }
    }

    const handleDeletePicture = async () => {
        setIsLoading(true)

        let coverPictureID = picturesData[0]?.ImageID

        let request = selectPicture?.ImageID

        if (request === coverPictureID) {
            setConfirmDeleteEnable(false)
            setIsLoading(false)
            setcoverImageUnableMessage(true)
        }
        else {

            const removePicture: any = await pictureApi?.removePicture(request)

            if (removePicture?.status === 200) {
                setPictureDeleteSuccessMessage(true)
                setSelectPicture({})
                InputFunction?.ReadPicture()
                setConfirmDeleteEnable(false)
                setIsLoading(false)
            }
            else if (removePicture?.status === undefined) {
                setCommonErrorMessage(true)
            }
        }
    }

    return (
        <>

            <Head>
                <title>Tourism - Pictures</title>
            </Head>

            {isLoading ? <><Box mt={{ xl: 20, lg: 5 }}> <Lottie options={loadingAnimation} height={300} width={300} /></Box></> : <>
                <Grid container p={{ xl: 2.5, lg: 1.5 }} justifyContent={"center"} >
                    <Grid size={11}>
                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"} >
                            <Typography sx={{ display: "inline-block", fontSize: { xl: "30px", lg: "15px" }, fontWeight: 'bold' }} >{InputData?.DestinationData?.DestinationName}, {InputData?.DestinationData?.Location[0]?.State}, {InputData?.DestinationData?.Location[0]?.Country} </Typography>
                            {
                                deletePictureEnable ? <><Fab size="small" sx={{ bgcolor: 'red', color: "white", fontWeight: "bold", borderRadius: "50%", '&:hover': { color: "red", bgcolor: "whitesmoke" }, cursor: "pointer" }}
                                    onClick={(e: any) => { e.preventDefault(); setConfirmDeleteEnable(true) }} ><DeleteIcon sx={{ fontSize: "25px" }} /> </Fab> </>
                                    :

                                    <> <Fab size="small" sx={{ bgcolor: '#6DA7D0', color: "white", fontWeight: "bold", borderRadius: "50%", '&:hover': { color: "#6DA7D0", bgcolor: "whitesmoke" } }}
                                        onClick={() => { handleAddPicture() }} ><AddIcon sx={{ fontSize: "30px", fontWeight: "bold" }} /> </Fab></>
                            }

                        </Stack>
                    </Grid>
                    <Grid size={{ xl: 11, lg: 11.5 }} maxHeight={{ xl: "57vh", lg: "52vh" }} overflow={"scroll"} >
                        {picturesData?.map((data: any, index: any) => (
                            <Box sx={{ p: 0.5, display: "inline-block" }} tabIndex={0}
                                onClick={() => { setSelectPicture({ ImageID: data?.ImageID, index }), setDeletePictureEnable(true) }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setSelectPicture({ ImageID: data?.ImageID })
                                        setDeletePictureEnable(false);
                                    }, 200)
                                }} >
                                <Box
                                    component={"img"}
                                    src={data?.Image}
                                    alt="Image"
                                    sx={{
                                        width: "auto",
                                        height: "auto",
                                        maxHeight: { xl: "270px", lg: "240px" },
                                        maxWidth: { xl: "397px", lg: "360px" },
                                        objectFit: "cover",
                                        border: selectPicture?.index === index ? "5px solid red" : "none",
                                    }}
                                ></Box>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </>}

            {addPictureEnable && <>

                <Dialog open={true}>
                    <DialogTitle>
                        <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                            <Grid >
                                <Typography sx={{ textAlign: "center", fontWeight: 'bold', fontSize: { xl: "25px", lg: "20px" }, pl: { xl: 3, lg: 2 } }}>Add Picture</Typography>
                            </Grid>
                            <Grid >
                                <Button sx={{ p: 0, m: 0 }} onClick={() => { setAddPictureEnable(false), setAddPictureData([]) }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                            </Grid>
                        </Stack>

                    </DialogTitle>
                    <DialogContent>

                        <form onSubmit={(e: any) => { e.preventDefault(); handlePicturesUpload() }}>
                            <Box p={2}>
                                <MuiFileInput size="medium"
                                    required
                                    multiple
                                    value={addPictureData}
                                    onChange={(e: any) => { setAddPictureData(e) }}
                                    placeholder="Select image from folder or file"
                                    sx={{
                                        width: { xl: "500px", lg: "400px" },
                                        height: { xl: "300px", lg: "200px" },
                                        border: "5px dashed gray",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        cursor: "pointer",

                                        "& input": {
                                            height: "100%",
                                            width: "100%",
                                            cursor: "pointer",
                                        },
                                    }}
                                    InputProps={{
                                        sx: {
                                            border: "none", outline: "none", fontSize: "20px", color: "gray", "&.MuiOutlinedInput-root": {
                                                "& fieldset": { border: "none" }, cursor: "pointer", textAlign: "center", justifyContent: "center", alignItems: 'center', pl: 6.5
                                            }
                                        },
                                    }}
                                />
                            </Box>
                            <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Button type="submit" variant="outlined" sx={{ bgcolor: "#84D06D", color: "black", textTransform: "none", fontWeight: "bold" }}  >Upload</Button>
                            </Grid>
                        </form>
                    </DialogContent>
                </Dialog>
            </>}

            {
                confirmDeleteEnable && <>
                    <Dialog open={true} maxWidth={'sm'}>
                        <DialogTitle>
                            <Typography fontWeight={"bold"} fontSize={"20px"}>Delete Picture</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete this picture?
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
                                    onClick={() => { setSelectPicture({}), handleDeletePicture() }}
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
                                    onClick={() => { setSelectPicture({}), setConfirmDeleteEnable(false) }}
                                >
                                    No
                                </Button>
                            </Stack>
                        </DialogContent>
                    </Dialog>
                </>
            }

            {registrationFormEnable && <RegistrationForm InputFunction={{ disableForm: () => { setRegistrationFormEnable(false) }, loginForm: () => { setRegistrationFormEnable(false), setLoginFormEnable(true) } }} />}

            {loginFormEnable && <LoginForm InputFunction={{
                disableForm: () => { setLoginFormEnable(false) },
                loginFormSuccess: () => { setLoginFormEnable(false) },
                registrationForm: () => { setLoginFormEnable(false), setRegistrationFormEnable(true) }
            }} />}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={pictureUploadSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setPictureUploadSuccessMessage(false)}>
                <Alert onClose={() => setPictureUploadSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Picture Add Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={commonErrorMessage}
                autoHideDuration={5000}
                onClose={() => setCommonErrorMessage(false)}>
                <Alert onClose={() => setCommonErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Something went wrong...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={pictureDeleteSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setPictureDeleteSuccessMessage(false)}>
                <Alert onClose={() => setPictureDeleteSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Picture Delete Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={coverImageUnableDeleteMessage}
                autoHideDuration={5000}
                onClose={() => setcoverImageUnableMessage(false)}>
                <Alert onClose={() => setcoverImageUnableMessage(false)} severity="warning" sx={{ width: '100%' }}>
                    Unable to delete the cover picture...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={pictureUploadDuplicateMessage}
                autoHideDuration={5000}
                onClose={() => setPictureuploadDuplicateMessage(false)}>
                <Alert onClose={() => setPictureuploadDuplicateMessage(false)} severity="warning" sx={{ width: '100%' }}>
                    Picture Already Exist...
                </Alert>
            </Snackbar>

        </>
    )

}