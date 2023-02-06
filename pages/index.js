import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from '../styles/Home.module.css'
import saveTiger from "../contracts/saveTiger.json"
import stDAO from "../contracts/stDAO.json"
import { useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction  } from 'wagmi'
  import { useAccount } from 'wagmi'
  import { useState, useEffect } from 'react'
  import { ethers } from 'ethers'

export default function Home() {
  const [tokenId, setTokenId] = useState(0)

  const obj1 = {
    address: saveTiger.address,
    abi: saveTiger.abi
  }

  // const obj2 = {
  //   address: stDAO.address,
  //   abi: stDAO.abi
  // }
  const { address } = useAccount()
  const { config1 } = usePrepareContractWrite({
      ...obj1,
    functionName: 'mint',
    overrides: {
      from: address,
      value: ethers.utils.parseEther('0.075'),
    },
    onError(error) {
      console.log("Error", error);
    },
  })

  const {data : mintData, write, isLoading, isSuccess } = useContractWrite(config1)


  // const {data : baseURIData} = useContractRead({
  //   ...config1,
  //    functionName: "_baseURI",
  //    onError(error) {
  //      console.log("Error", error);
  //    },
  //      onSuccess(data) {
  //     console.log('Success', data)
  //   },
  //  });

  
  const { config2 } = usePrepareContractWrite({
    ...obj1,
  functionName: 'tokenURI',
  args: [`${tokenId}`],
  onError(error) {
    console.log("Error", error);
  },
  onSuccess(data) {
    console.log('Success', data)
  },
})

const {data : tokenURIData, write : tokenURIWrite, isLoading : tokenURIIsLoading, isSuccess:tokenURIIsSuccess } = useContractWrite(config2)

  useEffect(() => {
    console.log("__________________________");
    console.log("mintData", mintData);
    console.log("tokenURIData", tokenURIData);
    console.log("__________________________");
  }, [mintData, tokenURIData]);



  return (
    <>
      <main className={styles.main}>
        <ConnectButton />
     {/* mint button */}
        <div>
      <button disabled={!write} onClick={() => write?.()}>
        Mint
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Mint completed</div>}
    </div>
    {/* mint button */}

    {/* base uri  */}

    {/* base uri  */}

    {/* token URI */}
    <div>
    <p>Enter token URI</p>

    <input onChange={(e)=>setTokenId(e.target.value)} type="number" />
      <button disabled={!tokenURIWrite} onClick={() => tokenURIWrite?.()}>
        Token URI
      </button>
      <div>{address}</div>
      {tokenURIIsLoading && <div>Check Wallet</div>}
      {tokenURIIsSuccess && <div>Mint completed</div>}
    </div>

    {/* token URI */}


      </main>
    </>
  )
}
