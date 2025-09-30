import { Alert, Box, Button, Card, Dialog, DialogContent, DialogTitle, Divider, Grid, LinearProgress, Snackbar, Stack, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import { useEffect, useState } from "react";
import RegistrationForm from "../../login_registration/registration.component";
import LoginForm from "../../login_registration/login.component";
import router from "next/router";
import FeedbackApi from '@/api/feedback.api';
import dynamic from "next/dynamic";
import LoadingAnimation from "../../../../public/loading/loading.animation.json"
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Head from "next/head";
import CancelIcon from '@mui/icons-material/Cancel';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const feedbackApi = new FeedbackApi();

export default function DestinationFeedback({ InputData, InputFunction }: any) {

    const avatarColorCodes = ["#E5D4FF", "#FFD6A5", "#A8E6CF", "#FFB6B9", "#C7CEEA", "#F6C6EA", "#ACE7EF", "#D4A5A5", "#87CEFA", "#F7C8E0"];
    const [addFeedbackFormEnable, setAddFeedbackFormEnable] = useState(false);
    const [feedbackData, setFeedbackData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        "StarRating": "",
        "Review": ""
    });
    const [editformEnable, setEditFormEnable] = useState(false);
    const [feedbackID, setFeedbackID] = useState<any>();
    const [registrationFormEnable, setRegistrationFormEnable] = useState(false);
    const [loginFormEnable, setLoginFormEnable] = useState(false);
    const [confirmDeleteEnable, setConfirmDeleteEnable] = useState(false);
    const [addFeedbackSuccessMessage, setAddFeedbackSuccessMessage] = useState(false);
    const [editFeedbackSuccessMessage, setEditFeedbackSuccessMessage] = useState(false);
    const [deleteFeedbackSuccessMessage, setDeleteFeedbackSuccessMessage] = useState(false);
    const [commonErrorMessage, setCommonErrorMessage] = useState(false);
    const [reviewContentEnable, setReviewContentEnable] = useState(false);
    const [reviewContentData, setReviewContentData] = useState(false);
    const [deleteFeedbackUnableMessage, setDeleteFeedbackUnableMessage] = useState(false);

    const handleAddFeedback = () => {

        const user = localStorage.getItem("AdminName")

        if (!user) {
            setLoginFormEnable(true)
        }
        else {
            setAddFeedbackFormEnable(true)
        }
    }

    const handleCreateFeedback = async () => {

        let destinationID: any = router?.query?.destinationid || localStorage?.getItem("DestinationID");

        let request = {
            "data": {
                "StarRating": parseInt(formData?.StarRating),
                "Review": formData?.Review,
                "CreatedBy": localStorage?.getItem("AdminName"),
                "DestinationID": parseInt(destinationID)
            }
        }

        let createFeedback: any = await feedbackApi?.createFeedback(request);

        if (createFeedback?.status === 200) {
            setAddFeedbackSuccessMessage(true)
            InputFunction?.ReadFeedback()
            setFormData({
                StarRating: "",
                Review: ""
            });
            setAddFeedbackFormEnable(false)
        }
        else if (createFeedback?.status === undefined) {
            setCommonErrorMessage(true)
        }
    }

    const handleEditFeedback = async () => {

        let request = {
            "filter": {
                "FeedbackID": feedbackID
            },
            "fields": {
                "StarRating": formData?.StarRating ? formData?.StarRating : undefined,
                "Review": formData?.Review ? formData?.Review : undefined,
            }
        }

        const editFeedback: any = await feedbackApi?.editFeedback(request)

        if (editFeedback?.status === 200) {
            setEditFeedbackSuccessMessage(true)
            InputFunction?.ReadFeedback()
            setFormData({
                StarRating: "",
                Review: ""
            });
            setEditFormEnable(false)
            setAddFeedbackFormEnable(false)
        }
        else if (editFeedback?.status === undefined) {
            setCommonErrorMessage(true)
        }
    }

    const handleDeleteFeedback = async () => {
        setIsLoading(true)
        if (feedbackData?.Reviews[0]?.FeedbackID === feedbackID) {
            setDeleteFeedbackUnableMessage(true)
            setIsLoading(false)
        }

        else {
            let request = feedbackID

            const removeFeedback: any = await feedbackApi?.removeFeedback(request);

            if (removeFeedback?.status === 200) {
                setDeleteFeedbackSuccessMessage(true)
                setFeedbackID(undefined)
                InputFunction?.ReadFeedback()
                setConfirmDeleteEnable(false)
                setIsLoading(false)
            }
            else if (removeFeedback?.status === undefined) {
                setCommonErrorMessage(true)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        setIsLoading(true)
        setFeedbackData(InputData?.FeedbackData ? InputData?.FeedbackData : "")
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

    return (
        <>
            <Head>
                <title>Tourism - Feedback</title>
            </Head>

            {isLoading ? <><Box mt={{ xl: 20, lg: 5 }}> <Lottie options={loadingAnimation} height={300} width={300} /></Box></> : <>
                <Grid container p={{ xl: 3, lg: 0.5 }} height={""} justifyContent={"center"}>
                    <Grid size={11.5}>
                        <Stack display={'flex'} direction={"row"} justifyContent={"space-between"}>
                            <Typography sx={{ display: "inline-block", fontSize: { xl: "20px", lg: "20px" }, fontWeight: 'bold' }}>{InputData?.DestinationData?.DestinationName}, {InputData?.DestinationData?.Location[0]?.State}, {InputData?.DestinationData?.Location[0]?.Country} </Typography>
                            <Button size="small" sx={{ bgcolor: '#6DA7D0', color: "white", fontWeight: "bold", height: "40px", width: "150px", pt: 1 }} onClick={() => { handleAddFeedback() }}>Add Feedback</Button>
                        </Stack>
                    </Grid>
                    <Grid size={12} >
                        <Grid container justifyContent={"space-around"}>
                            <Grid size={3} mt={{ xl: 1.5, lg: 0.5 }} >
                                <Card sx={{ height: "53vh", borderRadius: "20px", border: "1px solid #D9D9D9" }}>
                                    <Stack display={"flex"} direction={"column"} >

                                        <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={{ xl: 3.5, lg: 0.5 }}  >

                                            <Grid size={12} textAlign={"center"}>
                                                <Box sx={{ fontSize: { xl: "80px", lg: "50px" }, fontWeight: "bold" }} >{feedbackData?.AverageRating}</Box>
                                            </Grid>
                                            <Grid size={12} display={"flex"} justifyContent={"center"}>
                                                <Rating size="large" precision={0.1} value={feedbackData?.AverageRating || '0'} readOnly />
                                            </Grid>
                                            <Grid size={12} textAlign={"center"}>
                                                <Typography>{feedbackData?.Reviews?.length} ratings</Typography>
                                            </Grid>
                                            {feedbackData?.RatingPersentage?.map((data: any) => (
                                                <>
                                                    <Grid size={12} >
                                                        <Stack display={"flex"} direction={"row"} spacing={1} justifyContent={"center"} alignItems={"center"} >
                                                            <Typography sx={{ display: "inline-block" }}>{data?.starValue} </Typography>
                                                            <Box sx={{ mb: 5 }}><StarIcon sx={{ color: "#FAAF00" }} /></Box>
                                                            <LinearProgress sx={{
                                                                height: "10px",
                                                                width: { xl: "70%", lg: "50%" },
                                                                borderRadius: "5px",
                                                                backgroundColor: "#f0f0f0",
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: "#FAAF00",
                                                                    borderRadius: "5px"
                                                                },
                                                                display: "inline-block"
                                                            }} variant="determinate" value={data?.percentage} />
                                                            <Typography display={"inline-block"} width={"50px"} textAlign={"center"}>{Math.floor(data?.percentage) || '0'} %</Typography>
                                                        </Stack>
                                                    </Grid>
                                                </>
                                            ))}
                                        </Grid>
                                    </Stack>
                                </Card>
                            </Grid>
                            <Divider orientation="vertical" sx={{ height: "53vh", mt: { xl: 1.5, lg: 0.5 }, border: "1px solid lightgray" }} />
                            <Grid size={8} maxHeight={"53vh"} overflow={"scroll"} mt={{ xl: 1.5, lg: 0 }}>
                                {feedbackData?.Reviews?.map((data: any, index: any) => (
                                    <>
                                        <Card sx={{ height: { xl: "160px", lg: "120px" }, borderRadius: "10px", border: "1px solid #D9D9D9", mr: 1, mt: 1 }}>
                                            <Grid container>
                                                <Grid display={"flex"} justifyContent={"center"} size={1}>
                                                    <Avatar key={index} sx={{
                                                        mt: { xl: 1.3, lg: 0.5 }, height: { xl: "58px", lg: "35px" }, width: { xl: "58px", lg: "35px" }, color: "black",
                                                        bgcolor: avatarColorCodes[index % avatarColorCodes.length]
                                                    }}><Typography sx={{ mt: { xl: 1, lg: 0.5 }, fontWeight: "bold", fontSize: { xl: "30px", lg: "20px" } }}>{data?.CreatedBy.slice(0, 1)}</Typography></Avatar>
                                                </Grid>
                                                <Grid size={10.9}>
                                                    <Grid container pt={{ xl: 1, lg: 0.5 }} display={"flex"} direction={"column"} spacing={0}>
                                                        <Grid size={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
                                                            <Typography sx={{ display: "inline-block", fontSize: { xl: "24px", lg: "18px" }, fontWeight: "bold", pt: 0.5 }}>{data?.CreatedBy}</Typography>
                                                            <Typography sx={{ display: "inline-block", pr: 2, fontSize: { xl: "16px", lg: "14px" } }}>{moment(data?.CreatedDate).format("DD MMM YYYY")}</Typography>
                                                        </Grid>
                                                        <Rating size="small" precision={0.1} value={data?.StarRating || "-"} readOnly style={{}} ></Rating>
                                                        <Grid size={12} display={"flex"} justifyContent={"space-between"} mt={{ xl: 1, lg: 0.5 }}>

                                                            {data?.Review?.length > 400 ? <> <Stack direction={"row"} alignItems={"end"} >
                                                                <Typography pl={1} sx={{
                                                                    fontSize: { xl: "16px", lg: "14px" }, overflow: "hidden", textWrap: "wrap", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", width: { xl: "97%", lg: "100%" }
                                                                }} >{data?.Review}</Typography>
                                                                <Button size="small" sx={{ textTransform: "none", '&:hover': { textDecoration: "underline" } }} onClick={() => { setReviewContentData(data?.Review); setReviewContentEnable(true) }} >more</Button>
                                                            </Stack></> : <> <Typography pl={1} sx={{
                                                                fontSize: { xl: "16px", lg: "14px" }, overflow: "hidden", textWrap: "wrap", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                                                            }} >{data?.Review}</Typography> </>}

                                                            <Stack spacing={0.5}>

                                                                {localStorage?.getItem("AdminType") === "SuperAdmin" ? <><EditNoteIcon onClick={(e: any) => { e?.preventDefault(), setFormData({ StarRating: data?.StarRating, Review: data?.Review }), setFeedbackID(data?.FeedbackID), setEditFormEnable(true), setTimeout(() => { setAddFeedbackFormEnable(true) }, 100) }} sx={{ pr: 2, color: "blue", cursor: "pointer" }} />
                                                                    <DeleteIcon onClick={(e: any) => { e.preventDefault(), setFeedbackID(data?.FeedbackID), setConfirmDeleteEnable(true) }} sx={{ pr: 2, color: "red" }} /> </>

                                                                    : (localStorage?.getItem("AdminName") === data?.CreatedBy ? <><EditNoteIcon onClick={(e: any) => { e?.preventDefault(), setFormData({ StarRating: data?.StarRating, Review: data?.Review }), setFeedbackID(data?.FeedbackID), setEditFormEnable(true), setTimeout(() => { setAddFeedbackFormEnable(true) }, 100) }} sx={{ pr: 2, color: "blue", cursor: "pointer" }} />
                                                                        <DeleteIcon onClick={(e: any) => { e.preventDefault(), setFeedbackID(data?.FeedbackID), setConfirmDeleteEnable(true) }} sx={{ pr: 2, color: "red" }} /> </> : <></>)
                                                                }
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>}

            {addFeedbackFormEnable && <>
                <Dialog open={true} maxWidth={"xs"} fullWidth>
                    <DialogTitle>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                            <Grid size={11} >
                                <Typography sx={{ fontWeight: "bold" }}>{editformEnable ? "Edit Feedback" : "Leave a Star, Share Your Story!"}</Typography>
                            </Grid>
                            <Grid size={1} display={"flex"} justifyContent={"end"}>
                                <Button onClick={() => { setAddFeedbackFormEnable(false), setEditFormEnable(false), setFormData({ StarRating: '', Review: "" }) }} ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#000000" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11M8.818 7.403L12 10.586l3.182-3.182l1.414 1.414L13.414 12l3.182 3.182l-1.415 1.414L12 13.414l-3.182 3.182l-1.415-1.414L10.586 12L7.403 8.818z" /></svg></Button>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={(e: any) => { e?.preventDefault(), editformEnable ? handleEditFeedback() : handleCreateFeedback() }}>
                            <Grid container justifyContent={"center"} spacing={5}>
                                <Grid>
                                    <Typography sx={{ width: "350px", fontSize: "14px" }}>
                                        Your feedback creates better experiences! Rate and review to help others discover something amazing.
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Rating onChange={(e, newValue) => {
                                        setFormData((prevState: any) => ({
                                            ...prevState,
                                            StarRating: newValue
                                        }));
                                    }} value={Number(formData?.StarRating) || 0} name="StarRating" sx={{ fontSize: "50px" }} />
                                </Grid>
                                <Grid>
                                    <textarea required placeholder="Write your review here..." style={{ height: "150px", width: "300px", padding: 5 }} onChange={(e: any) => {
                                        setFormData((prevState: any) => ({
                                            ...prevState,
                                            Review: e?.target?.value
                                        }));
                                    }} value={formData?.Review} name="Review" >
                                    </textarea>
                                </Grid>
                                <Grid>
                                    <Button type="submit" variant="outlined" sx={{ pt: 1, textTransform: "none", color: "black", fontWeight: "bold", bgcolor: "#84D06D" }}>{editformEnable ? "Edit" : "Submit"}</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </Dialog>
            </>}

            {
                confirmDeleteEnable && <>
                    <Dialog open={true} maxWidth={'sm'}>
                        <DialogTitle>
                            <Typography fontWeight={"bold"} fontSize={"20px"}>Delete Feedback</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete this feedback?
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
                                    onClick={() => { handleDeleteFeedback() }}
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
                                    onClick={() => { setFeedbackID({}), setConfirmDeleteEnable(false) }}
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

            {reviewContentEnable && <Dialog open={true} >
                <DialogTitle >
                    <Stack display={"flex"} direction={"row"} justifyContent={"space-between"}>
                        <Typography fontSize={"20px"} fontWeight={"bold"}>Description</Typography>
                        <Button sx={{ m: 0, p: 0 }} onClick={() => { setReviewContentEnable(false) }}><CancelIcon sx={{ fontSize: "30px" }} /></Button>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {reviewContentData}
                    </Typography>
                </DialogContent>
            </Dialog>
            }

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={addFeedbackSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setAddFeedbackSuccessMessage(false)}>
                <Alert onClose={() => setAddFeedbackSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Feedback Add Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={editFeedbackSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setEditFeedbackSuccessMessage(false)}>
                <Alert onClose={() => setEditFeedbackSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Feedback Edit Successfully...
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={deleteFeedbackSuccessMessage}
                autoHideDuration={5000}
                onClose={() => setDeleteFeedbackSuccessMessage(false)}>
                <Alert onClose={() => setDeleteFeedbackSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Feedback Delete Successfully...
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
                open={deleteFeedbackUnableMessage}
                autoHideDuration={5000}
                onClose={() => setDeleteFeedbackUnableMessage(false)}>
                <Alert onClose={() => setDeleteFeedbackUnableMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Unable to delete this feedback
                </Alert>
            </Snackbar>
        </>
    )
}