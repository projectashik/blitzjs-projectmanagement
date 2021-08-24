export const Button = ({ children, ...props }) => {
  return (
    <button
      className="bg-purple-600 text-white px-3 py-2 rounded disabled:bg-purple-400 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  )
}
