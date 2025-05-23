import { useRouter } from 'next/router';
import WebConfig from './web-config/web-config';


type Props = {}

const WebConfigurationIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;
  return (
    <div className='pt-5'>

      {tabName === "web-configuration" && <WebConfig />}

    </div>
  )
}

export default WebConfigurationIndexContainer