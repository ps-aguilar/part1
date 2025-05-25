const PersonForm = ({ 
  newName, 
  newNumber, 
  onNameChange, 
  onNumberChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name: 
          <input 
            value={newName} 
            onChange={onNameChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Number: 
          <input 
            value={newNumber} 
            onChange={onNumberChange}
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