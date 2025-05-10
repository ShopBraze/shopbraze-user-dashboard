import AddSizeChart from "./add-size-chart/add-size-chart"
import useSizeCharts from "./use-size-charts"
import EditSizeChart from "./edit-size-chart/edit-size-chart"
import DeleteSizeChart from "./delete-size-chart/delete-size-chart"

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
                      <DeleteSizeChart data={sizeData} />
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