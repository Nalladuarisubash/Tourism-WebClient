import { Card, Grid, Typography } from "@mui/material";

// const mockData = {
//     data: {
//         "LocationID": 1,
//         "Country": "India",
//         "State": "Tamil Nadu",
//         "City": "Madurai",
//         "Latitude": 9.9252,
//         "Longitude": 78.1198,
//         "CreatedBy": "Admin",
//         "CreatedDate": "2025-03-11T09:30:21.265Z",
//         "DestinationID": 1,
//         "DestinationName": "Baga Beach, Goa, India",
//         "ModifiedBy": null,
//         "ModifiedDate": null
//     }
// }

export default function DestinationLocation() {

    return (
        <>
            <Grid container p={{ xl: 2.5, lg: 1.5 }} >
                <Grid  size={12}>
                    <Typography sx={{ display: "flex", alignItems: "center", fontSize: "30px", fontWeight: 'bold' }} > </Typography>
                </Grid>
                <Grid  size={4} p={2}>
                    <Card >
                        
                    </Card>
                </Grid>
                <Grid size={8} p={2} >
                    <Card >
                        
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}