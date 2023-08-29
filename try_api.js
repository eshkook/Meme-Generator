// fetch("http://swapi.dev/api/people/1")
//   .then(res => res.json())
//   .then(data => console.log(data))

fetch("http://api.imgflip.com/get_memes")
.then(res => res.json())
.then(data => console.log(data.data.memes[0].url))  

