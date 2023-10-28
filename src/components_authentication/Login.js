import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function Login() {

    const [formState, setFormState] = useState({
        Username: '',
        Password: ''
      })

      function updateFormState(event) { 
        const {name, value} = event.target
        setFormState(prevFormState => ({
          ...prevFormState, 
          [name]: value
        }))
      }
    
      function handleSubmit(event) { 
        event.preventDefault() // preventing re-rendering the page 
        console.log(formState)
        // api send the data submitted
      }
    
    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Login:
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
                    name="Username"
                    value={formState.Username}
                    // required  // make a '*' to indicate it is a mandatory field
                     />
                <TextField
                    onChange={updateFormState}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    name="Password"
                    value={formState.Password}
                    // required  // make a '*' to indicate it is a mandatory field
                     />
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </>
    )
}