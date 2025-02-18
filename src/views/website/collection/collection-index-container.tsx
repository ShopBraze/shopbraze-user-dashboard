import { useRouter } from "next/router";
import CollectionList from "./collection-list/collection-list";
import CreateCollection from "./create-collection/create-collection";
type Props = {}

const CollectionIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "collection-list" && <CollectionList />}
      {tabName === "create-collection" && <CreateCollection />}
    </div>
  )
}

export default CollectionIndexContainer