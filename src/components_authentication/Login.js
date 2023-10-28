import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function Login() {

    const [formState, setFormState] = useState({
        topText: '',
        bottomText: ''
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
            <Typography variant="subtitle1" component="h2">
                Login
            </Typography>

            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
            autoComplete off makes it not complete the user's text */}

                <TextField
                    onChange={updateFormState}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    // required
                     />
                <TextField
                    onChange={updateFormState}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    // required
                     />
                <Button variant="contained">Submit</Button>
            </form>
        </>
    )
}