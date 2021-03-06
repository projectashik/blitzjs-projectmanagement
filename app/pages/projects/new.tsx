import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProject from "app/projects/mutations/createProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { CustomLink } from "app/core/components/CustomLink"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  return (
    <div className="mt-4">
      {" "}
      {/* Edited This Line */}
      <h1 className="text-xl mb-4">Create New Project</h1> {/* Edited This Line */}
      <ProjectForm
        submitText="Create Project"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProject}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const project = await createProjectMutation(values)
            router.push(Routes.ShowProjectPage({ projectId: project.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      <p className="mt-4">
        {/* Edited Section Start*/}
        <CustomLink href={Routes.ProjectsPage()}>
          <a>Projects</a>
        </CustomLink>
        {/* Edited Section End*/}
      </p>
    </div>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => <Layout title={"Create New Project"}>{page}</Layout>

export default NewProjectPage
