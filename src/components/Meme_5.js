import { useState } from "react"
import imageIcon from "../images/image-icon.png"
import { useQuery } from "@tanstack/react-query"
import { getImage } from "../api/posts.js";

export default function Meme_5() {

  const postsQuery = useQuery({ // it is like a "get" request
    queryKey: ["posts"], // a unique identifier for your query
    queryFn: getImage
  })

  const [memeState, setMemeState] = useState({ // why not initiating it inside the useEffect directly with the fetch value?
                                               // (and then not have setMemeState in the useEffect)
                                               // answer: it is not a good practice, ask gpt for more details
    topText: '',
    bottomText: '',
    img: ''
  })

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
        img: response.data
        }));
  }
  }
  
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