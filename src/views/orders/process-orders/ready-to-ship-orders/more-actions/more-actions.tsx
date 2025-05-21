import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ThreeDotIcon from "assets/icons/action-icons/three-dot-rounded-primary.svg"
import Button from "common-components/button/button";
import Image from "next/image";
import useMoreActions from "./use-more-actions";



type MoreActionsProps = {
  shipment_id: string
  order_id: string
}

const MoreActions = ({ shipment_id, order_id }: MoreActionsProps) => {
  const { handleDownloadLabel, handleDownloadInvoice } = useMoreActions({ shipment_id, order_id })
  return (
    <>
      <Menu>
        <MenuButton className='!shrink-0'>
          <Image src={ThreeDotIcon} alt="more-options.svg" className=" h-10 w-10" />
        </MenuButton>

        <MenuItems
          transition
          anchor="top end"
          className="w-52 bg-[#ffffff] rounded-md p-4 shadow-[0_0_20px_rgba(0,0,0,.102)] space-y-3"
        >
          <MenuItem>
            <Button className="text-sm font-semibold text-gray-600 hover:text-gray-800" onClick={handleDownloadLabel}>
              Download Label
            </Button>
          </MenuItem>
          <MenuItem>
            <Button className="text-sm font-semibold text-gray-600 hover:text-gray-800" onClick={handleDownloadInvoice}>
              Download Invoice
            </Button>
          </MenuItem>
          <div className="w-full h-[1.5px] bg-gray-200" />
          <MenuItem>
            <Button className="text-sm font-semibold text-gray-600 hover:text-gray-800">
              Reassign Courier
            </Button>
          </MenuItem>
          <div className="w-full h-[1.5px] bg-gray-200" />
          <MenuItem>
            <Button className="text-sm font-semibold text-error-500">
              Cancel Order
            </Button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  )
}

export default MoreActions