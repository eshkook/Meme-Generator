import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, get_response_count } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

export default function You_are_logged() {

    // const [shouldFetch, setShouldFetch] = useState(false);

    // const handleGetCount = () => {
    //     setShouldFetch(true);
    //     queryClient.invalidateQueries(["response_count"])
    // };

    // const handleGetCount = () => {
    //     responseCountMutation.mutate();
    // };

    const navigate = useNavigate()

    // const queryClient = useQueryClient()

    const [countError, setCountError] = useState(null);

    // const responseCountQuery = useQuery({
    //     queryKey: ["response_count"],
    //     queryFn: ()=>get_response_count(responseCountQuery.data),
    //     onError: error => {
    //         setCountError(error);
    //         console.log(error)
    //     },
    //     enabled: shouldFetch, // prevent fetching on mount,
    //     initialData: 0
    // });

    const [count, setCount] = useState(0);

    const responseCountMutation = useMutation(
        {
            mutationFn: () => get_response_count(count),
            onSuccess: data => {
                setCount(data.count);
            },
            onError: error => {
                setCountError(error);
                console.log(error)
            }
        }
    );

    const [logoutError, setLogoutError] = useState(null);

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

    const [deleteError, setDeleteError] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: delete_post,
        onSuccess: data => {
            navigate("/authentication");
        },
        onError: error => {
            setDeleteError(error);
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

            {deleteError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in delete
                    </Typography>
                    <br />
                </>
            )}

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button
                    variant="contained"
                    onClick={responseCountMutation.mutate}
                    disabled={responseCountMutation.isLoading}>
                    {(responseCountMutation.isLoading) ? "Loading..." : "Get Response Count"}
                </Button>
                <Button
                    variant="contained"
                    onClick={logoutMutation.mutate}
                    disabled={logoutMutation.isLoading}>
                    {logoutMutation.isLoading ? "Loading..." : "Log out"}
                </Button>
                <Button
                    variant="contained"
                    onClick={deleteMutation.mutate}
                    disabled={deleteMutation.isLoading}>
                    {deleteMutation.isLoading ? "Loading..." : "Delete account"}
                </Button>
            </ButtonGroup>
            <br />
            <br />
            <Typography variant="subtitle1" component="h2">
                Count: {count}
            </Typography>
        </>
    )
}