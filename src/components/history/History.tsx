import React from "react"
import {History as HistoryItem} from "../../interfaces/history"
import {Ps1} from "../ps1"

interface Props {
  history: HistoryItem[]
}

export const History: React.FC<Props> = ({history}) => {
  return (
    <>
      {history.map((item) => (
        <div key={item.id} className="terminal-entry">
          {item.command ? (
            <div className="terminal-command-row">
              <Ps1 />
              <span className="terminal-command">{item.command}</span>
            </div>
          ) : null}

          {item.output ? (
            <pre className="terminal-output">{item.output}</pre>
          ) : null}
        </div>
      ))}
    </>
  )
}

export default History
