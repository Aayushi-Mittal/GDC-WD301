function Form() {
  return (
    <>
      <form className="my-4">
        <label className="mt-4">First Name:</label>
        <input className="p-2 my-2 bg-gray-100 rounded-lg outline-blue-500 w-full" type="text" />
        <br />
        <label className="mt-4">Last Name:</label>
        <input className="p-2 my-2 bg-gray-100 rounded-lg outline-blue-500 w-full" type="text" />
        <br />
        <label className="mt-4">Email:</label>
        <input className="p-2 my-2 bg-gray-100 rounded-lg outline-blue-500 w-full" type="email" />
        <br />
        <label className="mt-4">Date of Birth:</label>
        <input className="p-2 my-2 bg-gray-100 rounded-lg outline-blue-500 w-full" type="date" />
        <input className="p-2 my-4 w-full bg-blue-500 hover:bg-blue-400 text-gray-100 rounded-lg" type="submit"/>
      </form>
    </>
  );
}

export default Form;
