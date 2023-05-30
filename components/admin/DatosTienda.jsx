
import { Card, CardContent, Grid, Typography } from "@mui/material"


export const DatosTienda = ({ titulo, subtitulo, icono }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} /> */}
                    { icono }
                </CardContent>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h3'>{titulo}</Typography>
                    <Typography variant='caption'>{subtitulo}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}
