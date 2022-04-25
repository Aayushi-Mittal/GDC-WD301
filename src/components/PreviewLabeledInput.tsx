import React from 'react';

export default function PreviewLabeledInput(props: { id: number, label: string, type: string, updateFieldCB: (value: string, id: number) => void, value: string }) {
    return (
        <div className="flex gap-2 flex-col">
            <label className="text-xl pt-2">{props.label}</label>
            <input className='p-2 bg-gray-100 rounded-lg outline-cyan-500 w-full' placeholder={props.label} type={props.type} value={props.value} onChange={(e) => {
                props.updateFieldCB(e.target.value, props.id)
            }} />
        </div>
    )
}