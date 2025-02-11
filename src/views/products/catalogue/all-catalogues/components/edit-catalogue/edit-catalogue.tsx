import Button from 'common-components/button/button'
import Image from 'next/image'
import EditPencilIcon from "assets/icons/catalogue-listing/edit-pencil.svg"
import useEditCatalogue from './use-edit-catalogue'
import { ReactNode, useState } from 'react'
import EditCatalogueModal from './edit-catalogue-modal'


type EditCatalogueProps = {
  children?: ReactNode
  catalogueData: Catalogue,
  editStep?: number
}

const EditCatalogue = ({ children, catalogueData, editStep = 1 }: EditCatalogueProps) => {
  const [openEditPopUp, setOpenEditPopUp] = useState(false)
  const handleToggleEditPopUp = () => {
    setOpenEditPopUp(!openEditPopUp)
  }
  return (
    <>
      {children ? <div className="w-full" onClick={handleToggleEditPopUp}>{children}</div>
        :
        <Button variant='primary' className='w-full py-[5px] gap-2 rounded' onClick={handleToggleEditPopUp}>
          <Image src={EditPencilIcon} alt="edi-pencil.svg" className='h-4 w-4' />
          <p className="text-[#fff] font-semibold">Edit Catalogue Details</p>
        </Button>
      }
      {openEditPopUp && <EditCatalogueModal open={openEditPopUp} handleClose={handleToggleEditPopUp} catalogueData={catalogueData} editStep={editStep} />}
    </>
  )
}

export default EditCatalogue

