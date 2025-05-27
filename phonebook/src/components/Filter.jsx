const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input 
        value={value} 
        onChange={onChange} 
        placeholder="Search contacts..."
      />
    </div>
  )
}

export default Filter