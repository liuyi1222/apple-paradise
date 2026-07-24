import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Modal from '../Modal/Modal'
import './StoryPages.css'

const WRONG_OPTIONS = {
  A: '熊出没',
  B: '悬疑片',
  C: '恐怖片',
}

export default function CinemaStory() {
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()

  const goTree = () => navigate('/tree')

  const handleWrong = (label) => {
    setModal({
      title: '你失去了00',
      message: `00不会选「${label}」`,
      onClose: goTree,
    })
  }

  const handleLose = () => {
    setModal({
      title: '你失去了00',
      message: '看来你还没有准备好',
      onClose: goTree,
    })
  }

  // 提交留言到 Supabase
  const handleSubmit = async () => {
    const trimmed = message.trim()
    if (!trimmed) {
      setModal({
        title: '提示',
        message: '请先写下你想对00说的话哦~',
        onClose: () => setModal(null),
      })
      return
    }

    setSubmitting(true)
    let saveError = false

    try {
      const { error } = await supabase
        .from('messages')
        .insert({ content: trimmed })

      if (error) {
        console.warn('[留言提交] Supabase 写入失败:', error.message)
        saveError = true
      }
    } catch (err) {
      console.warn('[留言提交] 网络错误:', err.message)
      saveError = true
    }

    setSubmitting(false)

    setModal({
      title: '谢谢你',
      message: saveError
        ? '你的话00收到了~\n（留言已保存在本地）'
        : '谢谢你来到苹果乐园，\n你的话00收到了。',
      variant: 'success',
      onClose: goTree,
    })
  }

  // ===== 第一关：选电影 =====
  if (step === 1) {
    return (
      <div className="story-page">
        <h2 className="story-title">
          如果电影院会放四部电影，<br/>00会选哪部呢？
        </h2>

        <div className="story-options">
          <button className="story-option-btn" onClick={() => handleWrong('熊出没')}>
            A. 熊出没
          </button>
          <button className="story-option-btn" onClick={() => handleWrong('悬疑片')}>
            B. 悬疑片
          </button>
          <button className="story-option-btn" onClick={() => handleWrong('恐怖片')}>
            C. 恐怖片
          </button>
          <button className="story-option-btn" onClick={() => setStep(2)}>
            D. 文艺爱情片
          </button>
        </div>

        <Modal show={!!modal} title={modal?.title} message={modal?.message} onClose={modal?.onClose} />
      </div>
    )
  }

  // ===== 第二关：愿意永远爱00 =====
  if (step === 2) {
    return (
      <div className="story-page">
        <h2 className="story-title">那你愿意永远爱00吗？</h2>

        <div className="story-actions">
          <button className="story-action-btn" onClick={() => setStep(3)}>愿意</button>
          <button className="story-action-btn" onClick={handleLose}>不愿意</button>
        </div>

        <Modal show={!!modal} title={modal?.title} message={modal?.message} onClose={modal?.onClose} />
      </div>
    )
  }

  // ===== 第三关：对00说一句话 =====
  return (
    <div className="story-page">
      <h2 className="story-title">你最想对00说的一句话是什么</h2>

      <textarea
        className="story-textarea"
        placeholder="写下你想说的话..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting}
      />

      <button
        className="story-action-btn"
        style={{ padding: '12px 48px' }}
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? '提交中...' : '提交'}
      </button>

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
