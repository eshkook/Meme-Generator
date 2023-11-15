import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { signup_post } from "../api/posts.js";
import { useNavigate } from "react-router-dom"

import { useEffect } from "react";
import axios from 'axios';

export default function SignUp_Cognito() {

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const signupMutation = useMutation({
        mutationFn: signup_post,
        onSuccess: data => {
            navigate("/youarelogged_cognito", { state: { user_id: data.user_id } });
        },
        onError: error => {
            setErrorMessage(error);
            console.log(error)
        }
    });

    const [formState, setFormState] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        hobbies: '',
        age: ''
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
        password: false,
        password_confirmation: false,
        age: false
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
            email: (formState.email == ''),
            password: (formState.password == ''),
            password_confirmation: (formState.password_confirmation != formState.password || formState.password_confirmation == ''),
            age: (isNaN(formState.age) || formState.age < 0 || formState.age > 120)
        }
        setFieldError(temp_object)

        if (!(temp_object.email || temp_object.password || temp_object.password_confirmation || temp_object.age)) {
            console.log(formState)

            signupMutation.mutate({
                email: formState.email,
                password: formState.password,
                hobbies: formState.hobbies,
                age: formState.age
            });
        }
    }

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Sign-Up:
            </Typography>
            <br />

            {/* {errorMessage && (
        <>
          <Typography color="error">
            {errorMessage}
          </Typography>
          <br />
        </>
      )} */}

            {(errorMessage && errorMessage.error == 'Invalid credentials') && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Email is already taken
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
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={formState.email}
                        error={fieldErrorState.email}
                        required  // make a '*' to indicate it is a mandatory field
                    />
                    <TextField
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        value={formState.password}
                        error={fieldErrorState.password}
                        required  // make a '*' to indicate it is a mandatory field
                    />
                    <TextField
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Password Confirmation"
                        variant="outlined"
                        name="password_confirmation"
                        value={formState.password_confirmation}
                        error={fieldErrorState.password_confirmation}
                        required  // make a '*' to indicate it is a mandatory field
                    />
                    <TextField
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Hobbies"
                        variant="outlined"
                        name="hobbies"
                        value={formState.hobbies}
                    />
                    <TextField
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Age"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 120 } }}
                        variant="outlined"
                        name="age"
                        value={formState.age}
                        error={fieldErrorState.age}
                    />
                    <Button
                        variant="contained"
                        type='submit'
                        disabled={signupMutation.isLoading}>
                        {signupMutation.isLoading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}

