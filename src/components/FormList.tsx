import React from 'react'

const FormList = (props:{
        openSelectedFormCB: (id: number) => void,
        deleteSelectedFormCB: (id: number) => void,
        createNewFormCB: () => void,
        formList: {
            id: number;
            title: string;
            formFields: {
                id: number;
                label: string;
                type: string;
                value: string;
            }[];
          }[];
    }) => {
    return (
        <div>
            <button className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300" onClick={props.createNewFormCB}>New Form</button>
            {props.formList.map((form) =>
                <div key={form.id} className="flex justify-center my-2">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{form.title} </h5>
                        <p className="text-gray-700 text-base mb-4">
                                This form contains {form.formFields.length} questions.
                        </p>
                        <button type="button" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4" onClick={() => { props.openSelectedFormCB(form.id) }}>Open</button>
                        <button type="button" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300" onClick={() => { props.deleteSelectedFormCB(form.id) }}>Delete Form</button>
                    </div>
                </div>
            )}
        </div>
        // <div>
        //     (<div>
        //         <button className="my-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={createNewForm}>New Form</button>
        //         {formList.map((form) =>
        //             <div key={form.id} className="flex justify-center my-2">
        //                 <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        //                     <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{form.title} </h5>
        //                     <p className="text-gray-700 text-base mb-4">
        //                         This form contains {form.formFields.length} questions to answer.
        //                     </p>
        //                     <button type="button" className="mx-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { openSelectedForm(form.id) }}>Open</button>
        //                     <button type="button" className="mx-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { deleteSelectedForm(form.id) }}>Delete Form</button>
        //                 </div>
        //             </div>)
        //         }
        //     </div>)
        // </div>
    )
}

export default FormList