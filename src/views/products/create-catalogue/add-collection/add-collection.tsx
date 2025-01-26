import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CatalogueDataType } from '../types/index.type';
import { Table, Pagination, Checkbox } from 'rsuite';
import CopyIcon from "assets/icons/copy-icon.svg"
import Button from 'common-components/button/button';
import Image from 'next/image';
import { FileType } from 'rsuite/esm/Uploader';


const data = [
  {
    collection_short_id: "Qmflg",
    collection_type: "catalogues_selection",
    collection_name: "NECKLACE",
    is_visible: "True",
    is_active: "True",
    url: "abc.com",
  },
  {
    collection_short_id: "Rmhlj",
    collection_type: "catalogues_selection",
    collection_name: "BRACELET",
    is_visible: "False",
    is_active: "True",
    url: "xyz.com",
  },
  {
    collection_short_id: "Tqjsk",
    collection_type: "catalogues_selection",
    collection_name: "RING",
    is_visible: "True",
    is_active: "False",
    url: "jewelry.com",
  },
  {
    collection_short_id: "Ymckl",
    collection_type: "catalogues_selection",
    collection_name: "EARRING",
    is_visible: "False",
    is_active: "False",
    url: "earring.com",
  },
  {
    collection_short_id: "Zmplx",
    collection_type: "catalogues_selection",
    collection_name: "PENDANT",
    is_visible: "True",
    is_active: "True",
    url: "pendant.com",
  },
];

type AddCollectionProps = {
  control: Control<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueDataType;
    files: FileType[];
  }>
}

const AddCollection = ({ control, watch, setValue }: AddCollectionProps) => {
  const { Column, HeaderCell, Cell } = Table;

  return (
    <div className='p-4 bg-[#fff] rounded-md'>
      <Table
        height={500}
        data={data}
        rowHeight={80}
        headerHeight={60}
      >
        <Column width={120} resizable fixed>
          <HeaderCell className='text-base font-semibold text-gray-600'>Select</HeaderCell>
          <Cell className='font-medium text-gray-800'>
            {rowData => (<Checkbox checked={rowData?.selected} color='green' />)}
          </Cell>
        </Column>

        <Column flexGrow={1} resizable>
          <HeaderCell className='text-base font-semibold text-gray-600'>Collection ShortId</HeaderCell>
          <Cell dataKey="collection_short_id" className='font-medium text-gray-800' />
        </Column>

        <Column flexGrow={1} resizable>
          <HeaderCell className='text-base font-semibold text-gray-600'>Collection Type</HeaderCell>
          <Cell dataKey="collection_type" className='font-medium text-gray-800' />
        </Column>

        <Column flexGrow={1} resizable>
          <HeaderCell className='text-base font-semibold text-gray-600'>Collection Name</HeaderCell>
          <Cell dataKey="collection_name" className='font-medium text-gray-800' />
        </Column>

        <Column width={120} resizable>
          <HeaderCell className='text-base font-semibold text-gray-600'>Is Visible</HeaderCell>
          <Cell dataKey="is_visible" className='font-medium text-gray-800' />
        </Column>

        <Column width={120} resizable>
          <HeaderCell className='text-base font-semibold text-gray-600'>Is Active</HeaderCell>
          <Cell dataKey="is_active" className='font-medium text-gray-800' />
        </Column>

        <Column width={150} fixed="right">
          <HeaderCell className='text-base font-semibold text-gray-600'>Action</HeaderCell>

          <Cell className='font-medium text-gray-800'>
            {rowData => (
              <div className="flex flex-col gap-1 justify-center">
                <Button className='gap-2 border border-primary-400 text-primary-700 rounded py-1.5 px-3 text-sm'>
                  <Image src={CopyIcon} alt="copy.svg" />
                  Copy
                </Button>
                <Button className='text-primary-600 text-sm font-semibold'>Visit Link</Button>
              </div>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  )
}

export default AddCollection