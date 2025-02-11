import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const CatalogueLoader = () => {
  return (
    <SkeletonTheme baseColor="#cecdcb" highlightColor="#aeada9">
      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div className="flex gap-6" key={index}>
              <div className="flex-[0.45] flex gap-3">
                <Skeleton height={140} width={140} className="rounded-lg" />
                <Skeleton count={5} height={24} width={200} />
              </div>
              <div className="flex-[0.35]">
                <Skeleton height={30} width={200} />
              </div>
              <div className="flex-[0.20] space-y-2">
                <Skeleton width={250} height={30} />
                <div className="flex gap-3">
                  <Skeleton width={120} height={30} />
                  <Skeleton width={120} height={30} />
                </div>
                <div className="flex gap-3">
                  <Skeleton width={120} height={30} />
                  <Skeleton width={120} height={30} />
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    </SkeletonTheme>
  )
}

export default CatalogueLoader