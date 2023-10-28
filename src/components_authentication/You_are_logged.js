import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, get_timestamp } from "../api/posts.js";
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export default function You_are_logged() {

    const navigate = useNavigate()

    const queryClient = useQueryClient() // with this hook we determine later where we want to refetch data
    const postsQuery = useQuery({ // it is like a "get" request
        queryKey: ["posts"], // a unique identifier for your query
        // queryFn: () => Promise.reject("Error Message"),
        queryFn: () => wait(1000).then(() => [...POSTS]),
    })
    const signupMutation = useMutation({
        mutationFn: signup_post,
        onSuccess: data => {
            // if (?????????) {
            //    navigate("/You_are_logged", { state: "????????" })
            // }
        },
    });

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                You are logged!
            </Typography>
            <br />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>
                    Ask for timestamp
                </Button>
                <Button>
                    Log out
                </Button>
            </ButtonGroup>
        </>

    )
}