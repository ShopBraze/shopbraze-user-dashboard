import Button from 'common-components/button/button'
import React, { useState } from 'react'
import Uploads from './uploads/uploads'
import Reports from './reports/reports'

type Props = {}

const BulkUpload = (props: Props) => {

  const [activeSubTab, setActiveSubTab] = useState("Uploads")
  return (
    <div className='space-y-4'>

      <div className="p-4 bg-[#fff] rounded-md">
        <div className="flex">
          {
            ['Uploads', 'Reports'].map((item: string, index: number) => {
              return (
                <Button key={item} className={` rounded-none py-2 px-[18px]
                  ${index === 0 ? 'rounded-l-md' : 'rounded-r-md'}
                   ${activeSubTab === item ? `bg-primary-600 text-[#fff] font-medium ` : ' border border-gray-200 text-primary-500'}`}
                  onClick={() => { setActiveSubTab(item) }}
                >
                  {item}
                </Button>
              )
            })
          }
        </div>
      </div>
      {activeSubTab === "Uploads" && <Uploads />}
      {activeSubTab === "Reports" && <Reports />}
    </div>
  )
}

export default BulkUpload