import './App.css'
import React, {useState, useEffect} from "react";
import LoadingMask from './components/LoadingMask'
import Laptop from './components/Laptop';

const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [laptops, setLaptops] = useState([])
  const [descending, setDescending] = useState(true)


  const getData = async () => {
    const response = await fetch("/api/laptop")
    const laptops = await response.json()
    setLaptops(laptops)
    setData(laptops)
    setIsLoading(false)
  }

  useEffect(() => { 
    getData()
  }, [])

  const handleChange = (e) => {
    const search = e.target.value
    setData(laptops.filter(laptop => laptop.name.toLowerCase().includes(search.toLowerCase())))
  }

  const handleClick = () => {
    const sorted = data.sort((a, b) => descending ? a.weigth < b.weigth : a.weigth > b.weigth)
    setData([...sorted])
    setDescending(!descending)
  }

  return (
    <div className="App">
      <header>
        <h1>Laptops</h1>
        <button onClick={handleClick} >Sort</button><br />
        <input type="text"  onChange={handleChange} placeholder="Search..." />
      </header>
      <div className="card-container">
        {data.map(laptop => <Laptop key={laptop.name} laptop={laptop} />)}
      </div>
      {isLoading && <LoadingMask />}
    </div>
  )
}

export default App
