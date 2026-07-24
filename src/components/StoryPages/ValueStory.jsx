import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import './StoryPages.css'

export default function ValueStory() {
  const [step, setStep] = useState(1)
  const [inputValue, setInputValue] = useState('')
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()

  const goTree = () => navigate('/tree')

  const handleLose = () => {
    setModal({
      title: '你失去了00',
      message: '也许你还不够了解她',
      onClose: goTree,
    })
  }

  // ===== 第一关：排序问题 =====
  if (step === 1) {
    return (
      <div className="story-page">
        <h2 className="story-title">
          生命、爱、自由、生活，<br/>00会如何排序？
        </h2>

        <input
          className="story-input"
          type="text"
          placeholder="请输入你的排序"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <p className="story-hint">你想知道00的答案吗？</p>

        <div className="story-actions">
          <button className="story-action-btn" onClick={() => setStep(2)}>想</button>
          <button className="story-action-btn" onClick={handleLose}>不想</button>
        </div>

        <Modal show={!!modal} title={modal?.title} message={modal?.message} onClose={modal?.onClose} />
      </div>
    )
  }

  // ===== 第二关：00的答案 =====
  return (
    <div className="story-page">
      <h2 className="story-title">00的答案</h2>

      <p className="story-answer">爱 ＞ 自由 ＞ 生命 ＞ 生活</p>
      <p className="story-hint">想知道理由吗？</p>

      <div className="story-actions">
        <button className="story-action-btn" onClick={() => setModal({
          title: '🎉恭喜你',
          message: '你明白了爱00的终极秘密！',
          variant: 'success',
          onClose: goTree,
        })}>想</button>
        <button className="story-action-btn" onClick={handleLose}>不想</button>
      </div>

      <Modal
        show={!!modal}
        title={modal?.title}
        message={modal?.message}
        onClose={modal?.onClose}
        variant={modal?.variant}
      />
    </div>
  )
}
