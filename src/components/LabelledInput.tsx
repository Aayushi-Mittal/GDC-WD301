import React from 'react'

const LabelledInput = (props:{id:number, label:string, type:string, removeFieldCB: (id:number)=>void}) => {
  return (
    <div key={props.id} className="py-2">
        <div className="flex justify-between">
            <label className="font-semibold">{props.label}</label>
            <button className="text-cyan-500" onClick={(_)=>props.removeFieldCB(props.id)}>Remove Field</button>
        </div>
        <input
          type={props.type}
          className="p-2 bg-gray-100 rounded-lg outline-cyan-500 w-full"
        />
    </div>
  )
}

export default LabelledInput;