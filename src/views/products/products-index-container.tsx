import { useRouter } from "next/router";
import AllCatalogues from "./catalogue/all-catalogues/all-catalogues";
import GroupCatalogue from "./catalogue/group-catalogue/group-catalogue";
import CreateCatalogue from "./catalogue/create-catalogue/create-catalogue";
import BulkUpload from "./catalogue/bulk-upload/bulk-upload";
import GenerateImageVideoLink from "./catalogue/generate-image-video-link/generate-image-video-link";

type Props = {}


const ProductsIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "list" && <AllCatalogues />}
      {tabName === "group" && <GroupCatalogue />}
      {tabName === "create" && <CreateCatalogue />}
      {tabName === "upload" && <BulkUpload />}
      {tabName === "seller-media" && <GenerateImageVideoLink />}

    </div>
  )
}

export default ProductsIndexContainer