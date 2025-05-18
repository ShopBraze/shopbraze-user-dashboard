import baseApi from "services/base-api";
import endpoints from "services/endpoints";
import { TestimonialDataTransformer } from "./transformers/index.transformers";


export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getTestimonial: builder.query<TestiominialType[], void>({
      query: (body) => ({
        url: endpoints.testimonials,
      }),
      providesTags: ['testimonials'],
      transformResponse: (res) => TestimonialDataTransformer(res)
    }),
    postCreateTestimonial: builder.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: endpoints.testimonials,
        body
      }),
      invalidatesTags: ['testimonials']
    }),
    updateTestimonial: builder.mutation<any, any>({
      query: ({ body, testimonial_short_id }) => ({
        method: "PUT",
        url: `${endpoints.testimonials}/${testimonial_short_id}`,
        body: body,
      }),
      invalidatesTags: ['testimonials']
    }),
    toggleTestimonialVisibility: builder.mutation<any, any>({
      query: ({ body, testimonial_id }) => ({
        method: "PUT",
        url: `${endpoints.update_testimonial_visibility}/${testimonial_id}`,
        body: body,
      }),
      invalidatesTags: ['testimonials']
    }),
  })
})



export const { useGetTestimonialQuery, usePostCreateTestimonialMutation, useUpdateTestimonialMutation, useToggleTestimonialVisibilityMutation } = testimonialsApi