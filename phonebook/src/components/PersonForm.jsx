const PersonForm = ({ 
  newName, 
  newNumber, 
  handleNameChange, 
  handleNumberChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name: 
          <input 
            value={newName} 
            onChange={handleNameChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Number: 
          <input 
            value={newNumber} 
            onChange={handleNumberChange}
            required
          />
        </label>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm
