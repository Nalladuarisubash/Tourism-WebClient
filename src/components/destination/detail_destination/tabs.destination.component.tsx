import { Alert, Box, Button, Card, Dialog, DialogContent, Grid, Snackbar, Stack, Typography } from "@mui/material";
import TIcon from "../../../../public/Ticon.svg"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import { useEffect, useState } from "react";
import DestinationDetails from "./details.destination.component";
import DestinationPicture from "./picture.destination.component";
import DestinationFeedback from "./feedback.destination.component";
import router from "next/router";
import AddEditDestination from "../add_edit_destination/add_edit.destination.component";
import RegistrationForm from "../../login_registration/registration.component";
import LoginForm from "../../login_registration/login.component";
import AdventureApi from "@/api/adventure.api";
import ExpenseApi from "@/api/expese.api";
import LocationApi from "@/api/location.api";
import TransportApi from "@/api/transport.api";
import DestinationApi from "@/api/destination.api";
import PictureApi from '@/api/picture.api';
import FeedbackApi from "@/api/feedback.api";
import { MuiFileInput } from "mui-file-input";
import { keyframes } from "@emotion/react";

const adventureApi = new AdventureApi()
const expenseApi = new ExpenseApi()
const locationApi = new LocationApi()
const transportApi = new TransportApi()
const destinationApi = new DestinationApi()
const pictureApi = new PictureApi();
const feedbackApi = new FeedbackApi();

