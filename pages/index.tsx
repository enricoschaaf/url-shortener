import Head from "next/head"
import { useRef } from "react"
import { usePersistedState } from "../hooks"

const NameIt = ({ shortUrl, longUrl }) => {
  const link = useRef(null)
  return (
    <div
      className="border-b border-gray-200 px-4 py-5 sm:px-6 flex justify-between flex-col sm:flex-row leading-8"
      key={shortUrl}
    >
      <a className="pr-4" href={"https://" + longUrl} target="_blank" rel="noopener noreferrer">
        {longUrl}
      </a>
      <div className="flex justify-between">
        <a
          className="pr-4 text-blue-700"
          href={"https://" + shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          ref={link}
        >
          {shortUrl}
        </a>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(link.current.href)
          }}
          className="text-gray-400 hover:text-gray-500"
          style={{ justifySelf: "end" }}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <title>Copy</title>
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

const Index = () => {
  const [state, setState] = usePersistedState("key", [])
  return (
    <>
      <Head>
        <title>Url Shortener</title>
      </Head>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid row-gap-4 sm:row-gap-6 lg:row-gap-8">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            e.persist()
            const input = e.target[0].value.toLowerCase()

            const dublicate = state.find(({ longUrl }) => input === longUrl)
            if (!dublicate) {
              const res = await fetch("/api/create", {
                method: "POST",
                body: JSON.stringify({ longUrl: input })
              })
              const json = await res.json()
              if (json.data) {
                setState(() => [
                  ...state,
                  { longUrl: json.data.longUrl, shortUrl: json.data.shortUrl }
                ])
              }
              if (json.error) {
                console.error(json.error)
              }
            }
            e.target[0].value = ""
          }}
        >
          <div>
            <label htmlFor="longUrl" className="sr-only">
              Shorten your link
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="longUrl"
                className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-l-md sm:text-sm sm:leading-5 relative flex-grow focus-within:z-10"
                placeholder="Shorten your link"
                required
              />
              <button className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                Shorten
              </button>
            </div>
          </div>
        </form>
        {state.length > 0 && (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            {state.map(({ longUrl, shortUrl }) => (
              <NameIt key={longUrl} longUrl={longUrl} shortUrl={shortUrl} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Index
