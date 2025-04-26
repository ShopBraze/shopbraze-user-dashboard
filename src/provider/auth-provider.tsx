import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'rsuite'
import { useGetUserDataQuery, usePostLoginUserMutation } from 'services/auth/index.query'
import { setAppViewChanging } from 'state/app-data/app-data'
import { setAuthUser, setCurrentView, setLoadingAuth } from 'state/auth/auth'
import { setUserProfile } from 'state/user-profile/user-profile'

type Props = {
  children: any
}

type AuthContextType = {
  login: (contact_number: string) => void,
  logout: () => void
}

const defaultValues: AuthContextType = {
  login: (contact_number: string) => { },
  logout: () => { }
}

const AuthContext = createContext(defaultValues)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: Props) => {
  const router = useRouter()

  const dispatch = useDispatch()
  const { isAppViewChanging } = useSelector((state: any) => state.appData)

  const { data, isLoading, isSuccess, isError } = useGetUserDataQuery({})
  const [postLoginUser] = usePostLoginUserMutation()

  useEffect(() => {
    if (isSuccess) {
      const authData = data?.data
      dispatch(setCurrentView(authData?.type === "system" ? "admin" : "seller"))
      dispatch(setAuthUser(authData))
      dispatch(setUserProfile(authData))
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (isSuccess || isError) dispatch(setLoadingAuth(false))
  }, [isSuccess, isError])

  const login = (contactNumber: string) => {
    dispatch(setAppViewChanging(true))
    postLoginUser({ contact_number: contactNumber }).unwrap()
      .then((data) => {
        const authData = data?.data
        dispatch(setCurrentView(authData?.type === "system" ? "admin" : "seller"))
        dispatch(setAuthUser(authData))
        dispatch(setUserProfile(authData))
        dispatch(setAppViewChanging(false))
        router.push(authData?.type === "system" ? "/sellers/sellers-list" : "/products/catalogue/list")
      }).catch((error) => {
        toast.error("Something Went Wrong")
      })
  }

  const logout = () => {

  }

  if (isLoading || isAppViewChanging)
    return (
      <div className="w-full h-[100vh] flex flex-col gap-3 justify-center items-center">
        <Loader size='md' />
        <p className="text-sm text-gray-700 font-bold">Loading</p>
      </div>
    )
  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider