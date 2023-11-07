import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { get_calendar } from "../api/posts.js";
import { useState } from "react";

export default function You_are_logged() {

    const queryClient = useQueryClient()

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleGetRandomNumber = () => {
        setShouldFetch(true);
        queryClient.invalidateQueries(["random"])
    };

    const [randomError, setRandomError] = useState(null);

    const randomQuery = useQuery({
        queryKey: ["random"],
        queryFn: () => get_calendar,
        onError: error => {
            setRandomError(error);
            console.log(error)
        },
        enabled: shouldFetch, // prevent fetching on mount,
        // initialData: 0
    });

    return (
        <>
            {randomError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in random
                    </Typography>
                    <br />
                </>
            )}
            <Button
                variant="contained"
                onClick={handleGetRandomNumber}
                disabled={randomQuery.isLoading}>
                {(randomQuery.isLoading) ? "Loading..." : "Get Random integer"}
            </Button>
            {shouldFetch && (  // Conditionally render the error message
                <>
                    <Typography variant="subtitle1" component="h2">
                        Press Random: {randomQuery}
                    </Typography>
                    <br />
                </>
            )}
        </>
    )
}