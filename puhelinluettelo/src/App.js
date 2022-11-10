import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const Person = ({ person }) => {
    return (
      <div>{person.name} {person.number}</div>
    )
  }
  
  const Filter = ({ filter }) => {
    return (
      <div>{filter}</div>
    )
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length,
    }

    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    
    const apuArray = []

    for (let i = 0; i < persons.length; i++) {
      apuArray.push(persons[i].name)
    }

    if (apuArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }


  const lista = []
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].name.toLowerCase().includes(newFilter.toLowerCase())) {
      lista.push(`${persons[i].name} ${persons[i].number}`)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input 
          value={newFilter}
          onChange={handleFilter}
          />
        </div>
        <h2>add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameAdd}
          />
        </div>
        <div>
        number: <input 
          value={newNumber}
          onChange={handleNumberAdd}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {lista.map(filter =>
          <Filter filter={filter} />
        )}
      </div>
    </div>
  )
  
}

export default App
