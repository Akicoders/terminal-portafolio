const enigmas = [
  {
    question:
      "Tengo llaves pero no puertas, tengo espacio pero no cuartos. ?Que soy?",
    answer: "Un teclado.",
  },
  {
    question:
      "Cuanto mas codigo limpio escribes, menos deuda tecnica acumulas. ?Que practica representa esto?",
    answer: "Refactorizacion continua.",
  },
  {
    question:
      "Vivo en pipelines y despliegues, y si fallo detengo lanzamientos. ?Que soy?",
    answer: "Una prueba automatizada.",
  },
]

export const enigma = async (args: string[]): Promise<string> => {
  if (args[0] === "answer") {
    return "Usa 'enigma' para obtener un nuevo reto y tratar de resolverlo primero."
  }

  const selected = enigmas[Math.floor(Math.random() * enigmas.length)]

  return `Enigma:\n${selected.question}\n\nRespuesta:\n${selected.answer}`
}
