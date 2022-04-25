import LabelledInput from "./LabelledInput";
import AddField from "./AddField";
import FormList from "./FormList";
import { Link, navigate } from "raviger";
import { formData, formField } from "../utils/FormDataType"
import React, { useState, useEffect, useRef } from "react";

const initialFormFields: formField[] = [];

const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
}

const initialState: (id: number) => formData = (id) => {
  console.log("start process")
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

function Form(props: { formId: number }) {
  const [state, setState] = useState({
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields
  })
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      state.id !== props.formId && navigate(`/forms/${state.id}`)
  }, [state.id, props.formId])

  useEffect(() => {
      console.log("Component mounted");
      document.title = "Form Editor";
      titleRef.current?.focus();
      return () => {
          console.log("Component unmounted");
          document.title = "React App";
      }
  }, [])

  useEffect(() => {
      let timeout = setTimeout(() => {
          saveFormData(state);
          console.log("State saved to Local Storage", state)
      }, 1000)
      return () => {
          clearTimeout(timeout)
      }

  }, [state])

  useEffect(() => {
      const currentForm = initialState(props.formId)
      setState(currentForm)
  }, [])

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
            id: Number(new Date()),
            label: newField,
            type: newFieldType,
            value: ""
        }
      ]
    })
    setNewField("");
    setNewFieldType("text");
  }

  const updateInputValue = (id: number, value: string) => {
    const newState = [...state.formFields];
    const stateObjectIndex = state.formFields.findIndex((field) => field.id === id);
    newState[stateObjectIndex] = { ...newState[stateObjectIndex], value };
    setState({ ...state, formFields: newState});
  }

  const removeField = (id: number) => {
    setState({ ...state, formFields: state.formFields.filter(field => field.id !== id) })
  }

  return (
    <div className="mt-6">
        <div className="flex flex-col gap-2 border-2 rounded-lg p-4 my-5 border-cyan-200">
          <input type="text" className="text-lg font-medium outline-none pb-2" value={state.title} onChange={(e) => {setState({...state, title: e.target.value,}) }} ref={titleRef}/>
          {state.formFields.map((field) => (
            <LabelledInput key={field.id} id={field.id} label={field.label} value={field.value} type={field.type} removeFieldCB={removeField} updateInputValueCB={updateInputValue} />
          ))}
        </div>
          <AddField addFieldCB={addField} setNewFieldCB={setNewField} setNewFieldTypeCB={setNewFieldType}/> 
          <div className="flex gap-2">
            <input type="submit" value="Save" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300" onClick={(_) => saveFormData(state)} />            
            <Link href="/" className='p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 mr-4'>Home</Link>
          </div>
    </div>
  );
}

export default Form;
