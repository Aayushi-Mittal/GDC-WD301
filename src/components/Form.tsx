import LabelledInput from "./LabelledInput";
import React, { useState, useEffect, useRef } from "react";

interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

export interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [];

const getLocalForms: () => formData[] = () => {
    const savedFormsJSON = localStorage.getItem("savedForms")
    return savedFormsJSON ? JSON.parse(savedFormsJSON) : []
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

function Form(props: { closeFormCB: () => void }) {
  // const [selectedformState, setselectedformState] = useState(0);
  const [state, setState] = useState({
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields
  })
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  // const [formList, setFormList] = useState(getLocalForms());
  const titleRef = useRef<HTMLInputElement>(null);

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
  
  const resetForm = () => {
    setState({
        ...state,
        formFields: state.formFields.map((field) => {
            return ({ ...field, value: "" })
        })
    })
  }

  return (
    <div className="mt-6">
      {/* <form> */}
      {state.formFields.map((field) => (
        <LabelledInput key={field.id} id={field.id} label={field.label} value={field.value} type={field.type} removeFieldCB={removeField} updateInputValueCB={updateInputValue} />
      ))}
      <div className="flex justify-between gap-2">
        <input type="submit" value="Submit" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" onClick={(_) => saveFormData(state)} />
        <button className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" onClick={resetForm}>Reset</button>
        <button className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" onClick={props.closeFormCB}>Close Form</button>
      </div>
      {/* </form> */}
      <div className="border-2 rounded-lg p-4 mt-5 border-cyan-200">
        <label className="font-semibold">Add Field</label>
        <div className="flex justify-between gap-2">
          <input type="text"
            className="p-2 mt-2 bg-gray-100 rounded-lg outline-cyan-500 w-3/5"
            placeholder="Add New Field"
            onChange={(e) => {
              e.preventDefault();
              setNewField(e.target.value);
            }} />
          <select
            className="p-2 mt-2 bg-gray-100 rounded-lg outline-cyan-500 w-2/5"
            placeholder="Enter Field Type"
            onChange={(e) => {
              e.preventDefault();
              setNewFieldType(e.target.value);
            }}>
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="email">email</option>
              <option value="url">url</option>
              <option value="date">date</option>
              <option value="month">month</option>
              <option value="week">week</option>
              <option value="time">time</option>
              <option value="tel">tel</option>
              <option value="color">color</option>
              <option value="file">file</option>
              <option value="checkbox">checkbox</option>
            </select>
          <button className="p-2 mt-2 bg-cyan-200 rounded-lg hover:bg-cyan-300" onClick={addField}>Add</button>
        </div>
      </div> 
    </div>
  );
}

export default Form;
