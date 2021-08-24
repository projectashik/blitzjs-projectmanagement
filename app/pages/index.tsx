import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { CustomLink } from "app/core/components/CustomLink"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const user = useCurrentUser()
  return (
    <div className="flex justify-center my-4">{user && <div>Logged in as {user.email}.</div>}</div>
  )
}

const Home: BlitzPage = () => {
  return (
    <>
      <Suspense fallback="Loading User Info...">
        <UserInfo />
      </Suspense>
      <div className="flex justify-center">
        <CustomLink href="/projects">Manage Projects</CustomLink>
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
Home.authenticate = true

export default Home
