var audioPath = ["/poem1.mp3", "/yahou.mp3", "/poem2.mp3", "/poem3.mp3"]
function getRandomElementFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

// Use the function to get a random value from the array
var randomAudio = getRandomElementFromArray(audioPath)
export const curiosity = async (args?: string[]): Promise<string> => {
  var audio = new Audio(`${randomAudio}`)
  audio.play()
  return "Loading.."
}
