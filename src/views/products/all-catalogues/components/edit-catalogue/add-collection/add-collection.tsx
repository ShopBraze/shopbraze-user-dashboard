import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CatalogueFormDataType } from '../types/index.type';
import { Table, Checkbox } from 'rsuite';
import CopyIcon from "assets/icons/copy-icon.svg"
import Button from 'common-components/button/button';
import Image from 'next/image';
import { FileType } from 'rsuite/esm/Uploader';
import useAddCollection from './use-add-collection';

type AddCollectionProps = {
  control: Control<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }, any>
  setValue: UseFormSetValue<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
  watch: UseFormWatch<{
    catalogue_data: CatalogueFormDataType;
    files: any
  }>
}

const AddCollection = ({ control, watch, setValue }: AddCollectionProps) => {
  const { transformedCollectionsData, handleCheckBox } = useAddCollection({ setValue, watch })
  const { Column, HeaderCell, Cell } = Table;

  return (
    <div className='p-4 bg-[#fff] rounded-md'>
      <Table
        height={500}
        data={transformedCollectionsData}
        rowHeight={80}
        headerHeight={60}
      >
        <Column width={120} resizable fixed>
          <HeaderCell className='text-base font-semibold text-gray-600'>Select</HeaderCell>
          <Cell className='font-medium text-gray-800'>
            {rowData => (<Checkbox checked={watch('catalogue_data.collections_to_add')?.includes(rowData?.collection_short_id)} color='green' onChange={(value, checked) => { handleCheckBox(checked, rowData?.collection_short_id) }} />)}
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