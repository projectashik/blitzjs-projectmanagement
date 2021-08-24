import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"
import { CustomLink } from "app/core/components/CustomLink"
import { Button } from "app/core/components/Button"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })

  return (
    <>
      <Head>
        <title>Project {project.id}</title>
      </Head>

      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>

        <CustomLink href={Routes.EditProjectPage({ projectId: project.id })}>Edit</CustomLink>

        <Button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProjectMutation({ id: project.id })
              router.push(Routes.ProjectsPage())
            }
          }}
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        >
          Delete
        </Button>
        <CustomLink href={Routes.TasksPage({ projectId: project.id })}>Tasks</CustomLink>
      </div>
    </>
  )
}

const ShowProjectPage: BlitzPage = () => {
  return (
    <div className="mt-2">
      <p className="mb-2">
        <CustomLink href={Routes.ProjectsPage()}>Projects</CustomLink>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}

ShowProjectPage.authenticate = true
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage
