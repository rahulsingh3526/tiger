import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <ConnectButton />
      </main>
    </>
  )
}
