import LabelledInput from "./LabelledInput";
import {useState} from 'react'

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "tel" },
];

function Form(props:{closeFormCB:()=>void}) {
  const [state, setState] = useState(formFields);

  const addField = () => {
    setState([
      ...state,
      {
        id: state.length+2,
        label: "New Field",
        type: "text"
      }
    ])
  }

  const removeField = (id:number) => {
    setState(state.filter((field) => field.id !== id))
  }

  return (
    <>
      <form className="mt-6 mb-4">
        {state.map((field) => (
          <LabelledInput key={field.id} id={field.id} label={field.label} type={field.type} removeFieldCB={removeField}/>
        ))}
        <input type="submit" className="p-2 mt-6 bg-cyan-200 rounded-lg w-full hover:bg-cyan-300" />
        <button className="mt-4 p-2 bg-gray-100 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 w-1/2" onClick={props.closeFormCB}>Close Form</button>
        <button className="mt-4 p-2 bg-gray-100 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 w-1/2" onClick={addField}>Add Field</button>
      </form>
    </>
  );
}

export default Form;
