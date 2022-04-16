import LabelledInput from "./LabelledInput";
import { useState } from 'react'

const formFields = [
  { id: 1, label: "First Name", type: "text", value:"" },
  { id: 2, label: "Last Name", type: "text", value:"" },
  { id: 3, label: "Email", type: "email", value:"" },
  { id: 4, label: "Date of Birth", type: "date", value:"" },
  { id: 5, label: "Phone Number", type: "tel", value:"" },
];

function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");
  // const [value, setValue] = useState(""); 
  const [newFieldType, setNewFieldType] = useState("");

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
        <input type="submit" value="Submit" className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-1/3" />
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
          <input type="text"
            className="p-2 mt-2 bg-gray-100 rounded-lg outline-cyan-500 w-2/5"
            placeholder="Enter Field Type"
            onChange={(e) => {
              e.preventDefault();
              setNewFieldType(e.target.value);
            }} />
          <button className="p-2 mt-2 bg-cyan-200 rounded-lg hover:bg-cyan-300" onClick={addField}>Add</button>
        </div>
      </div> 
    </div>
  );
}

export default Form;
