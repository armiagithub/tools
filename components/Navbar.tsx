import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Modern Tool Site
          </Typography>
          <Button color="inherit" component={Link} href="/">Home</Button>
          <Button color="inherit" component={Link} href="/calculator">Calculator</Button>
          <Button color="inherit" component={Link} href="/history">History</Button>
          {session ? (
            <>
              <Typography sx={{ mx: 2 }}>{session.user?.email}</Typography>
              <Button color="inherit" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}