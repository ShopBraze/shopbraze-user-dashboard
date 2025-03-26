import Button from 'common-components/button/button'
import toast from 'react-hot-toast'
import { useUpdateWebsiteNavigationMenuVisibilityMutation } from 'services/website-page-navigation-menu/index.query'

type MarkNavigationVisibilityProps = {
  navigationData: WebsiteNavigationMenuType
}

const MarkNavigationVisibility = ({ navigationData }: MarkNavigationVisibilityProps) => {
  const [updateWebsiteNavigationMenuVisibility, { isLoading: isUpdating }] = useUpdateWebsiteNavigationMenuVisibilityMutation()

  const handleVisibilityClick = (visibility: boolean) => {
    const payload = {
      navigationMenuItemId: navigationData?.short_id,
      body: {
        visibility
      }
    }
    updateWebsiteNavigationMenuVisibility(payload).unwrap()
      .then(() => {
        toast.success("Visibility Updated")
      })
      .catch((error) => {
        toast.error("Couldn't update visisility")
      })
  }

  return (
    <>
      {
        navigationData?.is_visible ?
          <Button className="px-4 text-sm font-semibold text-error-600"
            onClick={() => {
              handleVisibilityClick(false)
            }}
            disabled={isUpdating}
          >
            Mark Delive
          </Button>
          : <Button className="px-4 text-sm font-semibold text-success-600"
            onClick={() => {
              handleVisibilityClick(true)
            }}
            disabled={isUpdating}
          >
            Mark Live
          </Button>
      }

    </>
  )
}

export default MarkNavigationVisibility