import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { signup_cognito_post } from "../api/posts.js";
import { useNavigate } from "react-router-dom"
import { isValidPassword, isValidEmail } from "./Validations.js";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

export default function SignUp_Cognito() {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => (!showPassword));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const signupCognitoMutation = useMutation({
        mutationFn: signup_cognito_post,
        onSuccess: data => {
            console.log('Response data:', data);
            navigate("/confirmation_cognito", {
                state: {
                    email: formState.email
                }
            });
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        password_confirmation: '',
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
        password: false,
        password_confirmation: false,
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
            email: !isValidEmail(formState.email),
            password: !isValidPassword(formState.password),
            password_confirmation: (formState.password_confirmation != formState.password || !isValidPassword(formState.password_confirmation)),
            // age: (isNaN(formState.age) || formState.age < 0 || formState.age > 120)
        }
        setFieldError(temp_object)

        if (!(temp_object.email || temp_object.password)) {

            console.log(formState)

            signupCognitoMutation.mutate({
                email: formState.email,
                password: formState.password,
            });
        } else {
            setErrorMessage("Fields in red are invalid")
        }
    }

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Sign-Up:
            </Typography>
            <br />

            {errorMessage && (
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
                        id="email-input"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={formState.email}
                        error={fieldErrorState.email}
                        required  // make a '*' to indicate it is a mandatory field
                        autoFocus
                    />
                    <TextField
                        onChange={updateFormState}
                        onPaste={(event) => {
                            event.preventDefault();
                            setErrorMessage("Password requires manual typing")
                        }}
                        id="password-input"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formState.password}
                        error={fieldErrorState.password}
                        required  // adds a '*' to indicate it is a mandatory field
                        InputProps={{ // <-- This is the part that adds the toggle button
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        onChange={updateFormState}
                        onPaste={(event) => {
                            event.preventDefault();
                            setErrorMessage("Password requires manual typing")
                        }}
                        id="password-confirmation-input"
                        label="Password Confirmation"
                        variant="outlined"
                        name="password_confirmation"
                        type={showPassword ? 'text' : 'password'}
                        value={formState.password_confirmation}
                        error={fieldErrorState.password_confirmation}
                        required  // adds a '*' to indicate it is a mandatory field
                        InputProps={{ // <-- This is the part that adds the toggle button
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <TextField
                        onChange={updateFormState}
                        id="hobbies-input"
                        label="Hobbies"
                        variant="outlined"
                        name="hobbies"
                        value={formState.hobbies}
                    />
                    <TextField
                        onChange={updateFormState}
                        id="age-input"
                        label="Age"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 120 } }}
                        variant="outlined"
                        name="age"
                        value={formState.age}
                        error={fieldErrorState.age}
                    /> */}
                    <Button
                        variant="contained"
                        type='submit'
                        disabled={signupCognitoMutation.isLoading}>
                        {signupCognitoMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                        {/* {signupCognitoMutation.isLoading ? "Loading..." : "Submit"} */}
                    </Button>
                </div>
            </form>
        </>
    )
}
