import "./Loader.css"

const Loader = ({ size = "medium", text = "Chargement...", fullScreen = false, transparent = false }) => {
  
  //Construction des classes dynamiques
  const loaderClasses = `loader loader-${size} ${fullScreen ? "loader-fullscreen" : ""}`
  const loaderComponent = (
    <div className={loaderClasses}>
      <div className="loader-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return <div className={`loader-overlay ${transparent ? "loader-transparent" : ""}`}>{loaderComponent}</div>
  }

  return loaderComponent
}

export default Loader
