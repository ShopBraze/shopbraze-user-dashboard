import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const SellersIndexContainer = (props: Props) => {
  const router = useRouter()
  console.log()
  // const { tabName } = router.query;
  return (
    <div>SellersIndexContainer</div>
  )
}

export default SellersIndexContainer