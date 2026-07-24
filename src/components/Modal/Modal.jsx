import './Modal.css'

export default function Modal({ show, title, message, buttonText, onClose, variant }) {
  if (!show) return null

  const isSuccess = variant === 'success'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-card ${isSuccess ? 'modal--success' : 'modal--error'}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          {isSuccess ? '🎉' : '💔'}
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <button className="modal-btn" onClick={onClose}>
          {buttonText || '返回苹果树'}
        </button>
      </div>
    </div>
  )
}
