import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import './MessageBoard.css'

export default function MessageBoard() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('content, created_at')
        .order('created_at', { ascending: false })
        .limit(3)

      if (error) {
        console.warn('[留言区] 读取失败，使用本地缓存:', error.message)
        setMessages(FALLBACK_MESSAGES)
      } else if (data && data.length > 0) {
        setMessages(data.map(m => m.content))
      } else {
        setMessages(FALLBACK_MESSAGES)
      }
    } catch (err) {
      console.warn('[留言区] 网络错误，使用本地缓存:', err.message)
      setMessages(FALLBACK_MESSAGES)
    } finally {
      setLoading(false)
    }
  }

  const FALLBACK_MESSAGES = [
    '今天也来玩啦',
    '苹果乐园超可爱',
    '留下小愿望',
  ]

  return (
    <div className="message-board">
      {/* 标题 + 爱心装饰 */}
      <div className="message-board-header">
        <span className="message-heart">💕</span>
        <h3 className="message-board-title">留言区</h3>
        <span className="message-heart">💕</span>
      </div>

      <ul className="message-list">
        {loading
          ? <li className="message-item message-item--loading">✨ 加载中...</li>
          : messages.map((msg, i) => (
              <li className="message-item" key={i}>
                <img
                  src="/assets/apple/apple.png"
                  alt=""
                  className="message-apple-icon"
                />
                <span className="message-text">{msg}</span>
              </li>
            ))
        }
      </ul>
    </div>
  )
}
