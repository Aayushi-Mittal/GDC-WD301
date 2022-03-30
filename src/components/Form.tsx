import LabelledInput from "./LabelledInput";
import { useState } from 'react'

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "tel" },
];

function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");
  const [newFieldType, setNewFieldType] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: newFieldType
      }
    ])
    setNewFieldType("text");
  }

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id))
  }

  return (
    <div className="mt-6">
      {state.map((field) => (
        <LabelledInput key={field.id} id={field.id} label={field.label} type={field.type} removeFieldCB={removeField} />
      ))}
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
      <input type="submit" className="p-2 mt-6 bg-cyan-200 rounded-lg w-full hover:bg-cyan-300" />
      <button className="p-2 mt-6 bg-cyan-200 rounded-lg hover:bg-cyan-300 w-full" onClick={props.closeFormCB}>Close Form</button>
    </div>
  );
}

export default Form;
