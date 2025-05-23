import Button from "common-components/button/button"
import { useState } from "react"
import { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Modal, Toggle } from "rsuite"
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";

type UpdatePolicyProps = {
  policy_type: 'privacy' | 'return' | 'shipping' | 'terms-and-conditions' | 'about-us'
  btn_text: string
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
  default_enabled_policy_key: string
  policy_text_obj_key: string
}
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});


const UpdatePolicy = ({ policy_type, btn_text, watch, setValue, default_enabled_policy_key, policy_text_obj_key }: UpdatePolicyProps) => {
  const [openModal, setOpenModal] = useState(false)
  const handleToggleModal = () => {
    setOpenModal(!openModal)
  }
  return (
    <>
      <Button variant="primary" onClick={handleToggleModal}>
        {btn_text}
      </Button>
      <Modal open={openModal} onClose={handleToggleModal} className='w-[590px]'>
        <Modal.Header className='border-b border-gray-200 px-5 py-3'>
          <p className="text-gray-700 font-medium text-lg">Upload Policy</p>
        </Modal.Header>
        <Modal.Body className='p-5 py-3 '>
          <div className="flex items-center gap-3">
            <p className=" font-medium">Use Default Template</p>
            <Toggle
              checked={
                watch(default_enabled_policy_key)
              }
              color="green"
              onChange={(checked) => { setValue(default_enabled_policy_key, checked) }}
            />
          </div>

          {
            !watch(default_enabled_policy_key) &&
            <div className="mt-4">
              <ReactQuill
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: [] }],
                    [{ font: [] }],
                    [{ align: ["right", "center", "justify"] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    [{ color: ["red", "#785412"] }],
                    [{ background: ["red", "#785412", 'gray', 'blue', 'black', 'pink', 'green', 'yellow'] }]
                  ]
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "link",
                  "color",
                  "image",
                  "background",
                  "align",
                  "size",
                  "font"
                ]}
                value={watch(policy_text_obj_key)}
                onChange={(content) => { setValue(policy_text_obj_key, content) }}
              />
            </div>
          }

          <div className="mt-5 w-full flex justify-end">
            <Button variant="primary" onClick={handleToggleModal}>Save</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UpdatePolicy