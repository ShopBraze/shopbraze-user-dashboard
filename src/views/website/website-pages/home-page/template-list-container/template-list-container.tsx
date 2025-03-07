import TemplateListItem from '../../components/template-list-item/template-list-item'
import { ReactSortable } from 'react-sortablejs';

type TemplateListContainerProps = {
  page_id?: string
  handleEnableSaveTemplate: (val: boolean) => void
  templateListToRender?: any,
  setTemplateListToRender?: any
}

const TemplateListContainer = ({ page_id, handleEnableSaveTemplate, templateListToRender, setTemplateListToRender }: TemplateListContainerProps) => {

  return (
    <div className="w-full overflow-x-scroll scrollbar-hide">
      <div className="min-w-[1024px] space-y-2">
        <ReactSortable
          list={templateListToRender}
          setList={setTemplateListToRender}
          animation={200}
          onEnd={() => { handleEnableSaveTemplate(true) }}
          className="space-y-2"
        >
          {templateListToRender?.map((template: WebsitePageTemplate) => (
            <TemplateListItem key={template?.short_id} data-id={template?.short_id} data={template} page_id={page_id} />
          ))}
        </ReactSortable>
      </div>

    </div>
  )
}

export default TemplateListContainer