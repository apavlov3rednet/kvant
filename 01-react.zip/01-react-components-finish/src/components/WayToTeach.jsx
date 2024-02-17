export default function WayToTeach({ title, description }) {
  function handleClick() {
    localStorage.setItem('auth-time', new Date())
  }

  return (
    <li onClick={handleClick}>
      <p>
        <strong>{title}</strong> {description}
      </p>
    </li>
  )
}
