import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, get_response_count } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export default function You_are_logged() {

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleGetCount = () => {
        setShouldFetch(true);  
        queryClient.invalidateQueries(["response_count"]) 
    };

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const [countError, setCountError] = useState(null);

    const responseCountQuery = useQuery({
        queryKey: ["response_count"],
        queryFn: ()=>get_response_count,
        onError: error => {
            setCountError(error);
            console.log(error)
        },
        enabled: shouldFetch // prevent fetching on mount
    });

    const [logoutError, setLogoutError] = useState(null);

    // const logoutMutation = useMutation({
    //     mutationFn: logout_post,
    //     onSuccess: data => {
    //         if (data.detail === "Logout successful.") {
    //             navigate("/authentication");
    //         } else {
    //             // Handle any unexpected successful response
    //             setLogoutError("Logout failed. Please try again.");
    //         }
    //     },
    //     onError: error => {
    //         // Assuming the error object has a message property
    //         setLogoutError(error.message);
    //     },
    // });

    const logoutMutation = useMutation({
        mutationFn: logout_post,
        onSuccess: data => {
            navigate("/authentication");
        },
        onError: error => {
            setLogoutError(error);
            console.log(error)
        }
    });
    
    return (
        <>
            <Typography variant="subtitle1" component="h1">
                You are logged!
            </Typography>
            <br />

            {countError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in count
                    </Typography>
                    <br />
                </>
            )}

            {logoutError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in logout
                    </Typography>
                    <br />
                </>
            )}

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button
                    variant="contained"
                    onClick={handleGetCount}
                    disabled={shouldFetch && responseCountQuery.isLoading}>
                    {(shouldFetch && responseCountQuery.isLoading) ? "Loading..." : "Get timestamp"}
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
                {responseCountQuery.data && (`Count: ${responseCountQuery.data}`)}
            </Typography>
        </>

    )
}