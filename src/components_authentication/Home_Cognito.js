import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { delete_cognito_post, logout_cognito_post } from "../api/posts.js";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query"

export default function You_are_logged_Cognito() {

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn: logout_cognito_post,
        onSuccess: data => {
            // navigate("/login_cognito") //, { state: { } });
            console.log("logout success")
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const deleteMutation = useMutation({
        mutationFn: delete_cognito_post,
        onSuccess: data => {
            // navigate("/signup_cognito") //, { state: { } });
            console.log("delete success")
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Welcome to Home page!
            </Typography>

            {errorMessage && (
                <>
                    <Typography variant="body2" color="error">
                        {errorMessage}
                    </Typography>
                    <br />
                </>
            )}

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => logoutMutation.mutate()}
                    style={{ marginRight: '10px' }}
                >
                    Logout
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteMutation.mutate()}
                >
                    Delete Account
                </Button>
            </ButtonGroup>
        </>
    )
}