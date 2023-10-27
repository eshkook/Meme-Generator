import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function Login() {


    return (
        <>
            <h1>Login:</h1>
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Button variant="contained">Submit</Button>


            </>


            )
}