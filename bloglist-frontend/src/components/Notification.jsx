


const Notification = ({ message, errorRef }) => {
  if (message === null) {
    return null
  }

  return <div className={errorRef.current ? 'error' : 'success'}>{message}</div>
}

export default Notification