import { useState, useEffect } from 'react'


function App() {

  const [query, setQuery] = useState('')
  const [product, SetPorduct] = useState([])

  const fetchProduct = () => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then((response) => response.json())
      .then((obj) => SetPorduct(obj))
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  console.log(product)

  return (
    <div className="container">
      <h1>Shop</h1>
      <div className="row">
        <div className="col-12 p-3">
          <input
            type="text"
            value={query}
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-12">
          {query ? product.map((p => {
            return <div key={p.id} className='prod-element'>
              <p>{p.name}</p>
            </div>
          })) :
            ''}
        </div>
      </div>
    </div>
  )
}

export default App
