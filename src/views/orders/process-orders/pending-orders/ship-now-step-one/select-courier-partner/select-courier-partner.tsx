import Button from "common-components/button/button"
import CrossIcon from "assets/icons/cross-icon.svg"
import Image from "next/image"
import useSelectCourierPartner from "./use-select-courier-partner"
import { Table } from "rsuite"
import { Cell, Column, HeaderCell } from "rsuite-table"

import { CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from "react"

type SelectCourierPartnerProps = {
  handleToggleOpenDetails: () => void
}

const SelectCourierPartner = ({ handleToggleOpenDetails }: SelectCourierPartnerProps) => {
  const { selectedCourierType, setSelectedCourierType } = useSelectCourierPartner({})

  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setValue(66), 200);
    return () => clearTimeout(timeout);
  }, []);


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
        </div>
        <div className="bg-[#dbdbdb] h-[1px] my-4 w-full" />
        <div className="space-y-4 pt-6">
          <p className="text-xs font-semibold text-gray-500">3 Couriers Found</p>

          <Table
            autoHeight
            data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
            headerHeight={60}
            rowHeight={100}
          >
            <Column width={260} verticalAlign='center'>
              <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Courier Partner</HeaderCell>
              <Cell>
                <div className='flex !gap-3 items-center'>
                  <Image src={'https://app.shiprocket.in/seller/assets/images/couriers/Dtdc.png'} height={40} width={40} alt=".png" className="rounded-full" />
                  <div className="spacey-1.5">
                    <p className="text-xs text-gray-800 font-semibold">DTDC Surface</p>
                    <p className="text-xs text-gray-600 font-medium">Surface | Min-weight: <span className="font-semibold">0.5 Kg</span></p>
                    <p className="text-xs text-gray-600 font-medium">RTO Charges: <span className="font-semibold">₹0</span></p>
                  </div>
                </div>
              </Cell>
            </Column>
            <Column width={140} verticalAlign='center' >
              <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Rating</HeaderCell>
              <Cell >
                <div className={`h-14 w-14 text-sm`}>
                  <CircularProgressbar
                    value={value}
                    text={`${.66 * 100}%`}
                    styles={{
                      path: {
                        stroke: `#60b636`,
                        transition: 'stroke-dashoffset 1.5s ease 0s',
                      },
                      trail: {
                        color: "#d6d6d6"
                      },
                      text: {
                        fontWeight: 700,
                        fontSize: 28,
                        fill: "#000"
                      },
                      background: {
                        color: "#3e98c7"
                      }
                    }}
                  />
                </div>
              </Cell>
            </Column>
            <Column width={120} verticalAlign='center' >
              <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Expected Pickup</HeaderCell>
              <Cell >
                <p className="text-xs text-gray-600 font-medium">Tomorrow</p>
              </Cell>
            </Column>
            <Column width={120} verticalAlign='center' >
              <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Estimated Delivery</HeaderCell>
              <Cell >
                <p className="text-xs text-gray-600 font-medium">May 15, 2025</p>
              </Cell>
            </Column>
            <Column width={160} align="center" verticalAlign='center' >
              <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Chargeable Weight</HeaderCell>
              <Cell >
                <p className="text-xs text-gray-600 font-medium">0.5 Kg</p>
              </Cell>
            </Column>
            <Column width={120} verticalAlign='center' >
              <HeaderCell className='text-xs font-semibold text-gray-900 px-4'>Charges</HeaderCell>
              <Cell >
                <p className="text-gray-600 font-semibold">₹92.04</p>
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
      </div>
    </div>
  )
}

export default SelectCourierPartner