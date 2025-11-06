// ConfirmContext.js
import React, {createContext, useState, useContext} from "react"

const ConfirmContext = createContext({
  showConfirmation: false,
  setShowConfirmation: (confirm) => {},
})

export const useConfirmContext = () => useContext(ConfirmContext)

export const ConfirmProvider = ({children}) => {
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <ConfirmContext.Provider value={{showConfirmation, setShowConfirmation}}>
      {children}
    </ConfirmContext.Provider>
  )
}
