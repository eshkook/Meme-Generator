const axios = require('axios')
// fetch("http://swapi.dev/api/people/1")
//   .then(res => res.json())
//   .then(data => console.log(data))

// fetch("http://api.imgflip.com/get_memes")
// .then(res => res.json())
// .then(data => console.log(data.data.memes[0].url)) 
// .then(() => console.log(7)) // what is the difference between 'console.log(7)' and '() => console.log(7)'?
//                             // '() => console.log(7)' is a function, that will bw resolved only when the promise it 
//                             // is attatched to is resolved. on the other hand, 'console.log(7)' is not a function but a function call,
//                             // which must excecute as the code reaches it

// fetch("http://127.0.0.1:8000/api/rooms/4/")
// .then(res => res.json())
// .then(data => console.log(data)) 

// let getRoom = async () => {
//     let response = await fetch('http://127.0.0.1:8000/api/rooms/499/')
//     let rooms = await response.json()
//     console.log(rooms)
// }

// getRoom()

// fetch("http://127.0.0.1:8000/api/image/")
// .then(res => res.json())
// .then(data => console.log(data)) 

axios
    .get('http://127.0.0.1:8000/api/image/', { timeout: 5000 }) 
    // .then(res => res.json()) 
    .then(data => console.log(data.data))