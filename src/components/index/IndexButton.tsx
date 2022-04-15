export default function IndexButton ({buttonText, href, className, icon}) {

  const transitionClassName = "transition ease-in-out delay-0 bg-blue-500 hover:-translate-y-0 hover:scale-110 hover:bg-indigo-500 duration-300"

  return (
      <div className="mb-4">
        <a href={href}>
          <button
            type="button"
            className={transitionClassName+ " w-60 inline-flex items-center justify-center px-8 py-5 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" + className}
          >
            {icon}
            {buttonText}
          </button>
        </a>
      </div>
  )
}