import LabelledInput from "./LabelledInput";
import React, { useState, useEffect } from "react";

export interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

const initialFormFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value:"" },
  { id: 2, label: "Last Name", type: "text", value:"" },
  { id: 3, label: "Email", type: "email", value:"" },
  { id: 4, label: "Date of Birth", type: "date", value:"" },
  { id: 5, label: "Phone Number", type: "tel", value:"" },
];

const initialState: () => formField[] = () => {
  const formFieldsJSON = localStorage.getItem("formFields");
  const persistantFormFields = formFieldsJSON ? JSON.parse(formFieldsJSON) : initialFormFields;
  return persistantFormFields;
}
const saveFormData = (currentState: formField[]) => {
  localStorage.setItem("formFields", JSON.stringify(currentState));
}

function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(initialState());
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("");

  useEffect(() => {
      console.log("Component mounted");
      document.title = "Form Editor";
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
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: newFieldType,
        value: "",
      }
    ])
    setNewField("");
    setNewFieldType("text");
  }

  const updateInputValue = (id: number, value: string) => {
    const newState = [...state];
    const stateObjectIndex = state.findIndex((field) => field.id === id);
    newState[stateObjectIndex] = { ...newState[stateObjectIndex], value };
    setState(newState);
  }

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  }
  
  const resetForm = () => {
    setState(state.map((field) => ({ ...field, value: "" })));
    console.log(state);
  };

  return (
    <div className="mt-6">
      {/* <form> */}
      {state.map((field) => (
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
