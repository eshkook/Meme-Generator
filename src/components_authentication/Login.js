import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { login_post } from "../api/posts.js";
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: login_post,
        onSuccess: data => {
            if (data.error) {
                // Set the error message
                setErrorMessage(data.error);
            } else {
                // Login was successful, navigate to the logged-in page
                navigate("/You_are_logged", { state: { username: data.username } });
            }
        },
        onError: error => {
            // Handle an error response (status code outside 2xx)
            setErrorMessage(error.message);
        }
    });


    const [formState, setFormState] = useState({
        username: '',
        password: '',
    })

    const [fieldErrorState, setFieldError] = useState({
        username: false,
        password: false,
    })

    function updateFormState(event) {
        const { name, value } = event.target
        setFormState(prevFormState => ({
            ...prevFormState,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault() // preventing re-rendering the page
        const temp_object = {
            username: (formState.username == ''),
            password: (formState.password == ''),
        }
        setFieldError(temp_object)

        if (!(temp_object.username || temp_object.password)) {
            console.log(formState)

            loginMutation.mutate({
                username: formState.username,
                password: formState.password,
            });
        }
    }

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Log in:
            </Typography>
            <br />

            {errorMessage && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        {errorMessage}
                    </Typography>
                    <br />
                </>
            )}

            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
          autoComplete off makes it not complete the user's text */}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <TextField
                        onChange={updateFormState} // same as writing onChange={()=>updateFormState(event)}
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={formState.username}
                        error={fieldErrorState.username}
                    // required  // make a '*' to indicate it is a mandatory field
                    />
                    <TextField
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        value={formState.password}
                        error={fieldErrorState.password}
                    // required  // make a '*' to indicate it is a mandatory field
                    />
                    <Button
                        variant="contained"
                        type='submit'
                        disabled={loginMutation.isLoading}>
                        {loginMutation.isLoading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}

