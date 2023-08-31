import { useState, useEffect } from "react"
import imageIcon from "../images/image-icon.png"


export default function Meme_2() {

  // const [State, setState] = useState(1)
  // function updateState() {
  //   setState(prevState => prevState+1)
  // }

  const [memeState, setMemeState] = useState({
    topText: '',
    bottomText: '',
    img: ""
  })

  const [imagesState, setImagesState] = useState([])

  function updateMeme(event) {
    const { name, value } = event.target

    if (name) {
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        [name]: value
      }))
    } else {
      
      
      setMemeState(prevMemeState => ({
        ...prevMemeState,
        img: imagesState[Math.floor(Math.random()*imagesState.length)]
    }))
  }
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => {  // to use async instead the 'then's watch youtube 9:46:00
        const mappedMemes = data.data.memes.map(meme => meme.url) // this command will not be skipped until finished, unlike setting states
        setImagesState(mappedMemes)
        setMemeState(prevMemeState => ({
          ...prevMemeState,
          img: mappedMemes[Math.floor(Math.random()*mappedMemes.length)]
        }))
      })
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