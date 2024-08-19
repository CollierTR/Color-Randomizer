import { useState } from "react"

function App() {

  const [color, setColor] = useState('#475766')
  const [colorFormat, setColorFormat] = useState('hex')
  const [colorName, setColorName] = useState("Deep Space Sparkle")
  const [textColor, setTextColor] = useState('#ffffff')
  const [border, setBorder] = useState('2px solid #ffffff')

  function getRandomHexColor() {
    // Generate a random integer between 0 and 16777215 (which corresponds to #000000 to #FFFFFF)
    const randomInt = Math.floor(Math.random() * 16777216);
    // Convert the integer to a hex string and pad with zeros if necessary
    const hexColor = randomInt.toString(16).padStart(6, "0");
    return hexColor;
  }



  function changeColor() {


    const randomColor = getRandomHexColor();


    console.log(`Changing color to ${randomColor}`)


    fetch(`https://www.thecolorapi.com/id?hex=${randomColor}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(data.name)
        setColorName(data.name.value)
        setTextColor(data.contrast.value)
        setBorder("2px solid" + data.contrast.value)

        if (colorFormat == 'hex') {
          setColor(`#${randomColor}`)
        } else if (colorFormat == 'hsl') {
          setColor(data.hsl.value)
        } else {
          setColor(data.rgb.value)
        }

      })
      .catch(error => console.error("Error:", error))



  }

  return (

    <main className={`w-screen h-screen flex flex-col text-center justify-center place-items-center gap-10`} style={{ backgroundColor: color, color: textColor }}>

      <div className="flex gap-3">
        <button onClick={() => setColorFormat('hex')} style={colorFormat == 'hex' ? { backgroundColor: textColor, color: color } : { border: border }} className={`py-2 text-xl px-8 rounded-full`}>Hex</button>
        <button onClick={() => setColorFormat('rgb')} style={colorFormat == 'rgb' ? { backgroundColor: textColor, color: color } : { border: border }} className={`py-2 text-xl px-8 rounded-full`}>RGB</button>
        <button onClick={() => setColorFormat('hsl')} style={colorFormat == 'hsl' ? { backgroundColor: textColor, color: color } : { border: border }} className={`py-2 text-xl px-8 rounded-full`}>HSL</button>
      </div>

      <button onClick={changeColor} className="border-2  rounded-full py-3 px-10 text-5xl" style={{ border: border }}>Change Color</button>

      <p className="text-5xl pt-6">{colorName}</p>
      <p className="text-3xl pt-2">{color}</p>

    </main>

  )
}

export default App
