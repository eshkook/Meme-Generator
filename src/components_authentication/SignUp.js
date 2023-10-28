import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { signup_post } from "../api/posts.js";

export default function SignUp() {

  const createPostMutation = useMutation({
    mutationFn: signup_post,
    onSuccess: data => {
      pass //??????????????????????????????????????????????????
    },
  });

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    hobbies: '',
    age: ''
  })

  const [fieldErrorState, setFieldError] = useState({
    username: false,
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
      username: (formState.username == ''),
      password: (formState.password == ''),
      password_confirmation: (formState.password_confirmation != formState.password || formState.password_confirmation == ''),
    }
    setFieldError(temp_object)

    if (!(temp_object.username || temp_object.password || temp_object.password_confirmation)) {
      console.log(formState)

      // createPostMutation.mutate({
      //     username: formState.username,
      //     password: formState.password,
      //     hobbies: formState.hobbies,  
      //     age: formState.age
      // });
    }
  }

  return (
    <>
      <Typography variant="subtitle1" component="h1">
        Sign-Up:
      </Typography>
      <br />

      <form onSubmit={handleSubmit} noValidate autoComplete='off'>
        {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
          autoComplete off makes it not complete the user's text */}

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
        <TextField
          onChange={updateFormState}
          id="outlined-basic"
          label="Password Confirmation"
          variant="outlined"
          name="password_confirmation"
          value={formState.password_confirmation}
          error={fieldErrorState.password_confirmation}
        // required  // make a '*' to indicate it is a mandatory field
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
          variant="outlined"
          name="age"
          value={formState.age}
        />
        <Button variant="contained" type='submit'>Submit</Button>
      </form>
    </>
  )
}

