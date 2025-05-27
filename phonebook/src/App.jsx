import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`¿Eliminar a ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(`Se eliminó a ${person.name}`)
          setTimeout(() => setSuccessMessage(null), 5000)
        })
        .catch(error => {
          setErrorMessage(`No se pudo eliminar a ${person.name}. Ya fue borrado.`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p =>
      p.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} ya está en la agenda. ¿Deseas reemplazar el número?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Se actualizó el número de ${returnedPerson.name}`)
            setTimeout(() => setSuccessMessage(null), 5000)
          })
          .catch(error => {
            setErrorMessage(`La persona '${existingPerson.name}' ya no existe en el servidor.`)
            setTimeout(() => setErrorMessage(null), 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })

        return
      } else {
        return
      }
    }

    const newPerson = { name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Se agregó a ${returnedPerson.name}`)
        setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch(error => {
        setErrorMessage('No se pudo agregar el contacto.')
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Agenda Telefónica</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />

      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Agregar una nueva persona</h3>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Números</h3>

      {
        filteredPersons.length > 0 ? (
          <Persons persons={filteredPersons} onDelete={handleDelete} />
        ) : (
          <p>No hay contactos para mostrar.</p>
        )
      }
    </div>
  )
}

export default App
