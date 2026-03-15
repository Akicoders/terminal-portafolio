const curiosities = [
  "El primer bug informatico documentado fue una polilla real en 1947.",
  "TypeScript se publico por primera vez en 2012 para escalar apps JS grandes.",
  "El comando 'sudo' significa 'superuser do'.",
  "El termino 'fullstack' se popularizo cuando el frontend y backend empezaron a separarse.",
  "Las terminales modernas siguen usando muchas convenciones de Unix de los 70s.",
]

export const curiosity = async (args: string[]): Promise<string> => {
  if (args[0] === "all") {
    return curiosities.map((fact, index) => `${index + 1}. ${fact}`).join("\n")
  }

  const randomFact = curiosities[Math.floor(Math.random() * curiosities.length)]
  return `Curiosidad: ${randomFact}\n\nTip: usa 'curiosity all' para ver todas.`
}
