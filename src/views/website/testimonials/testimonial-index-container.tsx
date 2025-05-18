import { useRouter } from "next/router";
import TestimonialsList from "./testimonials-list/testimonials-list";
import CreateTestimonial from "./create-testimonial/create-testimonial";

type Props = {}

const TestimonialIndexContainer = (props: Props) => {
  const router = useRouter()
  const { tabName } = router.query;

  return (
    <div className="pt-5">
      {tabName === "testimonial-list" && <TestimonialsList />}
      {tabName === "create-testimonial" && <CreateTestimonial />}
    </div>
  )
}

export default TestimonialIndexContainer