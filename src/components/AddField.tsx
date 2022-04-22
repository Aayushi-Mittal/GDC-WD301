import React from 'react'

const AddField = (props: { addFieldCB: () => void, setNewFieldCB: (field: string) => void, setNewFieldTypeCB: (fieldType: string) => void }) => {
  return (
    <div className="mt-2">
        <label className="font-semibold">Add Field</label>
        <div className="flex justify-between gap-2">
          <input type="text"
            className="p-2 mt-2 bg-gray-100 rounded-lg outline-cyan-500 w-3/5"
            placeholder="Add New Field"
            onChange={(e) => {
              e.preventDefault();
              props.setNewFieldCB(e.target.value);
            }} />
          <select
            className="p-2 mt-2 bg-gray-100 rounded-lg outline-cyan-500 w-2/5"
            placeholder="Enter Field Type"
            onChange={(e) => {
              e.preventDefault();
              props.setNewFieldTypeCB(e.target.value);
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
          <button className="p-2 mt-2 bg-cyan-200 rounded-lg hover:bg-cyan-300" onClick={props.addFieldCB}>Add</button>
        </div>
      </div>
  )
}

export default AddField