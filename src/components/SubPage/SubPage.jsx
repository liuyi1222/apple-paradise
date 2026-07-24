import './SubPage.css'

export default function SubPage({ title, bgClass, dark, onBack }) {
  return (
    <div className={`subpage ${bgClass}`}>
      <div className="subpage-content">
        <button className="btn-sub-back" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>返回</span>
        </button>
        <h2 className={`subpage-title ${dark ? 'subpage-title--light' : ''}`}>
          {title}
        </h2>
        <p className={`subpage-placeholder ${dark ? 'subpage-placeholder--light' : ''}`}>
          ✨ 即将开启 ✨
        </p>
      </div>
    </div>
  )
}
