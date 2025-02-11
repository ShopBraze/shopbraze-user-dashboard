import Button from 'common-components/button/button'
import LiveEyeIcon from "assets/icons/action-icons/visible-eye.svg"
import DeliveEyeIcon from 'assets/icons/action-icons/invisible-eye.svg'
import Image from 'next/image'
import { useUpdateCollectionVisibilityMutation } from 'services/collections/index.query'
import toast from 'react-hot-toast'

type ToggleCollectionVisibilityProps = {
  collectionData: Collection
}

const ToggleCollectionVisibility = ({ collectionData }: ToggleCollectionVisibilityProps) => {
  const [updateCollectionVisibility] = useUpdateCollectionVisibilityMutation()

  const handleUpdateVisibility = () => {
    const new_status = !(collectionData?.is_visible)
    const payload = {
      collection_id: collectionData?.id,
      body: {
        new_status
      }
    }
    updateCollectionVisibility(payload).unwrap()
      .then(() => {
        toast.success(`${new_status ? "Collection Is Live" : "Collection Was Delived"}`)
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
  }
  return (
    <>
      <Button onClick={handleUpdateVisibility}>
        {collectionData?.is_visible ?
          <Image src={LiveEyeIcon} alt="live-icon.svg" />
          :
          <Image src={DeliveEyeIcon} alt="live-icon.svg" />
        }
      </Button>
    </>
  )
}

export default ToggleCollectionVisibility