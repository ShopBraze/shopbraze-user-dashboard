import { LoaderWithThreeDots } from "../loaders/loader-with-three-dots"
import useButton from "./use-button"

type ButtonProps = {
  onClick?: Function
  children: React.ReactNode | string
  variant?: 'primary' | 'primary-outline' | 'secondary' | 'tertiary'
  isLoading?: boolean
  loaderColor?: string
  ref?: any
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ onClick, children, variant, ref, isLoading, loaderColor, disabled, className, ...props }: ButtonProps) => {
  const { buttonHandler, getButtonClassNameByVariant } = useButton({ variant, onClick })
  return (
    <button {...props} onClick={buttonHandler} ref={ref} disabled={isLoading || disabled} className={`${getButtonClassNameByVariant()} ${className} disabled:opacity-70 disabled:cursor-not-allowed`}>
      {isLoading ? <LoaderWithThreeDots color={loaderColor || '#f1f1f1'} /> : children}
    </button>
  )
}

export default Button