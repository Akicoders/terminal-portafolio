// export const random = () => {
//   // Function to attach event listeners to an input element
//   const attachListenersToInput = (inputElement: HTMLInputElement) => {
//     // Handle keyboard events for this input
//     inputElement.addEventListener("keydown", (event: KeyboardEvent) => {
//       var randomKey = event.key
//       // This could be modified for additional functionality
//       console.log(`Key pressed in input: ${event.key}`, randomKey)
//       event.preventDefault()
//       // Prevent default behavior
//     })
//     // Handle mouse events for this input
//     inputElement.addEventListener("mousedown", (event: MouseEvent) => {
//       console.log(`Mouse button pressed in input: ${event.button}`)
//       // Additional modifications can be done here
//     })
//   }
//   // When the DOM is fully loaded
//   document.addEventListener("DOMContentLoaded", () => {
//     // Select all input elements
//     const inputs = document.querySelectorAll("input")
//     inputs.forEach((input) => {
//       // Attach event listeners to each input element
//       attachListenersToInput(input as HTMLInputElement)
//     })
//   })
// }
