import { useState } from 'react';
import TemplateListItem from '../../components/template-list-item/template-list-item'
import { ReactSortable } from 'react-sortablejs';
import { useGetTemplatesInPageQuery } from 'services/website-page-and-template/index.query';

type TemplateListContainerProps = {
  page_id?: string
}

const TemplateListContainer = ({ page_id }: TemplateListContainerProps) => {

  const { data: homePageTemplate, isLoading } = useGetTemplatesInPageQuery({ page_type: "home_page", page_id: page_id! }, { skip: !page_id })

  console.log(homePageTemplate, "homepAgetemplate")

  const [items, setItems] = useState(
    [1, 2, 3, 4, 5].map((item) => ({ id: item, name: `Item ${item}` }))
  );

  // console.log(items)

  return (
    <div className="w-full overflow-x-scroll scrollbar-hide">
      <div className="min-w-[1024px] space-y-2">
        <ReactSortable list={items} setList={setItems} animation={200} className="space-y-2">
          {items.map((item) => (
            <TemplateListItem key={item.id} data-id={item.id} />
          ))}
        </ReactSortable>
      </div>

    </div>
  )
}

export default TemplateListContainer