import Button from 'common-components/button/button'
import PlusIcon from "assets/icons/action-icons/plus-white.svg"
import Image from 'next/image'

type AddTemplateProps = {}

const AddTemplate = ({ }: AddTemplateProps) => {
  return (
    <>

      <Button variant='primary' className='gap-1.5'>
        <Image src={PlusIcon} alt="add.svg" className='h-5 w-5' />
        <p className="text-sm">Add Template</p>
      </Button>

    </>
  )
}

export default AddTemplate