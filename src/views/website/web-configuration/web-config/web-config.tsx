import { TagInput, Toggle, Uploader } from 'rsuite';
import useWebConfig from './use-web-config'
import TextInput from 'common-components/form-components/text-input/text-input'
import MobileNumberInput from 'common-components/form-components/mobile-number-input/mobile-number-input'
import UpdatePolicy from './update-policy/update-policy';
import Button from 'common-components/button/button';
import UploadIcon from "assets/icons/upload-cloud-arrow-icon.svg"
import Image from 'next/image';
import { useGetWebsiteConfigQuery } from 'services/website-config/index.query';

type Props = {}

const WebConfig = (props: Props) => {
  const { data: websiteConfigData } = useGetWebsiteConfigQuery()

  const { watch, control, setValue, handleSaveWebConfiguration, isLoading } = useWebConfig({ websiteConfigData })

  return (
    <div className="bg-[#fff] p-4 rounded-md w-full md:w-1/2 mx-auto">
      <TextInput
        name="name"
        control={control}
        label={<p className="text-sm font-medium">Website Name<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        containerClassName="space-y-1"
        placeholder="Surat fashion store"
        rules={{
          required: 'Please input your website name!',
        }}
      />
      <TextInput
        name="description"
        control={control}
        label={<p className="text-sm font-medium">Website Description<span className="text-red-300 h-5 w-1.5 font-bold">*</span></p>}
        containerClassName="space-y-1"
        placeholder=""
        rules={{
          required: 'Please input your website description!',
        }}
      />
      <div className="flex gap-3">
        <TextInput
          name="instagram_url"
          control={control}
          label={<p className="text-sm font-medium">Instagram URL</p>}
          containerClassName="w-full space-y-1"
        />
        <TextInput
          name="facebook_url"
          control={control}
          label={<p className="text-sm font-medium">Facebook URL</p>}
          containerClassName="w-full space-y-1"
        />
      </div>
      <div className="flex gap-3 items-center">
        <MobileNumberInput
          control={control}
          name="customer_support_number"
          label={<p className="text-sm font-medium">Customer support contact number</p>}
          containerClassName='w-full'
          placeholder="Ex: 7352669258"
        />
        <MobileNumberInput
          control={control}
          name="whatsapp_number"
          label={<p className="text-sm font-medium">Whatsapp Number</p>}
          containerClassName='w-full'
          placeholder="Ex: 7352669258"
        />
      </div>
      <div className="mt-3 w-full space-y-1">
        <p className="text-sm font-medium">Category Tags</p>
        <TagInput
          className="w-full"
          value={watch('category_tags')}
          onChange={(value: readonly string[]) => {
            setValue('category_tags', [...value]);
          }}
          placeholder='Art Silk, Chiffron, Kashmiri Wool'
        />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-sm font-medium">Upload Policies</p>
        <div className="flex flex-wrap gap-2">
          <UpdatePolicy
            policy_type='privacy'
            btn_text='Privacy Policy'
            watch={watch} setValue={setValue}
            default_enabled_policy_key='policies.use_default_privacy_policy'
            policy_text_obj_key='policies.policies_text_obj.privacy_policy_text'
          />
          <UpdatePolicy
            policy_type='return'
            btn_text='Return Policy'
            watch={watch} setValue={setValue}
            default_enabled_policy_key='policies.use_default_return_policy'
            policy_text_obj_key='policies.policies_text_obj.return_policy_text'
          />
          <UpdatePolicy
            policy_type='shipping'
            btn_text='Shipping Policy'
            watch={watch} setValue={setValue}
            default_enabled_policy_key='policies.use_default_shipping_policy'
            policy_text_obj_key='policies.policies_text_obj.shipping_policy_text'
          />
          <UpdatePolicy
            policy_type='terms-and-conditions'
            btn_text='Terms And Conditions' watch={watch}
            setValue={setValue}
            default_enabled_policy_key='policies.use_default_terms_and_conditions'
            policy_text_obj_key='policies.policies_text_obj.terms_and_conditions_text'
          />
          <UpdatePolicy
            policy_type='about-us'
            btn_text='About Us'
            watch={watch}
            setValue={setValue}
            default_enabled_policy_key='policies.use_default_about_us'
            policy_text_obj_key='policies.policies_text_obj.about_us_text'
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className=" flex items-center gap-2">
          <div className="w-full space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Auto Scroll Product Card</p>
              <Toggle
                checked={
                  watch('ui_settings.auto_scroll_product_card')
                }
                color="violet"
                onChange={(checked) => { setValue('ui_settings.auto_scroll_product_card', checked) }}
              />
            </div>
          </div>
          <div className="w-full space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Auto Scroll Banner </p>
              <Toggle
                checked={
                  watch('ui_settings.auto_scroll_banner')
                }
                color="violet"
                onChange={(checked) => { setValue('ui_settings.auto_scroll_banner', checked) }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Ask For Size After Buy Now/Add To Cart</p>
              <Toggle
                checked={
                  watch('ui_settings.size_confirmation')
                }
                color="violet"
                onChange={(checked) => { setValue('ui_settings.size_confirmation', checked) }}
              />
            </div>
          </div>
          <div className="w-full space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Capture Website Metrics</p>
              <Toggle
                checked={
                  watch('capture_website_metrics')
                }
                color="violet"
                onChange={(checked) => { setValue('capture_website_metrics', checked) }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Enable Add To Bag Feature</p>
              <Toggle
                checked={
                  watch('add_to_bag')
                }
                color="violet"
                onChange={(checked) => { setValue('add_to_bag', checked) }}
              />
            </div>
          </div>
          {
            watch('add_to_bag') && <div className="w-full space-y-1.5">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium">Enable Add To Bag On Product Card</p>
                <Toggle
                  checked={
                    watch('ui_settings.product_card_add_to_bag')
                  }
                  color="violet"
                  onChange={(checked) => { setValue('ui_settings.product_card_add_to_bag', checked) }}
                />
              </div>
            </div>
          }

        </div>

        <div className="flex items-center gap-2">
          <div className="w-full space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Enable Order Cancel On Website</p>
              <Toggle
                checked={
                  watch('ui_settings.show_order_cancel')
                }
                color="violet"
                onChange={(checked) => { setValue('ui_settings.show_order_cancel', checked) }}
              />
            </div>
          </div>
        </div>


      </div>

      <div className="mt-4 flex gap-4 items-center">
        <p className="text-sm font-semibold text-gray-800">Product Card Layout</p>
        <div className="flex gap-3">
          {
            ['Portrait', 'Square']?.map((item, index) => {
              return (
                <Button variant={`${watch('ui_settings.product_card_layout') === item?.toLocaleLowerCase() ? 'primary' : 'secondary'}`}
                  key={index}
                  className='text-sm font-medium !rounded-md'
                  onClick={() => { setValue('ui_settings.product_card_layout', item?.toLocaleLowerCase()) }}
                >
                  {item}
                </Button>
              )
            })
          }
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <p className="text-sm font-semibold text-gray-800">Fit To Container</p>
        <div className="flex gap-3">
          {
            ['Contain', 'Cover']?.map((item, index) => {
              return (
                <Button variant={`${watch('ui_settings.image_fit') === item?.toLocaleLowerCase() ? 'primary' : 'secondary'}`}
                  key={index}
                  className='text-sm font-medium !rounded-md'
                  onClick={() => { setValue('ui_settings.image_fit', item?.toLocaleLowerCase()) }}
                >
                  {item}
                </Button>
              )
            })
          }
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <p className="text-sm font-semibold text-gray-800">Header Logo Size</p>
        <div className="flex gap-3">
          {
            ['original', 'small', 'medium', 'large']?.map((item, index) => {
              return (
                <Button variant={`${watch('ui_settings.header_logo_size') === item?.toLocaleLowerCase() ? 'primary' : 'secondary'}`}
                  key={index}
                  className='text-sm font-medium !rounded-md'
                  onClick={() => { setValue('ui_settings.header_logo_size', item?.toLocaleLowerCase()) }}
                >
                  {item}
                </Button>
              )
            })
          }
        </div>
      </div>

      <div className="mt-4 flex gap-2 ">
        <div className="w-full space-y-3">
          <p className="text-sm font-semibold text-gray-800">Website Logo</p>
          <Uploader
            multiple
            listType="picture"
            action={''}
            shouldUpload={() => false}
            accept="image/*"
            onChange={(fileList) => { setValue('logo', fileList) }}
            fileList={watch('logo')}
            disabled={watch('logo')?.length >= 1}
          >
            <div style={{ width: 100, height: 100 }}>
              <Image src={UploadIcon} alt="upload.svg" />
            </div>
          </Uploader>
        </div>

        <div className="w-full space-y-3">
          <p className="text-sm font-semibold text-gray-800">Website Favicon</p>
          <Uploader
            multiple
            listType="picture"
            action={''}
            shouldUpload={() => false}
            accept="image/*"
            onChange={(fileList) => { setValue('favicon', fileList) }}
            fileList={watch('favicon')}
            disabled={watch('favicon')?.length >= 1}
          >
            <div style={{ width: 100, height: 100 }}>
              <Image src={UploadIcon} alt="upload.svg" />
            </div>
          </Uploader>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant='primary' onClick={handleSaveWebConfiguration} isLoading={isLoading}>
          Save Configuration
        </Button>
      </div>
    </div>
  )
}

export default WebConfig