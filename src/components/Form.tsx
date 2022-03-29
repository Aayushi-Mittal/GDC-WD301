function Form(props:{closeFormCB:()=>void; formFields: any[]}) {
  return (
    <>
      <form>
      {props.formFields.map((field) => (
          <div key={field.id} className="py-2">
            <label className="font-semibold">{field.label}</label>
            <input
              type={field.type}
              className="p-2 bg-gray-100 rounded-lg outline-cyan-500 w-full"
            />
          </div>
        ))}
        <input type="submit" className="p-2 mt-6 bg-cyan-200 rounded-lg w-full hover:bg-cyan-300" />
        <button className="mt-4 p-2 bg-gray-100 border-2 border-cyan-200 rounded-lg hover:bg-cyan-200 w-full" onClick={props.closeFormCB}>Close Form</button>
      </form>
    </>
  );
}

export default Form;
