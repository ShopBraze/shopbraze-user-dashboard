import { useRouter } from "next/router";
import CollectionList from "./collection/collection-list/collection-list";
import CreateCollection from "./collection/create-collection/create-collection";
import WebsitePresets from "./global-theme/website-presets/website-presets";
import AdvanceConfiguration from "./global-theme/advance-configuration/advance-configuration";

type Props = {}


const WebsiteIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "collection-list" && <CollectionList />}
      {tabName === "create-collection" && <CreateCollection />}

      {tabName === "website-presets" && <WebsitePresets />}
      {tabName === "advance-configuration" && <AdvanceConfiguration />}

    </div>
  )
}

export default WebsiteIndexContainer