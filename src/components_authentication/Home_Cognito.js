import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, post_response_count, get_random } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";
import axios from 'axios';

export default function You_are_logged_Cognito() {

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                You are logged!
            </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Logout</Button>
                <Button>Delete Account</Button>
            </ButtonGroup>
        </>
    )
}