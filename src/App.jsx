import { useState, useEffect, useCallback } from 'react'


function App() {

  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const [query, setQuery] = useState('')
  const [product, SetPorduct] = useState([])

  const fetchProduct = useCallback(debounce((query) => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then((response) => response.json())
      .then((obj) => SetPorduct(obj))
  }, 500), [])

  useEffect(() => {
    fetchProduct(query)
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
