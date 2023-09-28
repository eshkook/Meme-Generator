import { useState, useEffect } from "react"
import imageIcon from "../images/image-icon.png"

export default function Meme_3() {
  const [memeState, setMemeState] = useState({ // why not initiating it inside the useEffect directly with the fetch value?
                                               // (and then not have setMemeState in the useEffect)
                                               // answer: it is not a good practice, ask gpt for more details
    topText: '',
    bottomText: '',
    img: ''
  })

//   const [imagesState, setImagesState] = useState([])

  function updateMeme(event) {
    const { name, value } = event.target

    if (name) {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        [name]: value
      }))
    } else {
        getImage()
  }
  }

  function getImage() {
    axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/image/', { timeout: 5000 }) 
    // .then(res => res.json()) 
    .then(data => {  
    // const mappedMemes = data.data.memes.map(meme => meme.url) 
    // setImagesState(mappedMemes) 
    setMemeState(prevMemeState => ({
        ...prevMemeState,
        img: data.data
    }))
    })  
    .catch(err => console.error(err))
  }

  useEffect(() => {
    getImage()
  }, [])

  return (
    <main>
      <div className="form">
        <div className="input-text-row">
          <input
            onChange={updateMeme}
            className="top-text-bar"
            type="text"
            placeholder="top text"
            name="topText"
            value={memeState.topText}>
          </input>
          <input
            onChange={updateMeme}
            className="bottom-text-bar"
            type="text"
            placeholder="bottom text"
            name="bottomText"
            value={memeState.bottomText}>
          </input>
        </div>
        <button onClick={updateMeme} className="get-new-image-button">
          <p>Get a new meme image</p>
          <img src={imageIcon} />
        </button>
      </div>
      <div className="meme">
        <img className="meme-image" src={memeState.img} />
        <div className="text-flex">
          <p className="top-text">{memeState.topText.toUpperCase()}</p>
          <p className="bottom-text">{memeState.bottomText.toUpperCase()}</p>
        </div>
      </div>
    </main>
  )
}