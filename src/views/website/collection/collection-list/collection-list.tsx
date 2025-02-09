import React, { useState } from 'react'
import { Loader, Table } from 'rsuite';
import { useGetAllCollectionsQuery } from 'services/collections/index.query';
import EditPencilIcon from "assets/icons/action-icons/edit-pencil-primary.svg"
import LinkIcon from "assets/icons/action-icons/link-primary.svg"
import CopyIcon from "assets/icons/action-icons/copy-icon-primary.svg"
import LiveEyeIcon from "assets/icons/action-icons/visible-eye.svg"
import DeleteIcon from "assets/icons/action-icons/delete-bin-red.svg"
import Button from 'common-components/button/button';
import Image from 'next/image';

type Props = {}

const CollectionList = (props: Props) => {
  const { Column, HeaderCell, Cell } = Table;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetAllCollectionsQuery({ page: currentPage, limit: 10 })

  const { collectionsData, totalPages, totalItems } = data || {}

  return (
    <div>
      {
        isFetching ?
          <div className='h-[80vh] flex justify-center items-center'>
            <Loader size="md" />
          </div>
          :
          <Table
            height={500}
            data={collectionsData}
            rowHeight={60}
            headerHeight={60}
          >
            <Column flexGrow={0.18} align="center" verticalAlign='center'>
              <HeaderCell className='text-sm font-semibold text-gray-900'>Collection ShortID <span className="pl-2 font-bold text-gray-1000">({totalItems})</span></HeaderCell>
              <Cell className='font-medium text-gray-800 text-sm'>
                {(item: Collection) => <p>{item?.short_id}</p>}
              </Cell>
            </Column>
            <Column flexGrow={0.18} align="center" verticalAlign='center' >
              <HeaderCell className='text-sm font-semibold text-gray-900'>Collection Type </HeaderCell>
              <Cell className='font-medium text-gray-800 text-sm'>
                {(item: Collection) => <p>{item?.type}</p>}
              </Cell>
            </Column>
            <Column flexGrow={0.18} align="center" verticalAlign='center' >
              <HeaderCell className='text-sm font-semibold text-gray-900'>Collection Name </HeaderCell>
              <Cell className='font-medium text-gray-800 text-sm'>
                {(item: Collection) => <p>{item?.name}</p>}
              </Cell>
            </Column>
            <Column flexGrow={0.18} align="center" verticalAlign='center' >
              <HeaderCell className='text-sm font-semibold text-gray-900'>Is Visible </HeaderCell>
              <Cell className='font-medium text-gray-800 text-sm'>
                {(item: Collection) => {
                  return (
                    <>
                      {
                        item?.is_visible ?
                          <div className="py-1 px-2 bg-success-50 rounded-md text-success-700 text-sm font-semibold">True</div>
                          :
                          <div className="py-1 px-2 bg-error-50 rounded-md text-error-500 text-sm font-semibold">False</div>
                      }
                    </>
                  )
                }}
              </Cell>
            </Column>
            <Column flexGrow={0.28} align="center" verticalAlign='center' >
              <HeaderCell className='text-sm font-semibold text-gray-900'>Action </HeaderCell>
              <Cell className='w-full font-medium text-gray-800 text-sm'>
                <div className="w-full flex items-center justify-around">
                  <Button>
                    <Image src={EditPencilIcon} alt="edit-pencil.svg" className='h-4 w-4' />
                  </Button>
                  <Button>
                    <Image src={LinkIcon} alt="link-icon.svg" />
                  </Button>
                  <Button>
                    <Image src={CopyIcon} alt="copy-icon.svg" />
                  </Button>
                  <Button>
                    <Image src={LiveEyeIcon} alt="live-icon.svg" />
                  </Button>
                  <Button>
                    <Image src={DeleteIcon} alt="delete-bin.svg" className='h-4 w-4' />
                  </Button>
                </div>
              </Cell>
            </Column>
          </Table>
      }

    </div >
  )
}

export default CollectionList