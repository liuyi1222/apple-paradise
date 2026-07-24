import { useState } from 'react'
import './AppleTreePage.css'

const APPLES = [
  { id: 'mbti',   label: 'MBTI',   cls: 'apple--1', onClickKey: 'onMbti'   },
  { id: 'values', label: '价值观',  cls: 'apple--2', onClickKey: 'onValues' },
  { id: 'cinema', label: '电影院',  cls: 'apple--3', onClickKey: 'onCinema' },
]

export default function AppleTreePage({ onBack, onMbti, onValues, onCinema }) {
  const [glowId, setGlowId] = useState(null)

  const handlers = { onMbti, onValues, onCinema }

  const handleAppleClick = (apple) => {
    setGlowId(apple.id)
    setTimeout(() => setGlowId(null), 400)
    setTimeout(() => {
      const fn = handlers[apple.onClickKey]
      if (fn) fn()
    }, 200)
  }

  return (
    <div className="tree-page">
      {/* 全屏背景 */}
      <div className="tree-bg-wrapper">
        <img
          src="/assets/background/apple-tree-bg.png"
          alt=""
          className="tree-bg-image"
        />
      </div>

      {/* 前景内容 */}
      <div className="tree-content-layer">
        {/* 顶部导航 */}
        <div className="tree-top-bar">
          <button className="btn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>返回</span>
          </button>
          <span className="tree-page-title">苹果乐园</span>
          <div className="tree-top-spacer" />
        </div>

        {/* 苹果互动区域 */}
        <div className="tree-interaction-area">
          {APPLES.map((apple) => (
            <div
              key={apple.id}
              className={`apple-item ${apple.cls} ${glowId === apple.id ? 'apple--glow' : ''}`}
              onClick={() => handleAppleClick(apple)}
            >
              <img
                src="/assets/apple/apple.png"
                alt={apple.label}
                className="apple-image"
              />
              <span className="apple-label">{apple.label}</span>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="tree-bottom-hint">
          <p>🍎 点击苹果，收获惊喜</p>
        </div>
      </div>
    </div>
  )
}
