import {getBio} from "../../api"

export const about = async (args: string[]): Promise<string> => {
  return `
  The Hana Sachiko Company, Inc. is a storytelling enterprise founded by Oussama Ammar.\n
  In pursuit of his vision, he began developing an AI dedicated to storytelling. Named Hana Sachiko, this AI would eventually lend its name to the studio.\n
  Currently, Hana is engaged in various productions, eagerly anticipating the opportunity to share them with the world.\n\n`
}
