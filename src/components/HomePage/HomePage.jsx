import Background from './Background'
import Title from './Title'
import Character from './Character'
import EnterButton from './EnterButton'
import MessageBoard from './MessageBoard'
import './HomePage.css'

export default function HomePage({ onEnter }) {
  return (
    <div className="homepage">
      <Background />

      {/* 花瓣漂浮 */}
      <div className="petal petal--1" />
      <div className="petal petal--2" />
      <div className="petal petal--3" />
      <div className="petal petal--4" />
      <div className="petal petal--5" />
      <div className="petal petal--6" />
      <div className="petal petal--7" />
      <div className="petal petal--8" />

      {/* 星光闪烁 */}
      <div className="star star--1" />
      <div className="star star--2" />
      <div className="star star--3" />
      <div className="star star--4" />
      <div className="star star--5" />
      <div className="star star--6" />
      <div className="star star--7" />

      <div className="homepage-content">
        <Title />
        <Character />
        <EnterButton onClick={onEnter} />
        <MessageBoard />
      </div>
    </div>
  )
}
