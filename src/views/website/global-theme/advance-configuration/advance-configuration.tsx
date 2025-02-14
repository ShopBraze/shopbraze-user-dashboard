import React from 'react'
import { useGetThemeSettingsQuery } from 'services/website-config/index.query'

type Props = {}

const AdvanceConfiguration = (props: Props) => {
  const { data } = useGetThemeSettingsQuery()
  console.log(data)
  return (
    <div>AdvanceConfiguration</div>
  )
}

export default AdvanceConfiguration