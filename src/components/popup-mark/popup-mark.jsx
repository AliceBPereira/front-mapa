import styles from './styles.module.scss'

export const PopUpMark = ({ children }) => {
  return (
    <div className={styles.info}>
      {children}
    </div>
  )
}