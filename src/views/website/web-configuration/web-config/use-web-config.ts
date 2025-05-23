import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useUpdateWebsiteConfigMutation } from 'services/website-config/index.query';

type UseWebConfigProps = {
  websiteConfigData?: WebsiteConfig
}

const useWebConfig = ({ websiteConfigData }: UseWebConfigProps) => {
  const [updateWebsiteConfig, { isLoading }] = useUpdateWebsiteConfigMutation()

  const {
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      logo: [] as any,
      favicon: [] as any,
      facebook_url: "",
      instagram_url: "",
      whatsapp_number: "",
      customer_support_number: "",
      add_to_bag: true,
      capture_website_metrics: false,
      ui_settings: {
        auto_scroll_banner: true,
        auto_scroll_product_card: true,
        product_card_layout: "portrait",
        product_card_add_to_bag: true,
        show_order_cancel: true,
        size_confirmation: false,
        image_fit: 'cover',
        header_logo_size: "medium",
      },
      category_tags: [] as string[],
      policies: {
        use_default_privacy_policy: true,
        use_default_return_policy: true,
        use_default_terms_and_conditions: true,
        use_default_shipping_policy: true,
        use_default_about_us: true,
        policies_text_obj: {
          privacy_policy_text: "",
          return_policy_text: "",
          terms_and_conditions_text: "",
          shipping_policy_text: "",
          about_us_text: "",
        },
      },
    },
  });


  useEffect(() => {
    if (websiteConfigData) {
      setValue("name", websiteConfigData.name ?? "");
      setValue("description", websiteConfigData.description ?? "");
      setValue("logo", websiteConfigData.logo ? [{ index: 0, url: websiteConfigData.logo }] : []);
      setValue("favicon", websiteConfigData.favicon ? [{ index: 0, url: websiteConfigData.favicon }] : []);
      setValue("facebook_url", websiteConfigData.facebook_url ?? "");
      setValue("instagram_url", websiteConfigData.instagram_url ?? "");
      setValue("whatsapp_number", websiteConfigData.whatsapp_number ?? "");
      setValue("customer_support_number", websiteConfigData.customer_support_number ?? "");
      setValue("add_to_bag", websiteConfigData.add_to_bag ?? true);
      setValue("capture_website_metrics", websiteConfigData.capture_website_metrics ?? false);
      setValue("category_tags", websiteConfigData.category_tags ?? []);
      setValue("ui_settings", {
        auto_scroll_banner: websiteConfigData.ui_settings?.auto_scroll_banner ?? true,
        auto_scroll_product_card: websiteConfigData.ui_settings?.auto_scroll_product_card ?? true,
        product_card_layout: websiteConfigData.ui_settings?.product_card_layout ?? "portrait",
        product_card_add_to_bag: websiteConfigData.ui_settings?.product_card_add_to_bag ?? true,
        show_order_cancel: websiteConfigData.ui_settings?.show_order_cancel ?? true,
        size_confirmation: websiteConfigData.ui_settings?.size_confirmation ?? false,
        image_fit: websiteConfigData.ui_settings?.image_fit ?? "contain",
        header_logo_size: websiteConfigData.ui_settings?.header_logo_size ?? "medium",
      });
      setValue("policies", {
        use_default_privacy_policy: websiteConfigData.policies?.use_default_privacy_policy ?? true,
        use_default_return_policy: websiteConfigData.policies?.use_default_return_policy ?? true,
        use_default_terms_and_conditions: websiteConfigData.policies?.use_default_terms_and_conditions ?? true,
        use_default_shipping_policy: websiteConfigData.policies?.use_default_shipping_policy ?? true,
        use_default_about_us: websiteConfigData.policies?.use_default_about_us ?? true,
        policies_text_obj: {
          privacy_policy_text: websiteConfigData.policies?.policies_text_obj?.privacy_policy_text ?? "",
          return_policy_text: websiteConfigData.policies?.policies_text_obj?.return_policy_text ?? "",
          terms_and_conditions_text: websiteConfigData.policies?.policies_text_obj?.terms_and_conditions_text ?? "",
          shipping_policy_text: websiteConfigData.policies?.policies_text_obj?.shipping_policy_text ?? "",
          about_us_text: websiteConfigData.policies?.policies_text_obj?.about_us_text ?? "",
        },
      });
    }
  }, [websiteConfigData, setValue]);

  const handleSaveWebConfiguration = handleSubmit((data: any) => {
    const formDataPayload = new FormData();

    const payload = {
      name: data?.name,
      description: data?.description,
      facebook_url: data?.facebook_url,
      instagram_url: data?.instagram_url,
      whatsapp_number: data?.whatsapp_number,
      customer_support_number: data?.customer_support_number,
      add_to_bag: data?.add_to_bag,
      capture_website_metrics: data?.capture_website_metrics,
      category_tags: data?.category_tags,
      ui_settings: data?.ui_settings,
      policies: data?.policies
    };

    formDataPayload.append("data", JSON.stringify(payload));

    if (data.logo?.[0]?.blobFile) {
      formDataPayload.append("logo", data.logo[0].blobFile);
    }

    if (data.favicon?.[0]?.blobFile) {
      formDataPayload.append("favicon", data.favicon[0].blobFile);
    }

    updateWebsiteConfig(formDataPayload).unwrap()
      .then(() => {
        toast.success("Saved Suceessfully")
      })
      .catch((error) => {
        toast.error("Error in saving !!")
      })
  })

  return {
    control,
    watch,
    setValue,
    handleSaveWebConfiguration,
    isLoading
  }
}

export default useWebConfig