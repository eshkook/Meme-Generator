import Logo from "../images/pig_2.jpg"

export default function Header() {
  return (
    <header>
      <img style={{ backgroundColor: "transparent" }} src={Logo} />
      <h2>Meme Generator</h2>
      <h4>React Course - Project 3</h4>
    </header>
    
  )
}