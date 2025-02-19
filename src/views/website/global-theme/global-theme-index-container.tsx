import { useRouter } from "next/router";
import WebsitePresets from "./website-presets/website-presets";
import AdvanceConfiguration from "./advance-configuration/advance-configuration";
type Props = {}

const GlobalThemeIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;
  return (
    <div className="pt-5">

      {tabName === "website-presets" && <WebsitePresets />}
      {tabName === "advance-configuration" && <AdvanceConfiguration />}

    </div>
  )
}

export default GlobalThemeIndexContainer