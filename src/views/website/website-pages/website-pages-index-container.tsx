import { useRouter } from 'next/router';
import React from 'react'
import HomePage from './home-page/home-page';
import ProductPage from './product-page/product-page';
import OrderStatus from './order-status-page/order-status-page';
import FetauredPages from './featured-pages/featured-pages';

type Props = {}

const WebsitePagesIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;
  return (
    <div className='pt-5'>

      {tabName === "home" && <HomePage />}
      {tabName === "product" && <ProductPage />}
      {tabName === "order-status" && <OrderStatus />}
      {tabName === "featured" && <FetauredPages />}

    </div>
  )
}

export default WebsitePagesIndexContainer