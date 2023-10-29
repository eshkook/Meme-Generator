import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, get_timestamp } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export default function You_are_logged() {

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleGetTimestamp = () => {
        setShouldFetch(true);  
        queryClient.invalidateQueries(["timestamp"]) 
    };

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const timestampQuery = useQuery({
        queryKey: ["timestamp"],
        queryFn: get_timestamp,
        enabled: shouldFetch // prevent fetching on mount
    })

    const logoutMutation = useMutation({
        mutationFn: logout_post,
        onSuccess: data => {
            // if (?????????) {
            //    navigate("/authentication", { state: "????????" })
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
                <Button
                    variant="contained"
                    // onClick={() => queryClient.invalidateQueries(["timestamp"])}
                    onClick={handleGetTimestamp}
                    disabled={shouldFetch && timestampQuery.isLoading}>
                    {(shouldFetch && timestampQuery.isLoading) ? "Loading..." : "Get timestamp"}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isLoading}>
                    {logoutMutation.isLoading ? "Loading..." : "Log out"}
                </Button>
            </ButtonGroup>
            <br />
            <Typography variant="subtitle1" component="h2">
                {timestampQuery.data && (`Timestamp: ${timestampQuery.data}`)}
            </Typography>
        </>

    )
}