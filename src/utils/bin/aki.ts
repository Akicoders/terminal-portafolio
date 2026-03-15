export const aki = async (): Promise<string> => {
  window.open("/aki", "_self")
  return "Opening Aki Assistant..."
}
