const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "tel" },
];

function Form() {
  return (
    <>
      <form>
      {formFields.map((field) => (
          <div key={field.id} className="py-2">
            <label className="font-semibold">{field.label}</label>
            <input
              type={field.type}
              className="p-2 bg-gray-100 rounded-lg outline-cyan-500 w-full"
            />
          </div>
        ))}
        <input type="submit" className="p-2 mt-6 bg-cyan-200 rounded-lg w-full hover:bg-cyan-300" />
      </form>
    </>
  );
}

export default Form;
