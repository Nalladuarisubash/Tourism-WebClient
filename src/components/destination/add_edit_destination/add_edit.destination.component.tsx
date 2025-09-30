import { Alert, Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid, InputLabel, MenuItem, Rating, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import DestinationApi from "../../../api/destination.api";
import LocationApi from "../../../api/location.api";
import ExpenseApi from "../../../api/expese.api";
import AdventureApi from "../../../api/adventure.api";
import TransportApi from "../../../api/transport.api";
import PictureApi from "../../../api/picture.api";
import FeedbackApi from "../../../api/feedback.api";
import _ from "lodash";

const destinationApi = new DestinationApi();
const locationApi = new LocationApi();
const expenseApi = new ExpenseApi();
const adventureApi = new AdventureApi();
const transportApi = new TransportApi();
const pictureApi = new PictureApi();
const feedbackApi = new FeedbackApi();

export default function AddEditDestination({ InputData, InputFunction, type }: any) {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [coverImage, setCoverImage] = useState([]);
    const [additionalImage, setAdditionalImage] = useState([]);
    const [formData, setFormData] = useState({
        "DestinationName": InputData?.DestinationData?.DestinationName || "",
        "Description": InputData?.DestinationData?.Description || "",
        "Category": InputData?.DestinationData?.Category || "",
        "TimeToVisitStart": InputData?.DestinationData?.TimeToVisit?.split(" - ")[0] || "",
        "TimeToVisitEnd": InputData?.DestinationData?.TimeToVisit?.split(" - ")[1] || "",
        "EntryFee": InputData?.DestinationData?.EntryFee || "",
        "Boating": InputData?.AdventureData?.Boating || false,
        "RidingAndRacing": InputData?.AdventureData?.RidingAndRacing || false,
        "Swimming": InputData?.AdventureData?.Swimming || false,
        "WildlifeSafari": InputData?.AdventureData?.WildlifeSafari || false,
        "Surfing": InputData?.AdventureData?.Surfing || false,
        "Photography": InputData?.AdventureData?.Photography || false,
        "Trekking": InputData?.AdventureData?.Trekking || false,
        "CulturalTours": InputData?.AdventureData?.CulturalTours || false,
        "Camping": InputData?.AdventureData?.Camping || false,
        "Paragliding": InputData?.AdventureData?.Paragliding || false,
        "Country": InputData?.LocationData?.Country || "",
        "State": InputData?.LocationData?.State || "",
        "City": InputData?.LocationData?.City || "",
        "Latitude": InputData?.LocationData?.Latitude || "",
        "Longitude": InputData?.LocationData?.Longitude || "",
        "Flight": InputData?.TransportData?.Flight || false,
        "Ship": InputData?.TransportData?.Ship || false,
        "Train": InputData?.TransportData?.Train || false,
        "Bus": InputData?.TransportData?.Bus || false,
        "StayMinimum": InputData?.ExpenseData?.StayMinimum || "",
        "StayMaximum": InputData?.ExpenseData?.StayMaximum || "",
        "FoodMinimum": InputData?.ExpenseData?.FoodMinimum || "",
        "FoodMaximum": InputData?.ExpenseData?.FoodMaximum || "",
        "TravelMinimum": InputData?.ExpenseData?.TransportMinimum || "",
        "TravelMaximum": InputData?.ExpenseData?.TransportMaximum || "",
        "StarRating": InputData?.FeedbackData?.StarRating || "",
        "Review": InputData?.FeedbackData?.Review || "",
    })
    const [addDestinationStatusCode, setAddDestinationStatusCode] = useState<any>()
    const [editDestinationStatusCode, setEditDestinationStatusCode] = useState<any>()
    const [addDestinationSuccessMesssage, setAddDestinationSuccessMessage] = useState(false);
    const [addDestinationInfoMesssage, setAddDestinationInfoMessage] = useState(false);
    const [addDestinationDuplicateMessage, setAddDestinationDuplicateMessage] = useState(false);
    const [editDestinationSuccessMessage, setEditDestinationSuccessMessage] = useState(false);
    const [commonErrorMessage, setCommonErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (addDestinationStatusCode?.DestinationStatus === 200 && addDestinationStatusCode?.ExpenseStatus === 200 && addDestinationStatusCode?.FeedbackStatus === 200 && addDestinationStatusCode?.LocationStatus === 200 && addDestinationStatusCode?.AdventureStatus === 200 && addDestinationStatusCode?.TransportStatus === 200 && addDestinationStatusCode?.PictureStatus === 200) {
            setAddDestinationSuccessMessage(true)
            setTimeout(() => {
                setAddDestinationSuccessMessage(false)
                setAddDestinationInfoMessage(true)
                setTimeout(() => {
                    setIsLoading(false)
                    InputFunction?.disableForm()

                }, 3000)
            }, 3000)
        }

        if (addDestinationStatusCode !== undefined) {
            if (addDestinationStatusCode?.DestinationStatus !== 200 && addDestinationStatusCode?.ExpenseStatus !== 200 && addDestinationStatusCode?.FeedbackStatus !== 200 && addDestinationStatusCode?.LocationStatus !== 200 && addDestinationStatusCode?.AdventureStatus !== 200 && addDestinationStatusCode?.TransportStatus !== 200 && addDestinationStatusCode?.PictureStatus !== 200) {
                setCommonErrorMessage(true)
                setTimeout(() => {
                    setIsLoading(false)
                    setCommonErrorMessage(false)
                }, 3000)
            }
        }

    }, [addDestinationStatusCode])

    useEffect(() => {

        if (editDestinationStatusCode?.DestinationStatus === 200 || editDestinationStatusCode?.ExpenseStatus === 200 || editDestinationStatusCode?.FeedbackStatus === 200 || editDestinationStatusCode?.LocationStatus === 200 || editDestinationStatusCode?.AdventureStatus === 200 || editDestinationStatusCode?.TransportStatus === 200 || editDestinationStatusCode?.PictureStatus === 200) {
            setEditDestinationSuccessMessage(true)
            setTimeout(() => {
                setEditDestinationSuccessMessage(false)
                InputFunction?.disableForm()
                setAddDestinationInfoMessage(true)
            }, 3000)
        }

        if (editDestinationStatusCode !== undefined) {
            if (editDestinationStatusCode?.DestinationStatus !== 200 && editDestinationStatusCode?.ExpenseStatus !== 200 && editDestinationStatusCode?.FeedbackStatus !== 200 && editDestinationStatusCode?.LocationStatus !== 200 && editDestinationStatusCode?.AdventureStatus !== 200 && editDestinationStatusCode?.TransportStatus !== 200 && editDestinationStatusCode?.PictureStatus !== 200) {
                setCommonErrorMessage(true)
                setTimeout(() => {
                    setCommonErrorMessage(false)
                }, 3000)
            }
        }

    }, [editDestinationStatusCode])

    const handleChange = (e: any) => {
        setFormData((prevState: any) => {
            return {
                ...prevState,
                [e?.target.name]: e?.target?.value,
            };
        })
    }

    const handleBasicInfo = async () => {

        setIsLoading(true)

        let AdminID: any = localStorage?.getItem("AdminID")

        let request = {
            "data": {
                "DestinationName": formData?.DestinationName,
                "Description": formData?.Description,
                "Category": formData?.Category,
                "CreatedBy": localStorage?.getItem("AdminName"),
                "TimeToVisit": `${formData?.TimeToVisitStart} - ${formData?.TimeToVisitEnd}`,
                "EntryFee": parseInt(formData?.EntryFee),
                "Status": "New",
                "AdminID": parseInt(AdminID)
            }
        }

        let createDestination: any = await destinationApi?.createDestination(request);

        if (createDestination?.status === 409) {
            setAddDestinationDuplicateMessage(true)
            setIsLoading(false)
        }
        else {
            setAddDestinationStatusCode((preState: any) => { return { ...preState, DestinationStatus: createDestination?.status } })

            if (createDestination?.status === 200) {

                setAddDestinationStatusCode((preState: any) => { return { ...preState, DestinationStatus: createDestination?.status } })
                const destinationID = (createDestination?.data?.DestinationID)
                handlePictures(destinationID)
                handleExpense(destinationID)
                handleFeedback(destinationID)
                handleAdventure(destinationID)
                handleLocation(destinationID)
                handleTransport(destinationID)
            }
        }
    }

    const handleAdventure = async (DestinationID: any) => {

        let request = {
            "data": {
                "Boating": formData?.Boating,
                "RidingAndRacing": formData?.RidingAndRacing,
                "Swimming": formData?.Swimming,
                "WildlifeSafari": formData?.WildlifeSafari,
                "Surfing": formData?.Surfing,
                "Photography": formData?.Photography,
                "Trekking": formData?.Trekking,
                "CulturalTours": formData?.CulturalTours,
                "Camping": formData?.Camping,
                "Paragliding": formData?.Paragliding,
                "DestinationID": DestinationID,
                "CreatedBy": localStorage?.getItem("AdminName")
            }
        }

        let createAdventure: any = await adventureApi?.createAdventrue(request);
        setAddDestinationStatusCode((preState: any) => { return { ...preState, AdventureStatus: createAdventure?.status } })

    }

    const handleLocation = async (DestinationID: any) => {
        let request = {
            "data": {
                "Country": formData?.Country,
                "State": formData?.State,
                "City": formData?.City,
                "Latitude": formData?.Latitude ? parseFloat(formData?.Latitude) : undefined,
                "Longitude": formData?.Longitude ? parseFloat(formData?.Longitude) : undefined,
                "CreatedBy": localStorage?.getItem("AdminName"),
                "DestinationID": DestinationID
            }
        }

        let createLocation: any = await locationApi?.createLocation(request)
        setAddDestinationStatusCode((preState: any) => { return { ...preState, LocationStatus: createLocation?.status } })

    }

    const handleTransport = async (DestinationID: any) => {
        let request = {
            "data": {
                "Flight": formData?.Flight,
                "Ship": formData?.Ship,
                "Train": formData?.Train,
                "Bus": formData?.Bus,
                "CreatedBy": localStorage?.getItem("AdminName"),
                "DestinationID": DestinationID
            }
        }

        let createTransport: any = await transportApi?.createTransport(request);
        setAddDestinationStatusCode((preState: any) => { return { ...preState, TransportStatus: createTransport?.status } })

    }

    const handleExpense = async (DestinationID: any) => {
        let request = {
            "data": {
                "StayMinimum": parseInt(formData?.StayMinimum),
                "StayMaximum": parseInt(formData?.StayMaximum),
                "FoodMinimum": parseInt(formData?.FoodMinimum),
                "FoodMaximum": parseInt(formData?.FoodMaximum),
                "TravelMinimum": parseInt(formData?.TravelMinimum),
                "TravelMaximum": parseInt(formData?.TravelMaximum),
                "CreatedBy": localStorage?.getItem("AdminName"),
                "DestinationID": DestinationID
            }
        }

        let createExpense: any = await expenseApi?.createExpense(request)

        setAddDestinationStatusCode((preState: any) => { return { ...preState, ExpenseStatus: createExpense?.status } })

    }

    const handlePictures = async (DestinationID: any) => {

        let createdBy: any = localStorage?.getItem("Admin")

        const formData = new FormData();

        formData.append("DestinationID", DestinationID);
        formData.append("CreatedBy", createdBy);

        [...coverImage, ...additionalImage].forEach((file: any) => {
            formData.append("Image", file);
        });

        let createPicture: any = await pictureApi?.createPicture(formData)

        setAddDestinationStatusCode((preState: any) => { return { ...preState, PictureStatus: createPicture?.status } })

    }

    const handleFeedback = async (DestinationID: any) => {
        let request = {
            "data": {
                "StarRating": parseInt(formData?.StarRating),
                "Review": formData?.Review,
                "CreatedBy": localStorage?.getItem("AdminName"),
                "DestinationID": DestinationID
            }
        }

        let createFeedback: any = await feedbackApi?.createFeedback(request);

        setAddDestinationStatusCode((preState: any) => { return { ...preState, FeedbackStatus: createFeedback?.status } })

    }

    const handleEdit = () => {
        handleEditBasicInfo()
        handleEditAdventure()
        handleEditLocation()
        handleEditTransport()
        handleEditExpence()
    }

    const handleEditBasicInfo = async () => {

        const acturalBasicInfo = {
            DestinationName: InputData?.DestinationData?.DestinationName,
            Description: InputData?.DestinationData?.Description,
            Category: InputData?.DestinationData?.Category,
            TimeToVisitStart: InputData?.DestinationData?.TimeToVisit?.split(" - ")[0],
            TimeToVisitEnd: InputData?.DestinationData?.TimeToVisit?.split(" - ")[1],
            EntryFee: InputData?.DestinationData?.EntryFee === null ? "" : InputData?.DestinationData?.EntryFee,
        }

        const currentBasicInfo = {
            DestinationName: formData.DestinationName,
            Description: formData.Description,
            Category: formData.Category,
            TimeToVisitStart: formData?.TimeToVisitStart,
            TimeToVisitEnd: formData?.TimeToVisitEnd,
            EntryFee: formData?.EntryFee,
        };


        if (!_.isEqual(acturalBasicInfo, currentBasicInfo)) {

            let request = {
                "filter": { "DestinationID": InputData?.DestinationData?.DestinationID },
                "fields": {
                    DestinationName: formData?.DestinationName,
                    Description: formData?.Description,
                    Category: formData?.Category,
                    TimeToVisit: `${formData?.TimeToVisitStart} - ${formData?.TimeToVisitEnd}`,
                    EntryFee: parseInt(formData?.EntryFee),
                    ModifiedBy: localStorage?.getItem("AdminName")
                }
            };

            const editBasicInfo: any = await destinationApi?.editDestination(request);
            setEditDestinationStatusCode((preState: any) => { return { ...preState, DestinationStatus: editBasicInfo?.status } })
            if (editBasicInfo?.status === 200) {
                InputFunction?.readDestination();
            } else if (editBasicInfo?.status === 409) {

            }
        }

    };

    const handleEditAdventure = async () => {

        const acturalAdventure = {
            Boating: InputData?.AdventureData?.Boating,
            RidingAndRacing: InputData?.AdventureData?.RidingAndRacing,
            Swimming: InputData?.AdventureData?.Swimming,
            WildlifeSafari: InputData?.AdventureData?.WildlifeSafari,
            Surfing: InputData?.AdventureData?.Surfing,
            Photography: InputData?.AdventureData?.Photography,
            Trekking: InputData?.AdventureData?.Trekking,
            CulturalTours: InputData?.AdventureData?.CulturalTours,
            Camping: InputData?.AdventureData?.Camping,
            Paragliding: InputData?.AdventureData?.Paragliding,
        }

        let currentAdventure = {
            Boating: formData?.Boating,
            RidingAndRacing: formData?.RidingAndRacing,
            Swimming: formData?.Swimming,
            WildlifeSafari: formData?.WildlifeSafari,
            Surfing: formData?.Surfing,
            Photography: formData?.Photography,
            Trekking: formData?.Trekking,
            CulturalTours: formData?.CulturalTours,
            Camping: formData?.Camping,
            Paragliding: formData?.Paragliding,
        };

        if (!_.isEqual(acturalAdventure, currentAdventure)) {

            let request = {
                "filter": { "DestinationID": InputData?.DestinationData?.DestinationID },
                "fields": {
                    ...currentAdventure,
                    ModifiedBy: localStorage?.getItem("AdminName")
                }
            };

            const editAdventure: any = await adventureApi?.editAdventure(request);
            setEditDestinationStatusCode((preState: any) => { return { ...preState, AdventureStatus: editAdventure?.status } })
            if (editAdventure?.status === 200) {
                InputFunction?.readAdventure();
            } else if (editAdventure?.status === 409) {

            }
        }

    };

    const handleEditLocation = async () => {

        let acturalLocation = {
            Country: InputData?.LocationData?.Country,
            State: InputData?.LocationData?.State,
            City: InputData?.LocationData?.City,
            Latitude: InputData?.LocationData?.Latitude,
            Longitude: InputData?.LocationData?.Longitude
        }

        let currentLocation = {
            Country: formData?.Country,
            State: formData?.State,
            City: formData?.City,
            Latitude: formData?.Latitude === "" ? null : formData?.Latitude,
            Longitude: formData?.Longitude === "" ? null : formData?.Longitude
        };

        if (!_.isEqual(acturalLocation, currentLocation)) {

            let request = {
                "filter": { "DestinationID": InputData?.DestinationData?.DestinationID },
                "fields": {
                    ...currentLocation,
                    ModifiedBy: localStorage?.getItem("AdminName")
                }
            };

            const editLocation: any = await locationApi?.editLocation(request);
            setEditDestinationStatusCode((preState: any) => { return { ...preState, LocationStatus: editLocation?.status } })
            if (editLocation?.status === 200) {
                InputFunction?.readLocation();
            }
        }
    };

    const handleEditTransport = async () => {

        let acturalTransport = {
            Flight: InputData?.TransportData?.Flight,
            Ship: InputData?.TransportData?.Ship,
            Train: InputData?.TransportData?.Train,
            Bus: InputData?.TransportData?.Bus
        }

        let currentTransport = {
            Flight: formData?.Flight,
            Ship: formData?.Ship,
            Train: formData?.Train,
            Bus: formData?.Bus
        };

        if (!_.isEqual(acturalTransport, currentTransport)) {

            let request = {
                "filter": { "DestinationID": InputData?.DestinationData?.DestinationID },
                "fields": {
                    ...currentTransport,
                    ModifiedBy: localStorage?.getItem("AdminName")
                }
            };

            const editTransport: any = await transportApi?.editTransport(request);
            setEditDestinationStatusCode((preState: any) => { return { ...preState, TransportStatus: editTransport?.status } })
            if (editTransport?.status === 200) {
                InputFunction?.readTransport();
            } else if (editTransport?.status === 409) {

            }
        }

    };

    const handleEditExpence = async () => {

        let acturalExpence = {
            StayMinimum: InputData?.ExpenseData?.StayMinimum,
            StayMaximum: InputData?.ExpenseData?.StayMaximum,
            FoodMinimum: InputData?.ExpenseData?.FoodMinimum,
            FoodMaximum: InputData?.ExpenseData?.FoodMaximum,
            TravelMinimum: InputData?.ExpenseData?.TravelMinimum,
            TravelMaximum: InputData?.ExpenseData?.TravelMaximum,
        }

        let currentExpence = {
            StayMinimum: formData?.StayMinimum === "" ? null : formData?.StayMinimum,
            StayMaximum: formData?.StayMaximum === "" ? null : formData?.StayMaximum,
            FoodMinimum: formData?.FoodMinimum === "" ? null : formData?.FoodMinimum,
            FoodMaximum: formData?.FoodMaximum === "" ? null : formData?.FoodMaximum,
            TravelMinimum: formData?.TravelMinimum === "" ? null : formData?.TravelMinimum,
            TravelMaximum: formData?.TravelMaximum === "" ? null : formData?.TravelMaximum,
        };

        if (!_.isEqual(acturalExpence, currentExpence)) {

            let request = {
                "filter": { "DestinationID": InputData?.DestinationData?.DestinationID },
                "fields": {
                    StayMinimum: parseInt(formData?.StayMinimum),
                    StayMaximum: parseInt(formData?.StayMaximum),
                    FoodMinimum: parseInt(formData?.FoodMinimum),
                    FoodMaximum: parseInt(formData?.FoodMaximum),
                    TravelMinimum: parseInt(formData?.TravelMinimum),
                    TravelMaximum: parseInt(formData?.TravelMaximum),
                    ModifiedBy: localStorage?.getItem("AdminName")
                }
            };

            const editExpense: any = await expenseApi?.editExpense(request);
            setEditDestinationStatusCode((preState: any) => { return { ...preState, ExpenseStatus: editExpense?.status } })
            if (editExpense?.status === 200) {
                InputFunction?.readExpense();
            } else if (editExpense?.status === 409) {

            }
        }
    };

    return (
        <>
            <Dialog open={true} maxWidth={"lg"} fullWidth>
                <DialogTitle bgcolor={"#94BFD9"} height={{ lg: 30, xl: 40 }}>
                    <Grid container  >
                        <Grid size={11.5} pt={{ xl: 0.5, lg: 0.5 }}>
                            <Typography sx={{ fontSize: { xl: "30px", lg: "20px" }, fontWeight: "bold", }}>{type === "add" ? "Add Destination" : "Edit Destination"}</Typography>
                        </Grid>
                        <Grid size={0.5} pt={{ xl: 0, lg: 0 }} >
                            <Button onClick={() => { InputFunction.disableForm() }}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                        </Grid>
                    </Grid>

                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e: any) => { e?.preventDefault(), type === "add" ? handleBasicInfo() : handleEdit() }}>

                        <Grid container p={2}>

                            <Grid size={4.8}  >
                                <Stack display={"flex"} direction={"column"} spacing={2}>
                                    <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "12px" } }}>Basic Info</Typography>
                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"} >
                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Destination Name<Typography color="red" display={"inline-block"}>*</Typography></Typography>
                                        <Typography>:</Typography>
                                        <TextField required onChange={(e: any) => { handleChange(e) }} value={formData?.DestinationName} name="DestinationName" size="small" sx={{ width: "295px" }} placeholder="Enter Destination Name..."></TextField>
                                    </Grid>
                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"}  >

                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Description<Typography color="red" display={"inline-block"}>*</Typography></Typography>
                                        <Typography sx={{ pl: 6 }}>:</Typography>
                                        <textarea required onChange={(e: any) => { handleChange(e) }} value={formData?.Description} name="Description" placeholder="Enter Description..." style={{ width: "280px", height: "50px", padding: 5 }}></textarea>

                                    </Grid>
                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Category<Typography color="red" display={"inline-block"}>*</Typography></Typography>
                                        <Typography sx={{ pl: 8 }}>:</Typography>
                                        <Select required onChange={(e: any) => { handleChange(e) }} value={formData?.Category} name="Category" size="small" sx={{ width: "295px" }} displayEmpty renderValue={(selected) => { if (!selected) { return <Typography color="textSecondary">Select Category...</Typography>; } return selected; }} >
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="Beach">Beach</MenuItem>
                                            <MenuItem value="Hill Station">Hill Station</MenuItem>
                                            <MenuItem value="Mountain">Mountain</MenuItem>
                                            <MenuItem value="Waterfall">Waterfall</MenuItem>
                                            <MenuItem value="Temple">Temple</MenuItem>
                                            <MenuItem value="Monument / Historical Place">Monument / Historical Place</MenuItem>
                                            <MenuItem value="National Park / Wildlife">National Park / Wildlife</MenuItem>
                                            <MenuItem value="City / Urban">City / Urban</MenuItem>
                                            <MenuItem value="Cultural Spot">Cultural Spot</MenuItem>
                                        </Select>

                                    </Grid>
                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>

                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Best Time to Visit</Typography>
                                        <Typography>:</Typography>
                                        <Select size="small" sx={{ width: { xl: "128px", lg: "118px" } }}
                                            onChange={(e: any) => { handleChange(e) }} value={formData?.TimeToVisitStart} name="TimeToVisitStart" displayEmpty renderValue={(selected) => { if (!selected) { return <Typography color="textSecondary">Month...</Typography>; } return selected; }} >
                                            <MenuItem value={""}>none</MenuItem>
                                            {
                                                months.map((data) => (
                                                    <MenuItem value={data}>{data}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>To</Typography>
                                        <Select size="small" sx={{ width: { xl: "128px", lg: "118px" } }} onChange={(e: any) => { handleChange(e) }} value={formData?.TimeToVisitEnd} name="TimeToVisitEnd" displayEmpty renderValue={(selected) => { if (!selected) { return <Typography color="textSecondary">Month...</Typography>; } return selected; }}  >
                                            <MenuItem value={""}>none</MenuItem>
                                            {
                                                months.map((data) => (
                                                    <MenuItem value={data}>{data}</MenuItem>
                                                ))
                                            }
                                        </Select>

                                    </Grid>
                                    <Grid size={12} >
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Entry Fees</Typography>
                                            <Typography sx={{ pl: 6.5 }}>:</Typography>
                                            <TextField size="small" sx={{ width: "295px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.EntryFee} name="EntryFee" placeholder="Enter Entry Fees..." ></TextField>
                                        </Stack>

                                    </Grid>
                                </Stack>

                                <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} ></Divider>

                                <Stack mt={3} display={"flex"} direction={"column"}>
                                    <Grid size={12}>
                                        <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "12px" } }}>Adventures</Typography>
                                    </Grid>
                                    <Grid container >
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Boating": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Boating ? true : false} name="Boating"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Boating</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "RidingAndRacing": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.RidingAndRacing ? true : false} name="RidingAndRacing"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Riding & Racing</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Swimming": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Swimming ? true : false} name="Swimming"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Swimming</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "WildlifeSafari": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.WildlifeSafari ? true : false} name="WildlifeSafari"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Wildlife Safari</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Surfing": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Surfing ? true : false} name="Surfing"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Surfing</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Photography": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Photography ? true : false} name="Photography"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Photography</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Trekking": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Trekking ? true : false} name="Trekking"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Trekking</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "CulturalTours": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.CulturalTours ? true : false} name="CulturalTours"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Cultural Tours</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Camping": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Camping ? true : false} name="Camping"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Camping</Typography>
                                        </Grid>
                                        <Grid size={6}>
                                            <Checkbox sx={{ display: 'inline-block', p: 1 }} onChange={(e: any) => {
                                                setFormData((prevState: any) => {
                                                    return {
                                                        ...prevState,
                                                        "Paragliding": e.target.checked ? true : false
                                                    }
                                                })
                                            }} checked={formData?.Paragliding ? true : false} name="Paragliding"></Checkbox>
                                            <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Paragliding</Typography>
                                        </Grid>
                                    </Grid>

                                </Stack>
                            </Grid>

                            <Divider orientation="vertical" flexItem sx={{ pl: 2 }}></Divider>
                            <Grid size={7} pl={2}>
                                <Grid container spacing={5}>
                                    <Grid size={12} >
                                        <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "12px" } }}>Location</Typography>

                                        <Grid container spacing={2}>
                                            <Grid size={6} mt={2} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Country<Typography color="red" display={"inline-block"}>*</Typography></Typography>
                                                <Typography>:</Typography>
                                                <TextField required size="small" sx={{ width: "220px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.Country} name="Country" placeholder="Enter Country..."></TextField>
                                            </Grid>
                                            <Grid size={6} mt={2} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Latitude</Typography>
                                                <Typography>:</Typography>
                                                <TextField size="small" sx={{ width: "220px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.Latitude} name="Latitude" placeholder="Enter Latitude..." ></TextField>
                                            </Grid>
                                            <Grid size={6} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}> State<Typography color="red" display={"inline-block"}>*</Typography></Typography>
                                                <Typography>:</Typography>
                                                <TextField required size="small" sx={{ width: "220px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.State} name="State" placeholder="Enter State"></TextField>
                                            </Grid>
                                            <Grid size={6} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Longitude</Typography>
                                                <Typography>:</Typography>
                                                <TextField size="small" sx={{ width: "220px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.Longitude} name="Longitude" placeholder="Enter Longitude..."></TextField>
                                            </Grid>
                                            <Grid size={6} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>City<Typography color="red" display={"inline-block"}>*</Typography></Typography>
                                                <Typography>:</Typography>
                                                <TextField required size="small" sx={{ width: "220px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.City} name="City" placeholder="Enter City..."></TextField>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid size={12}>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "12px" } }}>Transport</Typography>
                                                <Grid container spacing={2}>
                                                    <Grid size={6} mt={3}>
                                                        <Checkbox sx={{ display: 'inline-block' }} onChange={(e: any) => {
                                                            setFormData((prevState: any) => {
                                                                return {
                                                                    ...prevState,
                                                                    "Bus": e.target.checked ? true : false
                                                                }
                                                            })
                                                        }} checked={formData?.Bus ? true : false} name="Bus"></Checkbox>
                                                        <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Bus</Typography>
                                                    </Grid>
                                                    <Grid size={6} mt={2}>
                                                        <Checkbox sx={{ display: 'inline-block' }} onChange={(e: any) => {
                                                            setFormData((prevState: any) => {
                                                                return {
                                                                    ...prevState,
                                                                    "Train": e.target.checked ? true : false
                                                                }
                                                            })
                                                        }} checked={formData?.Train ? true : false} name="Train"></Checkbox>
                                                        <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Train</Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Checkbox sx={{ display: 'inline-block' }} onChange={(e: any) => {
                                                            setFormData((prevState: any) => {
                                                                return {
                                                                    ...prevState,
                                                                    "Flight": e.target.checked ? true : false
                                                                }
                                                            })
                                                        }} checked={formData?.Flight ? true : false} name="Flight"></Checkbox>
                                                        <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Flight</Typography>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Checkbox sx={{ display: 'inline-block' }} onChange={(e: any) => {
                                                            setFormData((prevState: any) => {
                                                                return {
                                                                    ...prevState,
                                                                    "Ship": e.target.checked ? true : false
                                                                }
                                                            })
                                                        }} checked={formData?.Ship ? true : false} name="Ship"></Checkbox>
                                                        <Typography sx={{ display: 'inline-block', fontSize: { xl: "16px", lg: "12px" } }}>Ship</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid size={6}>
                                                <Typography sx={{ fontWeight: "bold", fontSize: { xl: "16px", lg: "12px" } }}>Expenses</Typography>
                                                <Grid container spacing={2} mt={2}>
                                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" }, width: "23px" }}>Stay</Typography>
                                                        <Typography sx={{ pl: 3.5 }}>:</Typography>
                                                        <TextField size="small" label="Min" placeholder="Min amt.." sx={{ width: "100px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.StayMinimum} name="StayMinimum"></TextField>
                                                        <Typography>To</Typography>
                                                        <TextField size="small" label="Max" placeholder="Max amt.." sx={{ width: "100px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.StayMaximum} name="StayMaximum" ></TextField>
                                                    </Grid>
                                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" }, width: "48px" }}>Food</Typography>
                                                        <Typography>:</Typography>
                                                        <TextField size="small" label="Min" placeholder="Min amt.." sx={{ width: "100px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.FoodMinimum} name="FoodMinimum"></TextField>
                                                        <Typography>To</Typography>
                                                        <TextField size="small" label="Max" placeholder="Max amt.." sx={{ width: "100px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.FoodMaximum} name="FoodMaximum" ></TextField>
                                                    </Grid>
                                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" }, width: "20px" }}>Travel</Typography>
                                                        <Typography sx={{ pl: 3.5 }}>:</Typography>
                                                        <TextField size="small" label="Min" placeholder="Min amt.." sx={{ width: "100px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.TravelMinimum} name="TravelMinimum"></TextField>
                                                        <Typography>To</Typography>
                                                        <TextField size="small" label="Max" placeholder="Max amt.." sx={{ width: "100px" }} onChange={(e: any) => { handleChange(e) }} value={formData?.TravelMaximum} name="TravelMaximum" ></TextField>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid size={12} >
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <Typography sx={{ fontWeight: "bold", color: type === "edit" ? "gray" : "black", fontSize: { xl: "16px", lg: "12px" } }}>Picture</Typography>
                                                <Grid container spacing={3}>
                                                    <Grid size={12} mt={2} color={type === "edit" ? "gray" : "black"} display={"flex"} direction={"column"} justifyContent={"space-between"} >
                                                        <Typography sx={{ fontSize: { xl: "16px", lg: "12px" } }}>Cover image<Typography color={type === "edit" ? "gray" : "red"} display={"inline-block"}>*</Typography></Typography>

                                                        <MuiFileInput
                                                            required={type === "add"}
                                                            multiple
                                                            value={coverImage ? coverImage : []}
                                                            onChange={(e: any) => { setCoverImage(e) }}
                                                            disabled={type === "edit"}
                                                            placeholder={InputData?.PicturesData?.coverImage ? InputData?.PicturesData?.coverImage?.ImageName.substring(0, 10) + "...  .jpg" : "Select image from folder"}
                                                            sx={{
                                                                width: "58%",
                                                                textAlign: "center",
                                                                border: "2px dashed gray"
                                                            }}
                                                            InputProps={{
                                                                sx: {
                                                                    border: "none", outline: "none", fontSize: "14px", color: "gray", "&.MuiOutlinedInput-root": {
                                                                        "& fieldset": { border: "none" }
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid size={12} display={"flex"} direction={"column"} justifyContent={"space-between"} >
                                                        <Typography sx={{ color: type === "edit" ? "gray" : "black", fontSize: { xl: "16px", lg: "12px" } }}>Additional images</Typography>
                                                        <MuiFileInput
                                                            multiple
                                                            value={additionalImage ? additionalImage : []}
                                                            onChange={(e: any) => { setAdditionalImage(e) }}
                                                            disabled={type === "edit"}
                                                            placeholder={InputData?.PicturesData?.additionalImage ? InputData?.PicturesData?.additionalImage?.ImageName.substring(0, 10) + "...  .jpg" : "Select image from folder"}
                                                            sx={{
                                                                width: "58%",
                                                                textAlign: "center",
                                                                border: "2px dashed gray",

                                                            }}
                                                            InputProps={{
                                                                sx: {
                                                                    border: "none", outline: "none", fontSize: "14px", color: "gray", "&.MuiOutlinedInput-root": {
                                                                        "& fieldset": { border: "none" }
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid size={6}>
                                                <Typography sx={{ fontWeight: "bold", color: type === "edit" ? "gray" : "black", fontSize: { xl: "16px", lg: "12px" } }}>Tell Us About Your Experience</Typography>
                                                <Grid container spacing={2} justifyContent={"left"}>
                                                    <Grid size={8.3} mt={2} display={"flex"} direction={"row"} justifyContent={"space-between"}>
                                                        <Typography sx={{ color: type === "edit" ? "gray" : "black", fontSize: { xl: "16px", lg: "12px" } }}>Rating<Typography color={type === "edit" ? "gray" : "red"} display={"inline-block"}>*</Typography></Typography>
                                                        <Typography>-</Typography>
                                                        <Rating onChange={(event, newValue) => {
                                                            setFormData((prevState: any) => ({
                                                                ...prevState,
                                                                StarRating: newValue
                                                            }));
                                                        }} value={Number(formData?.StarRating) || 0} name="StarRating" readOnly={type === "edit"} />
                                                    </Grid>
                                                    <Grid size={12} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                                        <Typography sx={{ color: type === "edit" ? "gray" : "black", fontSize: { xl: "16px", lg: "12px" } }}>Review<Typography color={type === "edit" ? "gray" : "red"} display={"inline-block"}>*</Typography></Typography>
                                                        <Typography>:</Typography>
                                                        <textarea required onChange={(e: any) => { handleChange(e) }} value={formData?.Review} name="Review" style={{ width: "215px", height: "95px", padding: 5, color: type === "edit" ? "gray" : "black" }} readOnly={type === "edit"} placeholder="Enter Review..."></textarea>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid size={12} mt={3} >
                                <Stack display={"flex"} direction={"row"} justifyContent={"center"} spacing={5}>
                                    <Button variant="outlined" sx={{ color: "white", bgcolor: "#DC3545", fontWeight: "bold", pt: 1 }} onClick={() => { InputFunction.disableForm() }} >Cancel</Button>
                                    <Button type="submit" variant="outlined" disabled={isLoading} sx={{ color: "white", bgcolor: isLoading ? "lightgray" : "#28A745", fontWeight: "bold", pt: 1, width: "100px" }}>{isLoading ? <CircularProgress size={20} /> : (type === 'add' ? "Create" : "Update")}</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={addDestinationSuccessMesssage}
                autoHideDuration={3000}
                onClose={() => { setAddDestinationSuccessMessage(false) }}>
                <Alert onClose={() => { setAddDestinationSuccessMessage(false) }} severity="success" sx={{ width: '100%' }}>
                    Add Destination Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={addDestinationInfoMesssage}
                autoHideDuration={5000}
                onClose={() => setAddDestinationInfoMessage(false)}>
                <Alert onClose={() => setAddDestinationInfoMessage(false)} severity="info" sx={{ width: '100%' }}>
                    Info: Data will be shown only after admin approval
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={addDestinationDuplicateMessage}
                autoHideDuration={5000}
                onClose={() => setAddDestinationDuplicateMessage(false)}>
                <Alert onClose={() => setAddDestinationDuplicateMessage(false)} severity="warning" sx={{ width: '100%' }}>
                    Destination Name Already Exist...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={editDestinationSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setEditDestinationSuccessMessage(false)}>
                <Alert onClose={() => setEditDestinationSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Edit Destination Successfully...
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

        </>
    )
}