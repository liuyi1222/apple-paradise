import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'
import './StoryPages.css'

const WRONG_OPTIONS = {
  B: '绿老头（INTJ）',
  C: '快乐小狗（ENFP）',
  D: '小画家（ISFP）',
}

const WRONG_OPTIONS_2 = {
  B: '骂她',
  C: '贬低她',
  D: '不理她',
}

export default function MBTIStory() {
  const [step, setStep] = useState(1)
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()

  const goTree = () => navigate('/tree')

  const handleWrong = (label) => {
    setModal({
      title: '你失去了00',
      message: `「${label}」不是00的答案`,
      onClose: goTree,
    })
  }

  // ===== 第一关 =====
  if (step === 1) {
    return (
      <div className="story-page">
        <h2 className="story-title">00的MBTI是什么？</h2>

        <div className="story-options">
          <button className="story-option-btn" onClick={() => setStep(2)}>
            A. 小蝴蝶（INFP）
          </button>
          {Object.entries(WRONG_OPTIONS).map(([key, label]) => (
            <button className="story-option-btn" key={key} onClick={() => handleWrong(label)}>
              {key}. {label}
            </button>
          ))}
        </div>

        <Modal
          show={!!modal}
          title={modal?.title}
          message={modal?.message}
          onClose={modal?.onClose}
        />
      </div>
    )
  }

  // ===== 第二关 =====
  return (
    <div className="story-page">
      <h2 className="story-title">如何正确饲养一只小蝴蝶？</h2>

      <div className="story-options">
        <button className="story-option-btn" onClick={() => setModal({
          title: '🎉恭喜你通过了这一关！',
          message: '你成功饲养了一只小蝴蝶 🦋',
          variant: 'success',
          onClose: goTree,
        })}>
          A. 亲亲她
        </button>
        {Object.entries(WRONG_OPTIONS_2).map(([key, label]) => (
          <button className="story-option-btn" key={key} onClick={() => handleWrong(label)}>
            {key}. {label}
          </button>
        ))}
      </div>

      <Modal
        show={!!modal}
        title={modal?.title}
        message={modal?.message}
        buttonText={modal?.variant === 'success' ? '返回苹果树' : '返回苹果树'}
        onClose={modal?.onClose}
        variant={modal?.variant}
      />
    </div>
  )
}
