import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { signup_post } from "../api/posts.js";

export default function SignUp() {

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: data => {
            pass //??????????????????????????????????????????????????
        },
    });

    const [formState, setFormState] = useState({
      username: '',
      password: '',
      password_confirmation: '',
      hobbies: '',
      age: null
    })

  const [fieldErrorState, setFieldError] = useState({
      username: false,
      password: false,
      password_confirmation: false,
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
      const temp_object = {
        username: (formState.username == ''),
        password: (formState.password == ''),
        password_confirmation: (formState.password_confirmation != formState.password || formState.password_confirmation == ''), 
    } 
      setFieldError(temp_object)
      
      if (!(temp_object.username || temp_object.password || temp_object.password_confirmation)) {
          console.log(formState)
          
          createPostMutation.mutate({
              username: titleRef.current.value,
              password: bodyRef.current.value,
              hobbies: userIdInt,  // include userId in the mutation data
              age: 3 //
          });
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
                  error = {fieldErrorState.username}
                  // required  // make a '*' to indicate it is a mandatory field
                   />
              <TextField
                  onChange={updateFormState}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={formState.password}
                  error = {fieldErrorState.password}
                  // required  // make a '*' to indicate it is a mandatory field
                   />
              <TextField
                  onChange={updateFormState}
                  id="outlined-basic"
                  label="Password Confirmation"
                  variant="outlined"
                  name="password_confirmation"
                  value={formState.password_confirmation}
                  error = {fieldErrorState.password_confirmation}
                  // required  // make a '*' to indicate it is a mandatory field
                   />     
              <Button variant="contained" type='submit'>Submit</Button>
          </form>
      </>
  )
}



//     const [formState, setFormState] = useState({
//         username: '',
//         password: '',

//       })

//     const [fieldErrorState, setFieldError] = useState({
//         Username: false,
//         Password: false
//       })  

//       function updateFormState(event) { 
//         const {name, value} = event.target
//         setFormState(prevFormState => ({
//           ...prevFormState, 
//           [name]: value
//         }))
//       }
    
//       function handleSubmit(event) { 
//         event.preventDefault() // preventing re-rendering the page 
//         setFieldError({
//             Username: (formState.Username===''),
//             Password: (formState.Password==='')
//         })

//         if (fieldErrorState.Username || fieldErrorState.Password) {
//             console.log(formState)
//             createPostMutation.mutate({
//               title: titleRef.current.value,
//               body: bodyRef.current.value,
//               userId: userIdInt,  // include userId in the mutation data
//           });
//         }    
//       }
    
//     return (
//         <>
//             <Typography variant="subtitle1" component="h1">
//                 Login:
//             </Typography>
//             <br />

//             <form onSubmit={handleSubmit} noValidate autoComplete='off'>
//                 {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
//             autoComplete off makes it not complete the user's text */}

//                 <TextField
//                     onChange={updateFormState} // same as writing onChange={()=>updateFormState(event)}
//                     id="outlined-basic"
//                     label="Username"
//                     variant="outlined"
//                     name="Username"
//                     value={formState.Username}
//                     error = {fieldErrorState.Username}
//                     // required  // make a '*' to indicate it is a mandatory field
//                      />
//                 <TextField
//                     onChange={updateFormState}
//                     id="outlined-basic"
//                     label="Password"
//                     variant="outlined"
//                     name="Password"
//                     value={formState.Password}
//                     error = {fieldErrorState.Password}
//                     // required  // make a '*' to indicate it is a mandatory field
//                      />
//                 <Button variant="contained" type='submit'>Submit</Button>
//             </form>
//         </>
//     )
// }