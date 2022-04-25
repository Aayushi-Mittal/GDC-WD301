import { navigate } from "raviger";
import { useState, useEffect } from "react";
import PreviewLabeledInput from "./PreviewLabeledInput";
import { formData, formField } from "../utils/FormDataType"

const initialFormFields: formField[] = [];

const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const initialState: (id: number) => formData = (id) => {
    const newForm = {
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    }
    const localForms = getLocalForms();
    if (id !== 0) {
        const form = localForms.find((f) => f.id === id)
        if (form) {
            return form
        }
    }
    else {
        saveLocalForms([...localForms, newForm])
        return newForm
    }
    return newForm
}

const saveLocalForms = (localForms: formData[]) => {
    localStorage.setItem("savedForms", JSON.stringify(localForms))
}

const saveFormData = (currentState: formData) => {
    const localForms = getLocalForms();
    const updatedLocalForms = localForms.map((form) =>
        form.id === currentState.id ? currentState : form
    )
    saveLocalForms(updatedLocalForms);
}

export function PreviewQuiz(props: { formId: number }) {
    const [state, setState] = useState({
        id: Number(new Date()),
        title: "Untitled Form",
        formFields: initialFormFields
    })
    const [currentQuestion, setCurrentQuestionState] = useState(0)

    useEffect(() => {
        state.id !== props.formId && navigate(`/preview/${state.id}`)
    }, [state.id, props.formId])

    useEffect(() => {
        const currentForm = initialState(props.formId)
        setState(currentForm)
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {
            saveFormData(state);
            console.log("data saved", state)
        }, 1000)
        return () => {
            console.log("timer stopped")
            clearTimeout(timeout)
        }

    }, [state])

    const updateField = (value: string, id: number) => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                if (field.id === id) {
                    return ({
                        ...field,
                        value: value
                    })
                }
                return ({
                    ...field
                })
            })
        })
    }

    const resetForm = () => {
        setState({
            ...state,
            formFields: state.formFields.map((field) => {
                return ({
                    ...field,
                    value: ""
                })
            })
        }
        )
    }


    return (
        <div>
            <div className="flex flex-col gap-2 border-2 rounded-lg p-4 mt-2 border-cyan-200">
                <h1 className="text-xl">{state.title}</h1>
                <div className="text-sm py-2 font-semibold">
                    Question {currentQuestion + 1}:
                    <br />

                    {state.formFields.map((field, index) =>
                        index === currentQuestion ? <PreviewLabeledInput id={field.id} key={field.id} label={field.label} type={field.type} value={field.value} updateFieldCB={updateField} /> : ""
                    )}
                </div>

                <div className='flex'>
                    {state.formFields.length - 1 !== Number(currentQuestion) ? <button onClick={() => {
                        saveFormData(state)
                        setCurrentQuestionState(Number(currentQuestion + 1))
                    }} className='p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4' >Next</button> : ""}
                    {Number(currentQuestion) !== 0 ? <button onClick={() => {
                        saveFormData(state)
                        setCurrentQuestionState(Number(currentQuestion - 1))
                    }} className='p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4' >Back</button> : ""}
                    {state.formFields.length - 1 === Number(currentQuestion) ? <button onClick={() => {
                        saveFormData(state)
                        navigate(`/`)
                    }} className='p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4' >Submit</button> : ""}
                    <button onClick={() => {
                        resetForm()
                        setCurrentQuestionState(0)
                    }} className='p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4' >Reset Quiz</button>
                </div>
            </div>
        </div>
    )
}

export default PreviewQuiz;