export default function DestinationTabs() {

    const [tab, setTab] = useState<any>(0);
    const [addEditDestinationFormEnable, setAddEditDestinationFormEnable] = useState(false)
    const [registrationFormEnable, setRegistrationFormEnable] = useState(false)
    const [loginFormEnable, setLoginFormEnable] = useState(false)

    const [adventureData, setAdventureData] = useState<any>();
    const [destinationData, setDestinationData] = useState<any>();
    const [locationData, setLocationData] = useState<any>();
    const [expenseData, setExpenseData] = useState<any>();
    const [transportData, setTransportData] = useState<any>();
    const [picturesData, setPicturesData] = useState<any>();
    const [feedbackData, setFeedbackData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false)
    const [editCoverPictureEnable, setEditCoverPictureEnable] = useState(false)
    const [editPictureData, setEditPictureData] = useState([]);
    const [addDestinationStatusCode, setAddDestinationStatusCode] = useState([])
    const [pictureEditSuccessMessage, setPictureEditSuccessMessage] = useState(false);

    const tabs: any = [
        {
            tabIndex: 1,
            tabtitle: "Detail",
            tabComponent: <DestinationDetails InputData={{
                AdventureData: adventureData, DestinationData: destinationData, LocationData: locationData,
                ExpenseData: expenseData, TransportData: transportData
            }} />
        },
        {
            tabIndex: 2,
            tabtitle: "Picture",
            tabComponent: <DestinationPicture InputData={{ PicturesData: picturesData, DestinationData: destinationData }}
                InputFunction={{ ReadPicture: () => { handleReadPicture() } }} />
        },
        {
            tabIndex: 3,
            tabtitle: "Feedback",
            tabComponent: <DestinationFeedback InputData={{ FeedbackData: feedbackData, DestinationData: destinationData }}
                InputFunction={{ ReadFeedback: () => { handleReadFeedback() } }} />
        }
    ]

    const scrollImage = keyframes`0% {transform: translateY(0%);} 50% { transform: translateY(-70%);}100% { transform: translateY(0%); }`;

    const handleReadAdventure = async () => {

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readAdventure: any = await adventureApi?.readAdventure(request)

        if (readAdventure?.status === 200) {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, AdvendureStatus: readAdventure?.status } })
            setAdventureData(readAdventure?.data[0])
        }
        else if (readAdventure?.status === 404) {
            setAdventureData([])
        }
        else {
        }
    }

    const handleReadExpense = async () => {

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readExpense: any = await expenseApi?.readExpense(request)

        if (readExpense?.status === 200) {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, ExpenseStatus: readExpense?.status } })
            setExpenseData(readExpense?.data[0])
        }
        else if (readExpense?.status === 404) {
            setExpenseData([])
        }
        else {
        }

    }

    const handleReadLocation = async () => {

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readLocation: any = await locationApi?.readLocation(request)

        setAddDestinationStatusCode((preState: any) => { return { ...preState, LocationStatus: readLocation?.status } })

        if (readLocation?.status === 200) {

            setLocationData(readLocation?.data[0])
        }
        else if (readLocation?.status === 404) {
            setLocationData([])
        }
        else {
        }

    }

    const handleReadTransport = async () => {

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readTransport: any = await transportApi?.readTransport(request);

        if (readTransport?.status === 200) {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, TransportStatus: readTransport?.status } })
            setTransportData(readTransport?.data[0])
        }
        else if (readTransport?.status === 404) {
            setTransportData([])
        }
        else {
        }

    }

    const handleReadDestination = async () => {

        setIsLoading(true);

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readDestination: any = await destinationApi?.readOneDestination(request)

        if (readDestination?.status === 200) {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, TransportStatus: readDestination?.status } })
            setDestinationData(readDestination?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        else if (readDestination?.status === 404) {
            setDestinationData([])
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }

    }

    const handleReadPicture = async () => {

        setIsLoading(true)

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readPictures: any = await pictureApi?.readPicture(request)

        if (readPictures?.status === 200) {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, PictureStatus: readPictures?.status } })
            setPicturesData(readPictures?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
        else if (readPictures?.status === 404) {
            setPicturesData([])
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
    }

    const handleReadFeedback = async () => {

        setIsLoading(true)

        let request = { "DestinationID": router?.query?.destinationid || localStorage?.getItem("DestinationID") }

        const readFeedback: any = await feedbackApi?.readFeedback(request);

        if (readFeedback?.status === 200) {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, FeedbackStatus: readFeedback?.status } })
            setFeedbackData(readFeedback?.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
        else if (readFeedback?.status === 404) {
            setFeedbackData([])
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

        if (router?.query?.destinationid !== undefined || localStorage?.getItem("DestinationID") !== undefined) {
            handleReadAdventure();
            handleReadExpense();
            handleReadLocation();
            handleReadTransport();
            handleReadDestination();
            handleReadPicture();
            handleReadFeedback();
        }
        else {
            router.push("/home")
        }
    }, [])

    useEffect(() => {
        let TabIndex: any = localStorage.getItem("TabIndex") || 1

        setTab(parseInt(TabIndex))

    }, [tab]);

    const handleEditDestination = () => {

        const user = localStorage.getItem("AdminName")

        if (!user) {

            setLoginFormEnable(true)
        }
        else {
            setAddEditDestinationFormEnable(true)
        }
    }

    const handleEditPictureEnable = () => {

        const user = localStorage.getItem("AdminName")

        if (!user) {
            setLoginFormEnable(true)
        }
        else {
            setEditCoverPictureEnable(true)
        }

    }

    const handleEditPictures = async () => {

        let imageID: any = picturesData[0]?.ImageID

        let modifiedBy: any = localStorage?.getItem("AdminName")

        const formData = new FormData();

        formData.append("ImageID", imageID);
        formData.append("ModifiedBy", modifiedBy);

        [...editPictureData].forEach((file: any) => {
            formData.append("Image", file);
        });

        let createPicture: any = await pictureApi?.editPicture(formData)

        if (createPicture?.status === 200) {
            setEditPictureData([])
            handleReadDestination()
            handleReadPicture()
            setEditCoverPictureEnable(false)
            setPictureEditSuccessMessage(true)
        }
        else if (createPicture?.status === 409) {
            setEditCoverPictureEnable(false)
        }
    }

    return (
        <>
            <Box sx={{ height: "100vh", width: "100vw" }} >
                <Grid container height={"100%"}  >
                    <Grid size={12} height={"35%"} sx={{ overflow: "hidden", position: "relative" }}>

                        <Box
                            component="img"
                            src={destinationData?.Image?.[0]?.Image}
                            alt="Image"
                            sx={{ width: "100%", height: "auto", animation: `${scrollImage} 30s linear infinite`, }}
                        />

                        <Box component="img" src={TIcon?.src} sx={{ height: { xl: "70px", lg: "50px" }, color: "white", fontSize: "30px", fontWeight: "bold", position: "absolute", top: "1%", left: "1%" }} ></Box>
                        <Typography sx={{ color: "white", fontSize: "30px", fontWeight: "bold", position: "absolute", top: { xl: "12%", lg: "10%" }, left: { lg: "3.4%", xl: "3.2%" } }} >ourism</Typography>
                        <Grid sx={{ position: "absolute", top: "3.5%", right: "1%" }}>

                            <Button title="Home" onClick={() => { router.push("/home") }}> <HomeOutlinedIcon sx={{ color: "white", fontSize: "30px" }} /></Button>

                            <Button title="Explore" onClick={() => { router.push("/explore") }}> <TravelExploreOutlinedIcon sx={{ color: "white", fontSize: "30px" }} /></Button>

                            <Button title="Edit Destination" onClick={() => { handleEditDestination() }}> <svg version="1.1" height="25px" fontWeight="bold" width="25px" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path className="st0" d="M422.002,6.017C315.33,20.736,213.205,220.861,162.939,313.486c-12.641,23.297,9.422,35.406,22.422,13.125 c9.344-16.016,32.109-62.5,44.422-60.094c58.797,9.797,90.156-28.547,67.891-52.672c74.797,1.531,111.875-39.609,90.656-64.609 c22.313,7.063,55.078,6.031,83.766-9.609C533.33,106.22,529.627-8.827,422.002,6.017z"></path> <path className="st0" d="M409.189,207.048c-9.719,9.141-27.031,22.141-41.547,27.813v207.062c-0.016,4.609-1.781,8.531-4.781,11.563 c-3.031,3-6.953,4.766-11.547,4.781H65.361c-4.594-0.016-8.531-1.781-11.563-4.781c-3-3.031-4.766-6.953-4.781-11.563V155.986 c0.016-4.594,1.781-8.531,4.781-11.563c3.031-3,6.969-4.766,11.563-4.781h160.391c11.234-17.125,22.734-33.578,34.484-49.016 H65.361c-17.969-0.016-34.469,7.344-46.219,19.141c-11.781,11.75-19.156,28.25-19.141,46.219v285.937 c-0.016,17.969,7.359,34.469,19.141,46.234c11.75,11.781,28.25,19.156,46.219,19.141h285.953 c17.953,0.016,34.453-7.359,46.219-19.141c11.781-11.766,19.156-28.266,19.141-46.234V206.017 C416.674,206.017,414.002,202.517,409.189,207.048z"></path> </g> </g></svg></Button>

                            <Button title="Edit Cover Image" sx={{ pt: 1.5, fontWeight: "bold" }} onClick={() => { handleEditPictureEnable() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="m22.7 14.3l-1 1l-2-2l1-1c.1-.1.2-.2.4-.2c.1 0 .3.1.4.2l1.3 1.3c.1.2.1.5-.1.7M13 19.9V22h2.1l6.1-6.1l-2-2zm-1.79-4.07l-1.96-2.36L6.5 17h6.62l2.54-2.45l-1.7-2.26zM11 19.9v-.85l.05-.05H5V5h14v6.31l2-1.93V5a2 2 0 0 0-2-2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6z" /></svg>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid size={12} height={"65%"} sx={{ background: "linear-gradient(to bottom, #FAFEFF 50%, #DDE5E9 50%)" }}>
                        <Grid container width={"98%"} sx={{ position: "absolute", top: { xl: "31%", lg: "29%" }, left: "1%" }} >
                            {tabs.map((data: any) => (
                                <>
                                    <Grid pl={0.5}>
                                        <Button sx={{ bgcolor: tab === data?.tabIndex ? "#B8D9EC" : "white", transition: "0.3s", p: 0.5, pt: { xl: 0.8, lg: 0.7 }, color: "black", fontSize: { xl: "14px", lg: "12px" }, textTransform: "none" }} onClick={() => { setTab(data.tabIndex), localStorage.setItem("TabIndex", data.tabIndex) }}>{data.tabtitle}</Button>
                                    </Grid>
                                </>
                            ))}

                            <Grid size={12}>
                                {tabs.map((data: any) => (
                                    <>
                                        {tab === data?.tabIndex ? (
                                            data.tabComponent
                                        ) : ""}
                                    </>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            {addEditDestinationFormEnable && <AddEditDestination type="edit" InputData={{
                AdventureData: adventureData, DestinationData: destinationData, LocationData: locationData,
                ExpenseData: expenseData, TransportData: transportData, PicturesData: { coverImage: picturesData[0], additionalImage: picturesData?.[1] },
                FeedbackData: feedbackData?.Reviews[0]
            }} InputFunction={{ disableForm: () => { setAddEditDestinationFormEnable(false) }, readDestination: () => { handleReadDestination() }, readAdventure: () => { handleReadAdventure() }, readLocation: () => { handleReadLocation() }, readTransport: () => { handleReadTransport() }, readExpense: () => { handleReadExpense() }, readPicture: () => { handleReadPicture() }, readFeedback: () => { handleReadFeedback() } }} />}

            {registrationFormEnable && <RegistrationForm InputFunction={{ disableForm: () => { setRegistrationFormEnable(false) }, loginForm: () => { setRegistrationFormEnable(false), setLoginFormEnable(true) } }} />}

            {loginFormEnable && <LoginForm InputFunction={{
                loginFormSuccess: () => { setLoginFormEnable(false) },
                disableForm: () => { setLoginFormEnable(false) },
                registrationForm: () => { setLoginFormEnable(false), setRegistrationFormEnable(true) }
            }} />}

            {editCoverPictureEnable && <>

                <Dialog open={true}>
                    <DialogContent>
                        <form onSubmit={(e: any) => { e.preventDefault(); handleEditPictures() }}>

                            <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                <Grid >
                                    <Typography sx={{ textAlign: "center", fontWeight: 'bold', fontSize: { xl: "25px", lg: "20px" }, pl: { xl: 3, lg: 2 } }}>Edit Cover Picture</Typography>
                                </Grid>
                                <Grid >
                                    <Button sx={{ p: 0, m: 0 }} onClick={() => { setEditPictureData([]), setEditCoverPictureEnable(false) }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                                </Grid>
                            </Stack>

                            <Box p={3}>

                                <MuiFileInput size="medium"
                                    required
                                    multiple
                                    value={editPictureData}
                                    onChange={(e: any) => { setEditPictureData(e) }}
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
                                                "& fieldset": { border: "none" }, cursor: "pointer",
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

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={pictureEditSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setPictureEditSuccessMessage(false)}>
                <Alert onClose={() => setPictureEditSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Picture Edit Successfully...
                </Alert>
            </Snackbar>

        </>
    )
}
