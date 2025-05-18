export const TestimonialDataTransformer = (res?: any) => {
  let testimonialsData = [] as TestiominialType[]

  if (res?.data?.length > 0) {
    for (let i = 0; i < res?.data?.length; i++) {
      const item = res?.data?.[i]
      let testimonial = {} as TestiominialType

      testimonial.id = item?._id
      testimonial.short_id = item?.short_id ?? '';
      testimonial.name = item?.name ?? '';
      testimonial.rating = item?.rating ?? '';
      testimonial.review_text = item?.review_text ?? '';
      testimonial.review_date = item?.review_date ?? '';
      testimonial.city = item?.city ?? '';
      testimonial.product_code = item?.product_code ?? '';
      testimonial.media = item?.media ?? [''];
      testimonial.profile_picture = item?.profile_picture ?? '';
      testimonial.is_visible = item?.is_visible

      testimonialsData.push(testimonial)
    }
  }
  return testimonialsData
}