export const enigma = async (
  args: string[],
  callback?: (value: string) => string,
): Promise<string> => {
  if (args.length === 0) {
    return `
      I am a number, studied by thinkers,
      Only clear in deepest reflections.
      I am a chain, that keeps the paradoxes of existence,
      A fade into the clarity of knowledge.
      I am the shadow, in discussions of time and space, 
      A light in the nature of reality.
      
      Who am I?

      Code enigma following by the number to answer.
      `
  }

  switch (args[0]) {
    case "Pi":
      return "A number.."
    case "3,14":
      return "In another multiverse maybe.."
    case "3.14":
      return "In another multiverse maybe.."

    case "1,618":
      return "Almost possible.."

    case "42":
      return "You don't ask the right question."

    case "h":
      return "A number.."

    case "6,626 x 10-34":
      return "Smart choice, but no."

    case "299 792,458":
      return "Nice try but.. No."
    case "0112358132134":
      return "You impress me.. No."

    case "random":
      return "Almost.."
    case "Math.random()":
      return `43°52'13.0"N 146°51'32.1"E Take a picture, it's just a journey.`
    default:
      return "You're far from reality."
  }
}
