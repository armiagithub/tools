import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function ButtonGrid({ buttons }) {
  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
      {buttons.map((btn, i) => (
        <Grid item key={i} xs={10} sm={6} md={3}>
          <Link href={btn.href} passHref legacyBehavior>
            <CardActionArea component="a">
              <Card sx={{
                height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #2196f3 0%, #e040fb 100%)',
                color: '#fff', fontWeight: 700, boxShadow: 6
              }}>
                <Typography variant="h5">{btn.label}</Typography>
              </Card>
            </CardActionArea>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}