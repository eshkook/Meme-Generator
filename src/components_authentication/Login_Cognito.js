import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { login_post } from "../api/posts.js";
import { useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

export default function Login_Cognito() {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => (!showPassword));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: login_post,
        onSuccess: data => {
            navigate("/youarelogged_cognito", { state: { email: data.email } });
        },
        onError: error => {
            setErrorMessage(error);
            console.log(error)
        }
    });

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
        password: false,
    })

    function updateFormState(event) {
        const { name, value } = event.target
        setFormState(prevFormState => ({
            ...prevFormState,
            [name]: value
        }))
    }

    // # Password minimum length
    // # 8 character(s)
    // # Password requirements
    // # Contains at least 1 number
    // # Contains at least 1 special character
    // # Contains at least 1 uppercase letter
    // # Contains at least 1 lowercase letter
    // # Temporary passwords set by administrators expire in
    // # 7 day(s)

    function isValidPassword(password) {
        const minLength = 8;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;

        if (password.length < minLength) {
            return false;
        }
        if (!hasNumber.test(password)) {
            return false;
        }
        if (!hasSpecialChar.test(password)) {
            return false;
        }
        if (!hasUpperCase.test(password)) {
            return false;
        }
        if (!hasLowerCase.test(password)) {
            return false;
        }
        return true;
    }

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    function handleSubmit(event) {
        event.preventDefault() // preventing re-rendering the page
        const temp_object = {
            email: !isValidEmail(formState.email),
            password: !isValidPassword(formState.password),
        }
        setFieldError(temp_object)

        if (!(temp_object.email || temp_object.password)) {
            console.log(formState)

            loginMutation.mutate({
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
                Log in:
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
                        label="User Email"
                        variant="outlined"
                        name="email"
                        value={formState.email}
                        error={fieldErrorState.email}
                    // required  // make a '*' to indicate it is a mandatory field
                    />
                    <TextField
                        onChange={updateFormState}
                        // onPaste={(event) => {
                        //     event.preventDefault();
                        //     setErrorMessage("Password requires manual typing")
                        // }}
                        id="password-input"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        name="password"
                        value={formState.password}
                        error={fieldErrorState.password}
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

