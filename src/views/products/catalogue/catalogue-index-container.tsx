import { useRouter } from "next/router";
import AllCatalogues from "./all-catalogues/all-catalogues";
import GroupCatalogue from "./group-catalogue/group-catalogue";
import CreateCatalogue from "./create-catalogue/create-catalogue";
import BulkUpload from "./bulk-upload/bulk-upload";
import GenerateImageVideoLink from "./generate-image-video-link/generate-image-video-link";
import SizeCharts from "./size-charts/size-charts";

type Props = {}


const CatalogueIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "list" && <AllCatalogues />}
      {tabName === "group" && <GroupCatalogue />}
      {tabName === "create" && <CreateCatalogue />}
      {tabName === "upload" && <BulkUpload />}
      {tabName === "seller-media" && <GenerateImageVideoLink />}
      {tabName === "size-charts" && <SizeCharts />}
    </div>
  )
}

export default CatalogueIndexContainer