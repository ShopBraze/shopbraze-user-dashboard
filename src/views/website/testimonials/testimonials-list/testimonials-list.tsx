import Button from 'common-components/button/button'
import ComponentLoader from 'common-components/loaders/component-loader'
import { Table } from 'rsuite'
import { Cell, HeaderCell, Column } from 'rsuite-table'
import { useGetTestimonialQuery, useToggleTestimonialVisibilityMutation } from 'services/testimonials/index.query'
import EditTestimonial from '../components/edit-testimonial/edit-testimonial'
import toast from 'react-hot-toast'

type Props = {}

const TestimonialsList = (props: Props) => {

  const [toggleTestimonialVisibility, { isLoading: isUpdating }] = useToggleTestimonialVisibilityMutation()
  const { data: testimonialsData, isLoading } = useGetTestimonialQuery()

  const handleUpdateVisibility = (visibility: boolean, testimonial_id: string) => {
    toggleTestimonialVisibility({ body: { visibility }, testimonial_id }).unwrap().then(() => {
      toast.success("Testimonial created successfully")
    })
      .catch((error) => {
        toast.error("Couldn't create testimonial")
      })
  }

  return (
    <>
      {
        isLoading ? <ComponentLoader containerClassName="h-[60vh]" /> :
          <div>

            <Table
              autoHeight
              data={testimonialsData || []}
              rowHeight={200}
              headerHeight={60}
            >
              <Column flexGrow={1} verticalAlign='center'>
                <HeaderCell className='text-sm font-semibold text-gray-600'>Customer Name</HeaderCell>
                <Cell className='py-1 px-2'>
                  {(data: TestiominialType) => <p className='text-[#1d2025] text-sm font-semibold'>{data?.name}</p>}
                </Cell>
              </Column>
              <Column flexGrow={1} verticalAlign='center'>
                <HeaderCell className='text-sm font-semibold text-gray-600'>Customer Rating</HeaderCell>
                <Cell className='py-1 px-2'>
                  {(data: TestiominialType) => <p className='text-[#1d2025] text-sm font-semibold'>{data?.rating}</p>}
                </Cell>
              </Column>
              <Column flexGrow={1} verticalAlign='center'>
                <HeaderCell className='text-sm font-semibold text-gray-600'>Review Text</HeaderCell>
                <Cell className='py-1 px-2'>
                  {(data: TestiominialType) => <p className='whitespace-break-spaces text-[#1d2025] text-sm font-semibold'>{data?.review_text}</p>}
                </Cell>
              </Column>
              <Column flexGrow={1} verticalAlign='center'>
                <HeaderCell className='text-sm font-semibold text-gray-600'>Is Visible</HeaderCell>
                <Cell className='py-1 px-2'>
                  {(data: TestiominialType) => <>
                    {
                      data?.is_visible ?
                        <div className="bg-[#f2f2f5] text-xs font-bold py-[2px] px-[6px] text-success-500 rounded-[2px]">TRUE</div>
                        : <div className='bg-[#f2f2f5] text-xs font-bold py-[2px] px-[6px] text-error-500 rounded-[2px]'>FALSE</div>
                    }
                  </>}
                </Cell>
              </Column>
              <Column flexGrow={1} verticalAlign='center'>
                <HeaderCell className='text-sm font-semibold text-gray-600'>Actions</HeaderCell>
                <Cell className='py-1 px-2'>
                  {(data: TestiominialType) => <div className='gap-y-3 flex flex-col justify-center'>
                    <EditTestimonial testimonial={data} />
                    <Button className='text-error-600 text-sm font-semibold'
                      onClick={() => {
                        handleUpdateVisibility(!data?.is_visible, data?.id)
                      }}
                      disabled={isUpdating ? true : false}
                    >
                      Change Visibility
                    </Button>
                  </div>
                  }
                </Cell>
              </Column>
            </Table>
          </div>
      }

    </>
  )
}

export default TestimonialsList