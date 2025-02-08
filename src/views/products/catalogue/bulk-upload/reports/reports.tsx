import Button from 'common-components/button/button';
import Image from 'next/image';
import DownloadIcon from "assets/icons/download-icon-primary.svg"
import { Table } from 'rsuite';
import { useGetCatalogueReportsQuery } from 'services/reports/index.query'

type Props = {}

const Reports = (props: Props) => {
  const { Column, HeaderCell, Cell } = Table;
  const { data: reports } = useGetCatalogueReportsQuery()
  console.log(reports, "reports")
  return (
    <Table
      autoHeight
      data={reports}
      rowHeight={120}
      headerHeight={80}
    >
      <Column width={250} align="center" verticalAlign='center' fixed>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>File Name</HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold '>
          {(report: BulkUploadReport) => <p className=' whitespace-normal'>{report?.file_name}</p>}
        </Cell>
      </Column>

      <Column width={150} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>Uploaded File</HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => (<a href={report?.uploaded_file_url} download>
            <Button variant='primary-outline' className='gap-3'>
              <Image src={DownloadIcon} alt="download.svg" />
              Download
            </Button>
          </a>
          )}
        </Cell>
      </Column>

      <Column width={125} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>Upload Type</HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => <p className=' whitespace-normal'>{(report?.upload_type)}</p>}
        </Cell>
      </Column>

      <Column width={220} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>
          <p className="whitespace-normal">File Upload Timestamp</p>
        </HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => <p className=' whitespace-normal'>{(report?.uploaded_time)}</p>}
        </Cell>
      </Column>
      <Column width={100} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>Upload Status</HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => {
            return (
              <>
                {
                  report?.uploaded_status === "Completed" ?
                    <div className="py-1 px-2 bg-success-50 rounded-md text-success-700 text-sm font-semibold">Completed</div>
                    :
                    <div className="py-1 px-2 bg-error-50 rounded-md text-error-700 text-sm font-semibold">Failed</div>
                }
              </>
            )
          }}
        </Cell>
      </Column>
      <Column width={220} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>
          <p className="whitespace-normal">Upload Completed Timestamp</p>
        </HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => <p className=' whitespace-normal'>{(report?.uploaded_completed_time || "-")}</p>}
        </Cell>
      </Column>
      <Column width={100} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>
          <p className="whitespace-normal">Total Uploaded Rows</p>
        </HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => (report?.total_row)}
        </Cell>
      </Column>
      <Column width={120} align='center' verticalAlign='center'>
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>Uploaded By</HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => (report?.user_type)}
        </Cell>
      </Column>
      <Column width={150} align='center' verticalAlign='center' fixed="right">
        <HeaderCell className='text-gray-900 text-[13px] font-semibold'>Report</HeaderCell>
        <Cell className='text-gray-700 text-sm font-semibold'>
          {(report: BulkUploadReport) => (<a href={report?.report_url} download>
            <Button variant='primary-outline' className='gap-3'>
              <Image src={DownloadIcon} alt="download.svg" />
              Download
            </Button>
          </a>
          )}
        </Cell>
      </Column>
    </Table>
  )
}

export default Reports