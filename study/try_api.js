// fetch("http://swapi.dev/api/people/1")
//   .then(res => res.json())
//   .then(data => console.log(data))

fetch("http://api.imgflip.com/get_memes")
.then(res => res.json())
.then(data => console.log(data.data.memes[0].url)) 
.then(console.log(7)) // what is the difference between 'console.log(7)' and '() => console.log(7)'???????????????????
                      // also, note that 7 is printed first because the fetch takes a bit time and the 'then' doesn't wait
                      // if you wanted it to wait you should have used async await or noams trick is Meme_2 file

// fetch("http://127.0.0.1:8000/api/rooms/4/")
// .then(res => res.json())
// .then(data => console.log(data)) 

// let getRoom = async () => {
//     let response = await fetch('http://127.0.0.1:8000/api/rooms/499/')
//     let rooms = await response.json()
//     console.log(rooms)
// }

// getRoom()