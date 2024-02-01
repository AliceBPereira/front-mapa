import { Link } from "react-router-dom"
import styles from './styles.module.scss'

export const DetailsButton = ({ url }) => {
  return (
    <Link to={url} style={{ textDecoration: "none" }}>
      <button
        className={styles.button}
      >
        Detalhes
      </button>
    </Link>
  )
}