const sideBarBtn = document.getElementById('aside-toggle'),
  sideBar = document.getElementById('side-bar'),
  sideLinks = document.getElementsByClassName('side-link'),
  productContainer = document.getElementById('product-container'),
  productContainerInner = document.getElementById('product-container-inner')

sideBarBtn.addEventListener('click', (e) => {
  sideBarBtn.classList.toggle('hidden')
  sideBar.classList.toggle('hidden')
  productContainer.classList.toggle('hidden')
})

sideBar.addEventListener('click', (e) => {
  let targetNode = ''
  if (e.target.classList.contains('side-link')) {
    targetNode = e.target
  } else if (e.target.parentElement.classList.contains('side-link')) {
    targetNode = e.target.parentElement
  }

  if (targetNode !== '') {
    classRemover(sideLinks, 'active')
    targetNode.classList.add('active')
    if (targetNode.innerText === 'Dashboard') {
    } else if (targetNode.innerText === 'All Product') {
      fetchAllProduct()
    } else if (targetNode.innerText === 'Add Product') {
      addProduct()
    } else if (targetNode.innerText === 'Logout') {
    }
  }
})

function addProduct() {
  let output = `<h2>Add Product</h2>
        <form action="product.php" method="post">
          <div class="add-product-option" id="add-product-option">
            <button id="new-product" class='active'>New Product</button>
            <button id="existing-product">Existing Product</button>
          </div>
          <div class="disabled-input">
            <label for="id">Product Id</label>
            <input type="number" name="id" id="disabled-input-inner" value="10" disabled />
          </div>
          <div id="name-input">
            <label for="name">Product Name</label>
            <input type="text" name="name" placeholder="Enter name" />
          </div>
          <label for="amount">Amount</label>
          <input type="number" name="amount" />
          <label for="price">Buying Price</label>
          <input type="number" name="buying-price" />
          <label for="selling-price">Selling Price</label>
          <input type="number" name="selling-price" />
          <input type="submit" value="Add Product" id="add-product-btn" name="submit" />
        </form>`
  productContainer.classList.add('add-product-container')
  productContainerInner.classList.add('add-product-container-inner')
  productContainerInner.innerHTML = output

  const productOption = document.getElementById('add-product-option')
  const newProduct = document.getElementById('new-product')
  const existingProduct = document.getElementById('existing-product')
  productOption.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.id === 'new-product') {
      e.target.classList.add('active')
      existingProduct.classList.remove('active')
      document
        .getElementById('disabled-input-inner')
        .setAttribute('disabled', '')
      document.getElementById('name-input').style.display = ''
      document.getElementById('add-product-btn').value = 'Add Product'
    } else if (e.target.id === 'existing-product') {
      e.target.classList.add('active')
      newProduct.classList.remove('active')
      document
        .getElementById('disabled-input-inner')
        .removeAttribute('disabled')
      document.getElementById('name-input').style.display = 'none'
      document.getElementById('add-product-btn').value = 'Update Product'
    }
  })

  document.getElementById('add-product-btn').addEventListener('click', (e) => {
    e.preventDefault()
    if (newProduct.classList.contains('active')) {
    }
  })
}

function fetchAllProduct() {
  fetch('models/fetchAllProcuts.php')
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data)
    })
}

function renderProducts(products) {
  let output = `<h2>All Product</h2>
        
        <div class="product-header-1">
          <div class="product-header-item">
            <form id="search-form">
              <label for="search-product">Search by </label>
              <input
                type="text"
                name="search-product"
                id="search-product"
                placeholder="Type here"
              />
              <select name="search-select" id="search-select">
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </form>
          </div>
          <div class="product-header-item">
            <form>
              <label for="sort-product">Sort by </label>
              <input
                type="text"
                name="sort-product"
                id="sort-product"
                placeholder="Type here"
              />
              <select name="sort-select" id="sort-select">
                <option value="id">Id</option>
                <option value="Name">Name</option>
                <option value="Price">Price</option>
                <option value="availability">Availability</option>
              </select>
            </form>
          </div>
        </div>
        <div class="product-header-2">
          <div class="product-header-item">
            <button id="selected-btn">
              Selected <span id="selected-count">50</span>
            </button>
          </div>
        </div>

        <div class="product-list">
          <table id="product-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Available Amount</th>
                <th>Selected Amount</th>
                <th>Selected</th>
              </tr>
            </thead>
            <tbody>`

  products.forEach((product) => {
    output += `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.selling_price}৳</td>
                <td>${product.available_amount}</td>
                <td><input type="number" data-product-id='${product.id}' /></td>
                <td><input type="checkbox" data-product-id='${product.id}' /></td>
              </tr>`
  })

  output += `</tbody>
          </table>
        </div>`

  productContainer.className = 'product-container'
  productContainerInner.className = 'product-container-inner'
  productContainerInner.innerHTML = output
}

function classRemover(nodeLists, className) {
  ;[...nodeLists].forEach((node) => {
    node.classList.remove(className)
  })
}
