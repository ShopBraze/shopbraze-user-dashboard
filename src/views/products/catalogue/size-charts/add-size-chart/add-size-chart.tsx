
import Button from 'common-components/button/button'
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import Image from 'next/image'
import { useState } from 'react'
import SizeChartModal from '../size-chart-modal/size-chart-modal'

type AddSizeChartProps = {}

const AddSizeChart = ({ }: AddSizeChartProps) => {
  const [openSizeChartModal, setOpenSizeChartModal] = useState(false)
  const handleToggleSizeChartModal = () => {
    setOpenSizeChartModal(!openSizeChartModal)
  }
  return (
    <>
      <Button variant='primary' className='gap-1.5' onClick={handleToggleSizeChartModal}>
        <Image src={PlusIcon} alt="add.svg" className='h-5 w-5' />
        <p className="text-sm font-semibold">Add Size Chart</p>
      </Button>

      {openSizeChartModal && <SizeChartModal openModal={openSizeChartModal} handleToggleModal={handleToggleSizeChartModal} />}
    </>
  )
}

export default AddSizeChart