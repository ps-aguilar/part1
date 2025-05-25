const Persons = ({ persons }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {persons.map(person => (
        <li key={person.id} style={{ margin: '5px 0' }}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  )
}

export default Persons