import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const Filter = ({ filter }) => {
    return (
      <div>{filter}</div>
    )
  }

  const Language = ({ language }) => {
    return (
      <li>{language}</li>
    )
  }

  const [keyWord, setKeyWord] = useState('')
  const [countries, setCountry] = useState([])
  var countryid = 0
  var flagurl = "s"
  var languagelist = []

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  const countrylist = []

  const countrieslength = countries.length

  for (let i = 0; i < countrieslength; i++) {
    countrylist.push(countries[i].name.common)
  }

  const lista = []
  for (let i = 0; i < countrieslength; i++) {
    if (countrylist[i].toLowerCase().includes(keyWord.toLowerCase())) {
      lista.push(countrylist[i])
    }
  }
  

  const handleKeyWord = (event) => {
    console.log(event.target.value)
    setKeyWord(event.target.value)
  }


  if (lista.length == 1) {
    const countryName = lista[0]
    for (let i = 0; i < countrieslength; i++) {
      if (countries[i].name.common == countryName)
        countryid = i
        flagurl = countries[countryid].flags.png
    }
  } 

  for (const i in countries[countryid]) {
    if (i == 'languages')
      for (const k in countries[countryid].languages) {
        languagelist.push(k)
      }
  }

  

  if (lista.length <= 10 && lista.length >= 2) {
    return (
      <div>
        <div>
            find countries <input
            value = {keyWord}
            onChange = {handleKeyWord}
            />
        </div>
        <div>
          {lista.map(filter =>
            <Filter filter={filter} />
          )}
        </div>
      </div>
    )
  } else if (lista.length == 250 || lista.length == 0) {
    return (
      <div>
        <div>
            find countries <input
            value = {keyWord}
            onChange = {handleKeyWord}
            />
        </div>
      </div>
    )
  } else if (lista.length > 10) {
    return (
      <div>
        <div>
            find countries <input
            value = {keyWord}
            onChange = {handleKeyWord}
            />
        </div>
        <div>
          Too many matches, specify another filter
        </div>
      </div>
    )
  } else if (lista.length == 1) {
    return (
      <div>
        <div>
            find countries <input
            value = {keyWord}
            onChange = {handleKeyWord}
            />
        </div>
        <div>
          <h2>{countries[countryid].name.common}</h2>
          capital {countries[countryid].capital[0]}
            <div>   
              area {countries[countryid].area}
            </div>
            <h3>Languages</h3>
            <div>
              {languagelist.map(language =>
                <Language language={language} />
              )}
            </div>
            <div>
              <img src={flagurl}/>
            </div>
        </div>
      </div>
    )
  }
}

export default App;
