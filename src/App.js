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

  const getData2 = () => {
    const laptops = [
      { brand: "Apple", name: "MacBook Air", weigth: 0.5 },
      { brand: "Asus", name: "P30", weigth: 1.7 },
      { brand: "Lenovo", name: "A50", weigth: 1.5 },
    ]
    setLaptops(laptops)
    setData(laptops)
    setIsLoading(false)
  }

  useEffect(() => { 
    getData2()
  }, [])

  const handleChange = (e) => {
    const search = e.target.value
    setData(laptops.filter(laptop => laptop.name.toLowerCase().includes(search.toLowerCase())))
  }

  const handleClick = () => {
    data.sort((a, b) => descending ? a.weigth - b.weigth : b.weigth - a.weigth)
    console.log(data);
    setData([...data])
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
