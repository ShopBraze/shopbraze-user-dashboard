import { useGetSizeChartsQuery } from "services/size-charts/index.query"
import AddSizeChart from "./add-size-chart/add-size-chart"
import Button from "common-components/button/button"
import DeleteBinIcon from "assets/icons/action-icons/delete-bin-red.svg"
import Image from "next/image"
import useSizeCharts from "./use-size-charts"
import SizeChartModal from "./size-chart-modal/size-chart-modal"
import EditSizeChart from "./edit-size-chart/edit-size-chart"


const SizeCharts = () => {

  const { sizeChartsData, isLoading, } = useSizeCharts()

  return (
    <div className="space-y-5">
      <div className="p-3 bg-[#fff] rounded-md flex items-center justify-between">
        <p className="">Size Charts</p>
        <AddSizeChart />
      </div>
      {
        sizeChartsData && sizeChartsData?.length > 0 ?
          <>
            {
              sizeChartsData?.map((sizeData) => {
                return (
                  <div className="p-5 rounded-md bg-[#fff] flex text-sm font-medium justify-between" key={sizeData?.id}>
                    <p className="text-sm font-medium">{sizeData?.name}</p>
                    <div className="flex gap-10">
                      <EditSizeChart data={sizeData} />
                      <Button>
                        <Image src={DeleteBinIcon} alt="delete.svg" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            }
          </>
          : <></>
      }

    </div>
  )
}

export default SizeCharts