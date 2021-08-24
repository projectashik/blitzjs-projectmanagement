import { forwardRef, PropsWithoutRef } from "react"
import { Field, useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextAreaField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label className="flex flex-col items-start">
          {label}
          <Field
            component={"textarea"}
            className="px-1 py-2 border rounded focus:ring focus:outline-none ring-purple-200 block w-full my-2"
            {...props}
            {...input}
            disabled={submitting}
          ></Field>
        </label>

        {touched && normalizedError && (
          <div role="alert" className="text-sm" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextAreaField
