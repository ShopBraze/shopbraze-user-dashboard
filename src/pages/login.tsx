import Button from 'common-components/button/button'
import { useAuth } from 'provider/auth-provider'
import React, { useState } from 'react'
import { Input } from 'rsuite'


type Props = {}

const Login = (props: Props) => {
  const { login } = useAuth()
  const [contactNumber, setContactNumber] = useState("")

  return (
    <div className='bg-primary-200 h-full w-full'>
      <div className="mx-auto p-8 rounded-md bg-[#fff] space-y-6 w-[400px]">
        <Input placeholder="Default Input" type='number' onChange={(val) => setContactNumber(val)} />
        <Button variant='primary' onClick={() => { login(contactNumber) }} disabled={contactNumber?.length !== 10}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login