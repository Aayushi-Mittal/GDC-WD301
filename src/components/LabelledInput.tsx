const LabelledInput = (props: { id: number, label: string, value: string, type: string, removeFieldCB: (id: number) => void, updateInputValueCB: (id: number, value: string) => void }) => {

    return (
        <div key={props.id} className="py-2">
            <div className="flex justify-between">
                <label className="font-semibold">{props.label}</label>
                <button className="text-cyan-500" onClick={(_) => { props.removeFieldCB(props.id) }}>Remove Field</button>
            </div>
            <input
                type={props.type} 
                value={props.value}
                className="p-2 bg-gray-100 rounded-lg outline-cyan-500 w-full"
                onChange={(e) => { props.updateInputValueCB(props.id, e.target.value) }}
                placeholder={props.label}
            />
        </div>
    )
}

export default LabelledInput;