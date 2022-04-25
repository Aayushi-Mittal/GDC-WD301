import React from 'react'
import { useEffect, useState } from "react";
import { Link, useQueryParams } from 'raviger';
import { formData } from "../utils/FormDataType";
import { getLocalForms } from "../utils/Storage";

const Home = () => {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("")
  const [forms, setForms] = React.useState<formData[]>(getLocalForms());

  useEffect(() => {
    localStorage.setItem("savedForms", JSON.stringify(forms))
  }, [forms])

  return (
    <div className="mt-4">
        <div className='mt-2 flex items-center gap-2 justify-between'>
          <form onSubmit={(e) => {
            e.preventDefault();
            setQuery({ search: searchString })
          }}>
            <input name="search" value={searchString} onChange={(e) => {
              setSearchString(e.target.value)
            }}
              type="text"
              placeholder="search"
              className='p-2 bg-gray-100 rounded-lg outline-cyan-500 w-full' />
          </form>
          <Link href={'/forms/0'} className='p-2 bg-cyan-200 rounded-lg hover:bg-cyan-300'>+ New Form</Link>
        </div>
        <div className="flex gap-6 flex-wrap">
          {forms.filter((form) => form.title.toLowerCase().includes(search?.toLowerCase() || "")).map((form) =>
            <div key={form.id} className="flex justify-center my-2">
              <div className="block border-2 rounded-lg p-4 mt-2 border-cyan-200 max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{form.title} </h5>
                <p className="text-gray-700 text-base mb-4">
                  This form contains {form.formFields.length} questions.
                </p>
                <Link type="button" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4" href={`/forms/${form.id}`}>Open</Link>
                <button type="button" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4" onClick={() => { setForms(forms.filter((f) => f.id !== form.id)) }}>Delete</button>
                <Link type="button" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4" href={`/preview/${form.id}`}>Preview</Link>
              </div>
            </div>)
          }
        </div>
    </div>
  )
}

export default Home