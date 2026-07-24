import { useState } from 'react'
import './EnterButton.css'

export default function EnterButton({ onClick }) {
  const [ripple, setRipple] = useState(false)

  const handleClick = () => {
    setRipple(true)
    setTimeout(() => setRipple(false), 600)
    onClick?.()
  }

  return (
    <button
      className={`btn-enter ${ripple ? 'btn-enter--ripple' : ''}`}
      onClick={handleClick}
    >
      <img
        src="/assets/apple/apple.png"
        alt=""
        className="btn-enter-icon"
      />
      <span className="btn-enter-text">进入</span>
    </button>
  )
}
