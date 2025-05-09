import Button from "common-components/button/button"
import { useState } from "react"
import SizeChartModal from "../size-chart-modal/size-chart-modal"

type EditSizeChartProps = {
  data: SizeChartType
}

const EditSizeChart = ({ data }: EditSizeChartProps) => {

  const [showEditSizeChart, setShowEditSizeChart] = useState(false)
  const handleToggleEditSizeChart = () => {
    setShowEditSizeChart(!showEditSizeChart)
  }

  return (
    <>
      <Button className="text-sm font-semibold text-primary-400" onClick={handleToggleEditSizeChart}>
        Edit
      </Button>

      {showEditSizeChart &&
        <SizeChartModal
          openModal={showEditSizeChart}
          handleToggleModal={handleToggleEditSizeChart}
          sizeChartData={data} />
      }
    </>
  )
}

export default EditSizeChart