import { useState } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import AppleTreePage from './components/AppleTreePage/AppleTreePage'
import MBTIStory from './components/StoryPages/MBTIStory'
import ValueStory from './components/StoryPages/ValueStory'
import CinemaStory from './components/StoryPages/CinemaStory'
import './App.css'

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePageWrapper />} />
          <Route path="/tree" element={<AppleTreeWrapper />} />
          <Route path="/mbti" element={<MBTIStory />} />
          <Route path="/values" element={<ValueStory />} />
          <Route path="/cinema" element={<CinemaStory />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

/* ======== 带过渡动画的包装组件 ======== */

function HomePageWrapper() {
  const navigate = useNavigate()
  const [overlay, setOverlay] = useState(false)

  const goTree = () => {
    setOverlay(true)
    setTimeout(() => {
      navigate('/tree')
      setTimeout(() => setOverlay(false), 250)
    }, 350)
  }

  return (
    <>
      <div className="page active">
        <HomePage onEnter={goTree} />
      </div>
      <div className={`transition-overlay ${overlay ? 'active' : ''}`} />
    </>
  )
}

function AppleTreeWrapper() {
  const navigate = useNavigate()
  const [overlay, setOverlay] = useState(false)

  const navigateWithTransition = (path) => {
    setOverlay(true)
    setTimeout(() => {
      navigate(path)
      setTimeout(() => setOverlay(false), 250)
    }, 350)
  }

  return (
    <>
      <div className="page active">
        <AppleTreePage
          onBack={() => navigateWithTransition('/')}
          onMbti={() => navigateWithTransition('/mbti')}
          onValues={() => navigateWithTransition('/values')}
          onCinema={() => navigateWithTransition('/cinema')}
        />
      </div>
      <div className={`transition-overlay ${overlay ? 'active' : ''}`} />
    </>
  )
}
