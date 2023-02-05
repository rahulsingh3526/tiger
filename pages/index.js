import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from '../styles/Home.module.css'
import saveTiger from "../contracts/saveTiger.json"

export default function Home() {

  const {data} = useContractRead({
    address: saveTiger.address,
    abi: saveTiger.abi,
    functionName: "getFundBal",
    onError(error) {
      console.log("Error", error);
    },
  });

  
  return (
    <>
      <main className={styles.main}>
        <ConnectButton />


      </main>
    </>
  )
}
