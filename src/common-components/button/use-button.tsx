import React from 'react'

type UseButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  variant?: 'primary' | 'secondary' | 'tertiary'
}
const useButton = ({ onClick, variant }: UseButtonProps) => {
  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e)
    }
  }

  const getButtonClassNameByVariant = () => {
    switch (variant) {
      case 'primary':
        return 'py-2.5 px-[18px] border border-primary-500 rounded-lg bg-primary-500 text-[#fff] font-medium flex items-center justify-center'
      case 'secondary':
        return 'py-2.5 px-[18px] border border-gray-200 rounded-lg bg-white text-primary-800 font-medium flex justify-center'
      case 'tertiary':
        return 'text-error-600 font-medium'
      default:
        return ''
    }
  }

  return { buttonHandler, getButtonClassNameByVariant }
}

export default useButton