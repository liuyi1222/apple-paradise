import './Character.css'

export default function Character() {
  return (
    <div className="home-character-area">
      {/* 对话气泡 */}
      <div className="speech-bubble">
        <p className="speech-text">欢迎来到00的苹果乐园</p>
      </div>

      {/* 小女孩 */}
      <div className="girl-wrapper">
        <div className="girl-shadow" />
        <img
          src="/assets/girl/微信图片_20260724222122_373_2.jpg"
          alt="小女孩"
          className="girl-image"
        />
      </div>
    </div>
  )
}
