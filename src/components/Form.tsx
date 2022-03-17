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
      <form className="my-4">
      {formFields.map((field) => (
          <div key={field.id} className="py-2">
            <label className="font-semibold">{field.label}</label>
            <input
              type={field.type}
              className="p-2 bg-gray-100 rounded-lg outline-blue-500 w-full"
            />
          </div>
        ))}
      </form>
    </>
  );
}

export default Form;
