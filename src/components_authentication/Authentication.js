import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom"
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Authentication() {
    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Link to= {'/login'} >
                <Button>Login</Button>
            </Link>
            <Link to= {'/signup'} >
                <Button>Sign Up</Button>
            </Link>
            </ButtonGroup>
        </>
    );
}


