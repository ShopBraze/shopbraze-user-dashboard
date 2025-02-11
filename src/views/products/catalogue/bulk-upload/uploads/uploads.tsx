import Button from 'common-components/button/button';
import DownloadIcon from "assets/icons/download-icon-primary.svg"
import { Table } from 'rsuite';
import Image from 'next/image';
import UploadCsvButton from './upload-csv-btn/upload-csv-btn';

type Props = {}

const Uploads = (props: Props) => {
  const { Column, HeaderCell, Cell } = Table;

  const sampleData = [
    {
      action: "Create Catalogues",
      guidelines: "abc.com.pdf",
      sampleCsv: "abc.com.csv",
    }
  ]
  return (
    <div>
      <Table
        height={400}
        data={sampleData}
        rowHeight={80}
        headerHeight={60}
      >
        <Column flexGrow={0.25} align="center" verticalAlign='center'>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            Create Catalogues
          </Cell>
        </Column>

        <Column flexGrow={0.25} align='center' verticalAlign='center'>
          <HeaderCell>Guidelines</HeaderCell>
          <Cell >
            <Button variant='primary-outline' className='gap-3'>
              <Image src={DownloadIcon} alt="download.svg" />
              Download
            </Button>
          </Cell>
        </Column>

        <Column flexGrow={0.25} align='center' verticalAlign='center'>
          <HeaderCell>Download Sample CSV</HeaderCell>
          <Cell >
            <Button variant='primary-outline' className='gap-3'>
              <Image src={DownloadIcon} alt="download.svg" />
              Download
            </Button>
          </Cell>
        </Column>

        <Column flexGrow={0.25} align='center' verticalAlign='center'>
          <HeaderCell>Upload CSV</HeaderCell>
          <Cell>
            <UploadCsvButton />
          </Cell>
        </Column>
      </Table>
    </div>
  )
}

export default Uploads