import React, {useState} from "react";

const Laptop = ({laptop}) => {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div className="card">
      <h2>{laptop.name}</h2>
      <button onClick={() => setShowDetail(!showDetail)}>{showDetail ? "Show less" : "Show more"}</button>
      {showDetail && <p>Brand: {laptop.brand}<br/>Weigth: {laptop.weigth}</p>}
    </div>
  )
}

export default Laptop
