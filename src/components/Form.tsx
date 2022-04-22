import LabelledInput from "./LabelledInput";
import AddField from "./AddField";
import FormList from "./FormList";
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
  const [selectedformState, setselectedformState] = useState(0);
  const [state, setState] = useState({
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields
  })
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  const [formList, setFormList] = useState(getLocalForms());
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

  const getInitialState = (id: number) => {
      const localForms = getLocalForms();
      setState(id === 0 ? {
          id: Number(new Date()),
          title: "Untitled Form",
          formFields: initialFormFields
      } : localForms.filter((form) => form.id === id)[0])
  }

  const openSelectedForm = (id: number) => {
      setselectedformState(id)
      getInitialState(id)
  }

  const deleteSelectedForm = (id: number) => {
      const localForms = getLocalForms();
      const updatedFormList = localForms.filter((form) => form.id !== id)
      setFormList(updatedFormList)
      saveLocalForms(updatedFormList)

  }

  const createNewForm = () => {
      const localForms = getLocalForms();
      const newForm = {
          id: Number(new Date()),
          title: "Untitled Form",
          formFields: initialFormFields
      };
      saveLocalForms([...localForms, newForm])
      setselectedformState(newForm.id)
      getInitialState(newForm.id)

  }

  return (
    <div className="mt-6">
      {selectedformState === 0 ? (
          <FormList openSelectedFormCB={openSelectedForm} deleteSelectedFormCB={deleteSelectedForm} createNewFormCB={createNewForm} formList={formList}/>
      ):(
        <div className="flex flex-col gap-2 border-2 rounded-lg p-4 mt-5 border-cyan-200">
          <input type="text" className="text-lg font-medium outline-none pb-2" value={state.title} onChange={(e) => {setState({...state, title: e.target.value,}) }} ref={titleRef}/>
          {state.formFields.map((field) => (
            <LabelledInput key={field.id} id={field.id} label={field.label} value={field.value} type={field.type} removeFieldCB={removeField} updateInputValueCB={updateInputValue} />
          ))}
          <AddField addFieldCB={addField} setNewFieldCB={setNewField} setNewFieldTypeCB={setNewFieldType}/> 
          <div className="flex justify-between gap-2">
            <input type="submit" value="Save" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" onClick={(_) => saveFormData(state)} />
            <button className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" onClick={resetForm}>Reset</button>
            <button className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" onClick={props.closeFormCB}>Close Form</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
