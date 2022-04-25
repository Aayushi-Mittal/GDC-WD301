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
                    <div className="block border-2 rounded-lg p-4 mt-2 border-cyan-200 max-w-sm">
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
    )
}

export default FormList