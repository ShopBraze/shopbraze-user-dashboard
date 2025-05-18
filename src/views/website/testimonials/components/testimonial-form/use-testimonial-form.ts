import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FileType } from 'rsuite/esm/Uploader'
import { usePostCreateTestimonialMutation, useUpdateTestimonialMutation } from 'services/testimonials/index.query'

type UseTestimonialFormProps = {
  testimonial?: TestiominialType
  onUpdateSuccess?: Function
}

const useTestimonialForm = ({ testimonial, onUpdateSuccess }: UseTestimonialFormProps) => {
  const router = useRouter()

  const [postCreateTestimonial, { isLoading: isCreating }] = usePostCreateTestimonialMutation()
  const [updateTestimonial, { isLoading: isUpdating }] = useUpdateTestimonialMutation()

  const { control, watch, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      name: testimonial?.name ?? '',
      rating: testimonial?.rating ?? '',
      review_text: testimonial?.review_text ?? '',
      review_date: testimonial?.review_date ?? '',
      city: testimonial?.city ?? '',
      product_code: testimonial?.product_code ?? '',
      product_images: testimonial?.media && testimonial?.media?.length > 0 ? testimonial?.media?.map((url, index) => ({ name: `${index}-image`, url })) : [] as FileType[],
      profile_pic: testimonial?.profile_picture ? [{ name: 'profile-pic', url: testimonial?.profile_picture }] : [] as FileType[],
      delete_media: {
        product_images: [],
        profile_pic: []
      } as any
    },
    mode: 'onChange'
  })

  const handleProductImagesChange = (fileList: FileType[]) => {
    setValue("product_images", fileList)
  };

  const handleProfilePicChange = (fileList: FileType[]) => {
    setValue("profile_pic", fileList)
  };

  const handleRemoveFile = (file: FileType, type: "product_images" | "profile_pic") => {
    if (file?.url) {
      if (type === "product_images") {
        setValue('delete_media.product_images', [...watch('delete_media.product_images'), file.url])
      }
      else {
        setValue('delete_media.profile_pic', [...watch('delete_media.profile_pic'), file.url])
      }
    }
  };

  const handleCreate = handleSubmit((formData: any) => {
    const { product_images, profile_pic, ...data } = formData

    if (product_images?.length > 5 || profile_pic?.length > 1) return toast.error("Please add less file")

    const formDataPayload = new FormData()
    formDataPayload.append("data", JSON.stringify(data));

    product_images?.forEach((file: any) => {
      if (file.blobFile) {
        formDataPayload.append("product_images", file.blobFile, file.name);
      }
    });
    if (profile_pic?.length > 0) {
      formDataPayload.append('profile_pic', profile_pic?.[0]?.blobFile, profile_pic?.[0]?.name)
    }

    postCreateTestimonial(formDataPayload).unwrap()
      .then(() => {
        toast.success("Testimonial created successfully")
        router.push("/website/testimonials/testimonial-list")
      })
      .catch((error) => {
        toast.error("Couldn't create testimonial")
      })

  })


  const handleUpdate = handleSubmit((formData: any) => {

    if (!testimonial) return;

    const { product_images, profile_pic, delete_media, ...data } = formData

    if (product_images?.length > 5 || profile_pic?.length > 1) return toast.error("Please add less file")

    const formDataPayload = new FormData();
    formDataPayload.append("data", JSON.stringify(data));

    if (delete_media?.product_images?.length > 0 || delete_media?.profile_pic?.length > 0) {
      formDataPayload.append("delete_media", JSON.stringify(delete_media));
    }

    if (product_images?.filter((file: FileType) => file?.blobFile)?.length > 0 || delete_media?.product_images?.length > 0) { // This means either new file is added or any file is deleted
      formDataPayload.append("all_product_images", JSON.stringify(product_images));
      product_images?.forEach((file: FileType) => {
        if (file?.blobFile) {
          formDataPayload.append("product_images", file.blobFile, file.name);
        }
      });
    }

    if (profile_pic?.filter((file: FileType) => file?.blobFile)?.length > 0 || delete_media?.profile_pic?.length > 0) { // This means either new file is added or any file is deleted
      if (profile_pic?.[0]?.blobFile) {
        formDataPayload.append("profile_pic_image", JSON.stringify(profile_pic?.[0]));
        formDataPayload.append('profile_pic', profile_pic?.[0]?.blobFile, profile_pic?.[0]?.name)
      }
    }

    updateTestimonial({ body: formDataPayload, testimonial_short_id: testimonial?.short_id }).unwrap()
      .then(() => {
        toast.success("Testimonial Updated")
        if (onUpdateSuccess) onUpdateSuccess()
      })
      .catch((error) => {
        toast.error("Couldn't update testimonial")
      })
  })


  return {
    control,
    watch,
    register,
    setValue,
    handleProductImagesChange,
    handleProfilePicChange,
    handleCreate,
    isCreating,
    isUpdating,
    handleRemoveFile,
    handleUpdate
  }
}

export default useTestimonialForm