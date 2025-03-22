import { Table } from 'rsuite'
import { Cell, Column, HeaderCell } from 'rsuite-table'
import EditCoupon from './edit-coupon/edit-coupon'
import { useGetAllCouponsQuery } from 'services/coupons/index.query'

const GenericCouponList = () => {
  const { data: couponsData } = useGetAllCouponsQuery()

  return (
    <div className=''>
      <Table
        autoHeight
        data={couponsData}
        headerHeight={60}
        rowHeight={150}
      >
        <Column flexGrow={0.20} align="center" verticalAlign='center'>
          <HeaderCell className='text-sm font-semibold text-gray-900'>Title</HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm '>
            {(item: CouponType) => <p className='whitespace-break-spaces'>{item?.title}</p>}
          </Cell>
        </Column>
        <Column flexGrow={0.15} align="center" verticalAlign='center' >
          <HeaderCell className='text-sm font-semibold text-gray-900'>Coupon Code </HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm'>
            {(item: CouponType) => <p>{item?.code}</p>}
          </Cell>
        </Column>
        <Column flexGrow={0.1} align="center" verticalAlign='center' >
          <HeaderCell className='text-sm font-semibold text-gray-900'>Platform </HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm'>
            {(item: CouponType) => <p>Website</p>}
          </Cell>
        </Column>
        <Column flexGrow={0.1} align="center" verticalAlign='center' >
          <HeaderCell className='text-sm font-semibold text-gray-900'>Expiry Date </HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm'>
            {(item: CouponType) => <p>{new Date(item?.expires_at)?.toLocaleDateString()}</p>}
          </Cell>
        </Column>
        <Column flexGrow={0.1} align="center" verticalAlign='center' >
          <HeaderCell className='text-sm font-semibold text-gray-900'>Status </HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm'>
            {(item: CouponType) => {
              return (
                <>
                  {
                    item?.is_active ?
                      <div className="py-1 px-2 bg-success-50 rounded-md text-success-700 text-sm font-semibold">Active</div>
                      :
                      <div className="py-1 px-2 bg-error-50 rounded-md text-error-500 text-sm font-semibold">Inactive</div>
                  }
                </>
              )
            }}
          </Cell>
        </Column>
        <Column flexGrow={0.15} align="center" verticalAlign='center' >
          <HeaderCell className='text-sm font-semibold text-gray-900'>Pre-Applied on Ad-Link </HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm'>
            {(item: CouponType) => <>
              {item?.pre_apply_on_ad ?
                <div className="py-1 px-2 bg-gray-200 rounded-md text-success-700 text-sm font-semibold">Applicable</div>
                :
                <div className="py-1 px-2 bg-gray-200 rounded-md text-gray-800 text-sm font-semibold">Not Applicable</div>
              }
            </>}
          </Cell>
        </Column>
        <Column flexGrow={0.15} align="center" verticalAlign='center' >
          <HeaderCell className='text-sm font-semibold text-gray-900'>Actions </HeaderCell>
          <Cell className='font-medium text-gray-800 text-sm'>
            {(item: CouponType) => <EditCoupon couponData={item} />}
          </Cell>
        </Column>
      </Table>
    </div>
  )
}

export default GenericCouponList