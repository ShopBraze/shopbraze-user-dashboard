import Button from "common-components/button/button"
import CrossIcon from "assets/icons/cross-icon.svg"
import Image from "next/image"
import useSelectCourierPartner from "./use-select-courier-partner"
import { Dropdown, Table } from "rsuite"
import { Cell, Column, HeaderCell } from "rsuite-table"
import ShopBrazeRecommendationIcon from "assets/icons/shopbraze-recommendation.svg"

import 'react-circular-progressbar/dist/styles.css';
import ComponentLoader from "common-components/loaders/component-loader"
import AnimatedRatingProgress from "./animated-rating-progress/animated-rating-progress"
import CustomImage from "common-components/custom-image/custom-image"

type SelectCourierPartnerProps = {
  order: CustomerOrderType
  handleToggleOpenDetails: () => void
}

const SelectCourierPartner = ({ order, handleToggleOpenDetails }: SelectCourierPartnerProps) => {
  const { selectedCourierType, setSelectedCourierType, isFetchingCourierData, recommended_by, available_courier_companies, courierDataToShow, shiprocket_recommended_courier_id } = useSelectCourierPartner({ order })

  return (
    <div className="h-full flex-[0.83] bg-[#f8f8f8] p-5">
      <div className="flex justify-between items-center pb-8">
        <p className="text-lg font-semibold">Select Courier Partner</p>
        <Button onClick={handleToggleOpenDetails}>
          <Image src={CrossIcon} alt="close.svg" className="" />
        </Button>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            {
              ['All', "Air", "Surface"].map((item, index) => {
                return (
                  <div className={`font-semibold text-gray-500 px-4 pb-2 cursor-pointer
                    ${selectedCourierType === item ? 'text-[#745be7] border-b-4 border-[#745be7]' : ''}`}
                    key={index}
                    onClick={() => { setSelectedCourierType(item) }}
                  >
                    {item}
                  </div>
                )
              })
            }
          </div>
          <Dropdown title={`Sort By: ${recommended_by?.title}`} placement="leftStart" noCaret >
            {
              [{ title: 'Cheapest', val: 1 }, { title: 'Fastest', val: 2 }, { title: 'Best Rated', val: 3 }, { title: 'Custom', val: 4 }, { title: 'Shopbraze Recommendatio', val: 6 }]?.map((item) => {
                return (
                  <Dropdown.Item key={item?.val}>Sort By: {item?.title}</Dropdown.Item>
                )
              })
            }
          </Dropdown>
        </div>
        <div className="bg-[#dbdbdb] h-[1px] my-4 w-full" />
        {
          isFetchingCourierData ?
            <ComponentLoader containerClassName="h-[60vh]" />
            : available_courier_companies?.length === 0 ?
              <p className="">No Courier partner available</p> :
              <div className="space-y-4 pt-6">
                <p className="text-xs font-semibold text-gray-500">{available_courier_companies?.length} Couriers Found</p>
                <Table
                  autoHeight
                  data={courierDataToShow}
                  headerHeight={60}
                  rowHeight={110}
                >
                  <Column width={260} verticalAlign='center'>
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Courier Partner</HeaderCell>
                    <Cell>
                      {(item) => <div className='flex !gap-3 items-center relative'>
                        <CustomImage src={''} height={40} width={40} alt={`${item?.courier_name}.png`} className="rounded-full" />
                        <div className="spacey-1.5">
                          <p className="text-xs text-gray-800 font-semibold">{item?.courier_name}</p>
                          <p className="text-xs text-gray-600 font-medium"> {item?.is_surface ? "Surface" : "Air"} | Min-weight: <span className="font-semibold">{item?.min_weight} Kg</span></p>
                          <p className="text-xs text-gray-600 font-medium">RTO Charges: <span className="font-semibold">₹{item?.rto_charges}</span></p>
                        </div>
                        {shiprocket_recommended_courier_id == item?.courier_company_id && <Image src={ShopBrazeRecommendationIcon} alt="shopbraze-recommended" className="absolute top-[-30px]" />}
                      </div>}
                    </Cell>
                  </Column>
                  <Column width={140} verticalAlign='center' >
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Rating</HeaderCell>
                    <Cell >
                      {(item) => <div className={`h-14 w-14 text-sm`}>
                        <AnimatedRatingProgress rating={item?.rating} />
                      </div>}
                    </Cell>
                  </Column>
                  <Column width={120} verticalAlign='center' >
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Expected Pickup</HeaderCell>
                    <Cell >
                      {(item) => <p className="text-xs text-gray-600 font-medium">{item?.suppress_date}</p>}
                    </Cell>
                  </Column>
                  <Column width={120} verticalAlign='center' >
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Estimated Delivery</HeaderCell>
                    <Cell >
                      {(item) => <p className="text-xs text-gray-600 font-medium">{item?.etd}</p>}
                    </Cell>
                  </Column>
                  <Column width={160} align="center" verticalAlign='center' >
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Chargeable Weight</HeaderCell>
                    <Cell >
                      {(item) => <p className="text-xs text-gray-600 font-medium">{item?.charge_weight} Kg</p>}
                    </Cell>
                  </Column>
                  <Column width={120} verticalAlign='center' >
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Charges</HeaderCell>
                    <Cell >
                      {(item) => <p className="text-gray-600 font-semibold">₹{item?.freight_charge}</p>}
                    </Cell>
                  </Column>
                  <Column width={120} verticalAlign='center' >
                    <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Action</HeaderCell>
                    <Cell>
                      <Button variant="primary" className="text-xs">
                        Ship Now
                      </Button>
                    </Cell>
                  </Column>
                </Table>
              </div>
        }

      </div>
    </div>
  )
}

export default SelectCourierPartner