import { useRouter } from "next/router";
import CollectionList from "./collection/collection-list/collection-list";
import CreateCollection from "./collection/create-collection/create-collection";

type Props = {}


const WebsiteIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "collection-list" && <CollectionList />}
      {tabName === "create-collection" && <CreateCollection />}

    </div>
  )
}

export default WebsiteIndexContainer