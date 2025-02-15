import React from 'react'
import { Loader } from 'rsuite'

type ComponentLoaderProps = {
  loaderSize?: "md" | "lg" | "sm" | "xs"
  containerClassName?: string
}

const ComponentLoader = ({ loaderSize = "md", containerClassName }: ComponentLoaderProps) => {
  return (
    <div className={`h-[80vh] flex justify-center items-center ${containerClassName}`}>
      <Loader size={loaderSize} />
    </div>
  )
}

export default ComponentLoader