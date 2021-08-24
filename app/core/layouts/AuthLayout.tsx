import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  heading: string
  children: ReactNode
}

const AuthLayout = ({ title, heading, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "ProjectManagement"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:max-w-2xl mt-5">
          <h2 className="text-xl mb-2">{heading}</h2>
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
