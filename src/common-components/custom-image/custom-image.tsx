import Image from 'next/image'
import React, { useState } from 'react'

interface CustomImagePropType {
  src?: string
  alt: string
  height?: number
  width?: number
  className?: string
}

const CustomImage = ({ src, alt, className, height = 40, width = 40 }: CustomImagePropType) => {
  const [error, setError] = useState(!src)
  const classNameText = 'object-cover w-10 h-10 rounded-full ' + className
  return (
    <>
      {error || !src ? (
        <Image src={`https://ui-avatars.com/api/?name=${alt ? alt : ''}&length=1`} alt={'Image of ' + alt} height={height} width={width} className={classNameText} />
      ) : (
        <Image
          height={height}
          width={width}
          src={src ?? ""}
          alt={'Image of ' + alt}
          className={classNameText}
          onError={() => {
            setError(true)
          }}
        />
      )}
    </>
  )
}

export default React.memo(CustomImage)
