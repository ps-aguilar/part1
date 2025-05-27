const Persons = ({ persons, onDelete }) => (
  <>
    {persons.map(person => (
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => onDelete(person.id)}>Eliminar</button>
      </div>
    ))}
  </>
)