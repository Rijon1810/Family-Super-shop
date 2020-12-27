const sideBarBtn = document.getElementById('aside-toggle'),
  sideBar = document.getElementById('side-bar'),
  sideLinks = document.getElementsByClassName('side-link'),
  productContainer = document.getElementById('product-container'),
  productContainerInner = document.getElementById('product-container-inner')

let productList = []
let loggedUsername = ''

sideBarBtn.addEventListener('click', (e) => {
  sideBarBtn.classList.toggle('hidden')
  sideBar.classList.toggle('hidden')
  productContainer.classList.toggle('hidden')
})
initDashboard()
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
      initDashboard()
    } else if (targetNode.innerText === 'Select Product') {
      initAllProduct()
      fetchAllProduct()
    } else if (targetNode.innerText === 'Update Product') {
      addProduct()
    } else if (targetNode.innerText === 'Sold Product') {
      fetchSoldProduct()
    } else if (targetNode.innerText === 'Logout') {
      logOut()
    }
  }
})
function initDashboard() {
  let output = `
  <h2>Dashboard</h2>
  <nav><ul>
    <li class="nav-item active">Daily Income</li>
    <li class="nav-item">Most Sold Products</li>
    <li class="nav-item">Most New Products</li>
    <li class="nav-item">Most Available Products</li>
  </ul></nav>
  <div id="dashboard-container"></div>
  `

  productContainer.classList.remove('add-product-container')
  productContainerInner.classList.remove('add-product-container-inner')
  productContainerInner.innerHTML = output
  document.querySelectorAll('.nav-item').forEach((navItem) => {
    navItem.addEventListener('click', handleDashboardNav)
  })
  fetchDailyIncome()
}
function initAllProduct() {
  let output = `<h2>Select Product</h2>
          <div class="product-header">
          <div class="product-header-1">
            <div class="product-header-item">
              <form id="search-form">
                <label for="search-product">Search by </label>
                <input
                  type="number"
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
                <label for="sort-select">Sort by </label>
                <select name="sort-select" id="sort-select">
                  <option value="id">Id</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="availability">Availability</option>
                </select>
                <select name="sort-select-order" id="sort-select-order">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </form>
            </div>
          </div>
          <div class="product-header-2">
            <div class="product-header-item">
              <button id="selected-btn">
                Selected <span id="selected-count" class="">0</span>
              </button>
            </div>
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
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="table-body">
              </tbody>
            </table>
          </div>
          <p style="text-align: center;" id="not-found"></p>`
  productContainer.className = 'product-container'
  productContainerInner.className = 'product-container-inner'
  productContainerInner.innerHTML = output
}

function addProduct() {
  let output = `<h2>Add Product</h2>
  <form action="product.php" method="post">
    <div class="add-product-option" id="add-product-option">
      <button id="new-product" class='active'>New Product</button>
      <button id="existing-product">Existing Product</button>
    </div>
    <div class="disabled-input">
      <label for="id">Product Id</label>
      <input type="number" name="id" id="disabled-input-inner" value="" disabled />
    </div>
    <div id="name-input">
      <label for="name">Product Name</label>
      <input type="text" name="name" id="product-name-input" placeholder="Enter name" />
    </div>
    <label for="amount">Amount</label>
    <input type="number" id="amount-input" name="amount" />
    <label for="price">Buying Price</label>
    <input type="number" name="buying-price" id="buying-price-input" />
    <label for="selling-price">Selling Price</label>
    <input type="number" name="selling-price" id="celling-price-input" />
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

      fetch('models/fetchNewProductId.php')
        .then((res) => res.json())
        .then((data) => {
          document.getElementById('disabled-input-inner').value =
            parseInt(data) + 1
        })
    } else if (e.target.id === 'existing-product') {
      e.target.classList.add('active')
      newProduct.classList.remove('active')
      document
        .getElementById('disabled-input-inner')
        .removeAttribute('disabled')
      document.getElementById('name-input').style.display = 'none'
      document.getElementById('add-product-btn').value = 'Update Product'
      document.getElementById('disabled-input-inner').value = ''
    }
  })

  document.getElementById('add-product-btn').addEventListener('click', (e) => {
    e.preventDefault()
    if (newProduct.classList.contains('active')) {
      addNewProduct()
    } else if (existingProduct.classList.contains('active')) {
      updateProduct()
    }
  })

  fetch('models/fetchNewProductId.php')
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('disabled-input-inner').value = parseInt(data) + 1
    })
}

function fetchAllProduct() {
  fetch('models/fetchAllProducts.php')
    .then((res) => res.json())
    .then((data) => {
      const notFound = document.getElementById('not-found')
      addListeners()
      if (data.lenth == 0) {
        notFound.innerHTML = 'No data have matched or found!'
      } else renderProducts(data)
    })
}

function addListeners() {
  document
    .getElementById('search-product')
    .addEventListener('input', getProductSearch)
  document
    .getElementById('search-select')
    .addEventListener('click', getProductSearch)
  document
    .getElementById('sort-select')
    .addEventListener('click', getProductSearch)
  document
    .getElementById('sort-select-order')
    .addEventListener('click', getProductSearch)
  document.getElementById('selected-btn').addEventListener('click', () => {
    if (productList.length > 0) renderSelectedProducts()
  })
}

function renderSelectedProducts() {
  selectedTableBody = document.getElementById('selected-table-body')
  let output = ''
  productList.forEach((product) => {
    output += `<tr>
        <td>${product.id}</td>
        <td id='selected-product-name-${product.id}'>${product.name}</td>
        <td><input type="number" data-product-id='${product.id}' id='selected-product-amount-${product.id}' min="1" max="${product.available_amount}" value='${product.amount}' /></td>
        <td id='selected-product-total-price-${product.id}'>${product.total_price}৳</td>
        <td><input type="button" data-product-id='${product.id}' id='selected-product-${product.id}' value="Remove" class="" /></td>
      </tr>`
  })
  output += `<tr>
        <td></td>
        <td></td>
        <td><h3>Total</h3></td>
        <td><h3 id="total-price">${calculateTotalPrice()}৳</h3></td>
        <td><input type="button" id='remove-all' value="Remove All" class="" /></td>
      </tr>`
  selectedTableBody.innerHTML = output
  document
    .getElementById('selected-product-container')
    .classList.remove('hidden')
  document.getElementById('cross-btn').addEventListener('click', () => {
    document
      .getElementById('selected-product-container')
      .classList.add('hidden')
    fetchAllProduct()
  })
  selectedTableBody
    .querySelectorAll('input[type="number"')
    .forEach((tableInput) =>
      tableInput.addEventListener('input', (e) => {
        updateSelectedProductPrice(e.target)
        document.getElementById('total-price').innerText =
          calculateTotalPrice() + '৳'
      })
    )
  selectedTableBody
    .querySelectorAll('input[type="button"')
    .forEach((tableInput) =>
      tableInput.addEventListener('click', (e) => {
        updateSelectedProductList(e.target)
      })
    )
  document.getElementById('remove-all').addEventListener('click', (e) => {
    productList = []
    document
      .getElementById('selected-product-container')
      .classList.add('hidden')
    initAllProduct()
    fetchAllProduct()
  })
}

function updateSelectedProductPrice(targetElement) {
  let productId = targetElement.getAttribute('data-product-id')
  let productAmount = targetElement.value
  let demoPrice = 0
  productList = productList.map((product) => {
    if (product.id == productId) {
      product = {
        ...product,
        amount: productAmount,
        total_price: product.price * productAmount,
      }
      demoPrice = product.total_price
    }
    document.getElementById(
      'selected-product-total-price-' + productId
    ).innerText = demoPrice + '৳'
    return product
  })
}
function updateSelectedProductList(targetElement) {
  let productId = targetElement.getAttribute('data-product-id')
  productList = productList.filter((product) => {
    if (product.id != productId) return product
  })
  renderSelectedProducts()
}

function renderProducts(products) {
  products = sortProducts(products) || products
  const tableBody = document.getElementById('table-body')
  let output = ''
  products.forEach((product) => {
    let matchedProduct =
      productList.find((productIn) => {
        if (product.id == productIn.id) return productIn
      }) || {}
    if (matchedProduct.id) {
      output += `<tr>
        <td>${product.id}</td>
        <td id='product-name-${product.id}'>${product.name}</td>
        <td id='selling-price-${product.id}' data-product-price='${product.selling_price}' data-product-buying-price=''>${product.buying_price}৳</td>
        <td id='product-available-amount-${product.id}'>${product.available_amount}</td>
        <td><input type="number" data-product-id='${product.id}' id='product-amount-${product.id}' min="1" max="${product.available_amount}" value='${matchedProduct.amount}' /></td>
        <td><input type="button" data-product-id='${product.id}' id='product-${product.id}' value="Selected" class="" disabled /></td>
      </tr>`
    } else {
      output += `<tr>
        <td>${product.id}</td>
        <td id='product-name-${product.id}'>${product.name}</td>
        <td id='selling-price-${product.id}' data-product-price='${product.selling_price}' data-product-buying-price='${product.buying_price}'>${product.selling_price}৳</td>
        <td id='product-available-amount-${product.id}'>${product.available_amount}</td>
        <td><input type="number" data-product-id='${product.id}' id='product-amount-${product.id}' min="1" max="${product.available_amount}" /></td>
        <td><input type="button" data-product-id='${product.id}' id='product-${product.id}' value="Select" class="" /></td>
      </tr>`
    }
  })

  tableBody.innerHTML = output
  tableBody
    .querySelectorAll('input[type="number"')
    .forEach((tableInput) =>
      tableInput.addEventListener('input', toggleCheckbox)
    )
  tableBody.querySelectorAll('input[type="button"').forEach((tableInput) =>
    tableInput.addEventListener('click', (e) => {
      calculateProducts(e.target, 'button')
    })
  )
}

function calculateTotalPrice() {
  let totalPrice = 0
  productList.forEach((product) => {
    totalPrice += product.total_price
  })
  return totalPrice
}

function calculateProducts(targetElement, clicked) {
  const productId = targetElement.getAttribute('data-product-id'),
    productAmount = document.getElementById('product-amount-' + productId)
      .value,
    sellingPrice = document
      .getElementById('selling-price-' + productId)
      .getAttribute('data-product-price'),
    buyingPrice = document
      .getElementById('selling-price-' + productId)
      .getAttribute('data-product-buying-price'),
    productName = document.getElementById('product-name-' + productId)
      .innerText,
    productAvailableAmount = document.getElementById(
      'product-available-amount-' + productId
    ).innerText

  if (clicked === 'button' && productAmount != '') {
    targetElement.classList.remove('product-select-btn')
    targetElement.setAttribute('disabled', '')
    targetElement.value = 'Selected'
  }
  if (targetElement.value === 'Selected' && productAmount != '') {
    let testFlag = 0
    productList = productList.map((product) => {
      if (product.id == productId) {
        product = {
          ...product,
          amount: productAmount,
          total_price: product.price * productAmount,
        }
        testFlag = 1
      }
      return product
    })
    if (testFlag === 0) {
      productList = [
        ...productList,
        {
          id: productId,
          name: productName,
          price: sellingPrice,
          buying_price: buyingPrice,
          amount: productAmount,
          available_amount: productAvailableAmount,
          total_price: productAmount * sellingPrice,
        },
      ]
    }
  }
  document.getElementById('selected-count').innerText = productList.length
  if (productList.length > 0) {
    document.getElementById('selected-count').classList.add('active')
  }
}

function toggleCheckbox(e) {
  const productId = e.target.getAttribute('data-product-id')
  const productCheckInput = document.getElementById('product-' + productId)
  if (e.target.value != '' && productCheckInput.value === 'Select') {
    productCheckInput.classList.add('product-select-btn')
  } else if (e.target.value != '' && productCheckInput.value === 'Selected') {
    calculateProducts(productCheckInput, 'quantity')
  } else productCheckInput.classList.remove('product-select-btn')
}

function sortProducts(products) {
  const sortValue = document.getElementById('sort-select').value
  const sortOrderValue = document.getElementById('sort-select-order').value
  if (sortValue == 'id') {
    if (sortOrderValue == 'desc') return products.sort((a, b) => b.id - a.id)
    else return products.sort((a, b) => a.id - b.id)
  } else if (sortValue == 'name') {
    if (sortOrderValue == 'desc')
      return products.sort((a, b) => {
        if (b.name > a.name) return 1
        else return -1
      })
    else
      return products.sort((a, b) => {
        if (b.name < a.name) return 1
        else return -1
      })
  } else if (sortValue == 'price') {
    if (sortOrderValue == 'desc')
      return products.sort((a, b) => b.selling_price - a.selling_price)
    else return products.sort((a, b) => a.selling_price - b.selling_price)
  } else if (sortValue == 'availability') {
    if (sortOrderValue == 'desc')
      return products.sort((a, b) => b.available_amount - a.available_amount)
    else return products.sort((a, b) => a.available_amount - b.available_amount)
  }
}

function getProductSearch(e) {
  const searchInput = document.getElementById('search-product')
  const searchSelect = document.getElementById('search-select')
  if (searchInput.value == '') {
    fetchAllProduct()
  } else {
    if (searchSelect.value === 'id') {
      fetchSearchedProducts('id', searchInput.value)
    } else if (searchSelect.value === 'name') {
      fetchSearchedProducts('name', searchInput.value)
    } else if (searchSelect.value === 'price') {
      fetchSearchedProducts('price', searchInput.value)
    }
  }

  if (searchSelect.value === 'id') {
    searchInput.type = 'number'
  } else if (searchSelect.value === 'name') {
    searchInput.type = 'text'
  } else if (searchSelect.value === 'price') {
    searchInput.type = 'number'
  }
}

function fetchSearchedProducts(searchType, value) {
  fetch('models/fetchSearchedProducts.php', {
    method: 'POST',
    body: JSON.stringify({
      searchType: searchType,
      value: value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data)
    })
}

function classRemover(nodeLists, className) {
  ;[...nodeLists].forEach((node) => {
    node.classList.remove(className)
  })
}

function addNewProduct() {
  let name = document.getElementById('product-name-input').value,
    amount = document.getElementById('amount-input').value,
    bPrice = document.getElementById('buying-price-input').value,
    cPrice = document.getElementById('celling-price-input').value

  if (name !== '' && amount !== '' && bPrice !== '' && cPrice !== '') {
    fetch('models/addNewProduct.php', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        amount: amount,
        bPrice: bPrice,
        cPrice: cPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data == 'success') {
          document.getElementById('product-name-input').value = ''
          document.getElementById('amount-input').value = ''
          document.getElementById('buying-price-input').value = ''
          document.getElementById('celling-price-input').value = ''
          alert('Product Inserted Successfully!')
        }
      })
  }
}

function updateProduct() {
  let id = document.getElementById('disabled-input-inner').value,
    amount = document.getElementById('amount-input').value,
    bPrice = document.getElementById('buying-price-input').value,
    cPrice = document.getElementById('celling-price-input').value

  fetch('models/checkProductId.php', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data == 'success') {
        if (id !== '' && amount !== '' && bPrice !== '' && cPrice !== '') {
          fetch('models/updateProduct.php', {
            method: 'POST',
            body: JSON.stringify({
              id: id,
              amount: amount,
              bPrice: bPrice,
              cPrice: cPrice,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data == 'success') {
                document.getElementById('disabled-input-inner').value = ''
                document.getElementById('amount-input').value = ''
                document.getElementById('buying-price-input').value = ''
                document.getElementById('celling-price-input').value = ''
                alert('Product Updated Successfully!')
              }
            })
        }
      } else {
        alert('Invalid Product Id!')
      }
    })
}

function fetchSoldProduct() {
  fetch('models/fetchSoldProducts.php')
    .then((res) => res.json())
    .then((data) => {
      renderSoldProducts(data)
    })
}

function renderSoldProducts(products) {
  let output = `<h2>Sold Product</h2>
        
        <div class="product-list">
          <table id="product-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Selling Price</th>
                <th>Available Amount</th>
              </tr>
            </thead>
            <tbody>`

  products.forEach((product) => {
    output += `<tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.buying_price}৳</td>
                <td>${product.selling_price}৳</td>
                <td>${product.available_amount}</td>
              </tr>`
  })

  output += `</tbody>
          </table>
        </div>
        <p style="text-align: center;" id="not-found"></p>`
  const notFound = document.getElementById('not-found')
  if (products.lenth == 0) {
    notFound.innerHTML = 'No data have matched or found!'
  }
  productContainer.className = 'product-container'
  productContainerInner.className = 'product-container-inner'
  productContainerInner.innerHTML = output
}

function logOut() {
  let output = `<h2>Please confirm your Logout</h2>
        <div class="logout-outer"><button id="logout-btn">Log Out</button></div>`
  productContainerInner.innerHTML = output
  document.getElementById('logout-btn').addEventListener('click', (e) => {
    fetch('models/logout.php')
      .then((res) => res.json())
      .then((data) => {
        window.location.href = 'index.php'
      })
  })
}

document
  .getElementById('confirm-sale')
  .addEventListener('click', confirmPurchase)

function confirmPurchase() {
  productList.forEach((product) => {
    updateSelectedProduct(product)
    addSoldProduct(product)
  })
  document.getElementById('selected-product-container').classList.add('hidden')
  setTimeout(() => {
    printInvoice()
  }, 0)
}

function printInvoice() {
  let output = ''

  productList.forEach((product) => {
    console.log(product)
    output += `
    <tr>
      <td><h4>${product.name}</h4></td>
      <td>${product.price}৳</td>
      <td>${product.amount}</td>
      <td>${product.total_price}৳</td>
    </tr>
    `
  })

  initAllProduct()
  fetchAllProduct()

  var mywindow = window.open('', 'PRINT', 'height=700,width=900')
  mywindow.document.write(`<html><head><title>${document.title}</title><link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700;900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/invoice.css" />`)
  mywindow.document.write('</head><body>')
  mywindow.document.write(`<div id="invoice-container">
      <div id="invoice">
        <header>
          <h2>Family Super-Shop <span>Basudebpur, Natore</span></h2>
        </header>
        <div id="invoice-desc">
          <div id="invoice-desc-header">
            <div id="invoice-no">
              <h1>INVOICE <span id="invoice-id">#398492</span></h1>
              <p>Account No: <span>675645464</span></p>
              <p>Invoice Date: <span id="invoice-date"></span></p>
            </div>
            <div id="invoice-to">
              <h3 id="invoice-name">${loggedUsername}</h3>
              <p id="invoice-to-desc">
                <small>Manager, Family Super-Shop</small>
              </p>
              <p>Ph: +8801#######</p>
              <p>Em: user@gmail.com</p>
              <p>Addr: Bashudebpur, Natore</p>
            </div>
          </div>
          <div id="invoice-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${output}
                <tr>
                  <td></td>
                  <td colspan="2"><h2>Total:</h2></td>
                  <td><h2>${calculateTotalPrice()}৳</h2></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="invoice-bottom">
            <p id="p-sign">Signature: </p>
            <h3 id="invoice-sign">${loggedUsername}</h3>
            <p id="invoice-sign-desc">Manager, Family Super-Shop</p>
          </div>
        </div>
      </div>
    </div>`)

  productList = []
  mywindow.document.write('</body></html>')
  mywindow.document.close() // necessary for IE >= 10
  mywindow.focus() // necessary for IE >= 10*/
  mywindow.print()
}

async function updateSelectedProduct(product) {
  await fetch('models/updateSelectedProduct.php', {
    method: 'POST',
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchAllProduct()
    })
}

function handleDashboardNav(e) {
  let navItems = document.querySelectorAll('.nav-item')
  classRemover(navItems, 'active')
  if (
    e.target.innerText === 'Daily Income' &&
    !e.target.classList.contains('active')
  ) {
    fetchDailyIncome()
    e.target.classList.add('active')
  } else if (
    e.target.innerText === 'Most Sold Products' &&
    !e.target.classList.contains('active')
  ) {
    fetchMostSoldProducts()
    e.target.classList.add('active')
  } else if (
    e.target.innerText === 'Most New Products' &&
    !e.target.classList.contains('active')
  ) {
    fetchMostNewProducts()
    e.target.classList.add('active')
  } else if (
    e.target.innerText === 'Most Available Products' &&
    !e.target.classList.contains('active')
  ) {
    fetchMostAvailableProducts()
    e.target.classList.add('active')
  }
}

function fetchMostAvailableProducts() {
  fetch('models/fetchMostAvailableProducts.php', {
    method: 'POST',
    body: {},
  })
    .then((res) => res.json())
    .then((data) => {
      renderMostAvailableProducts(data)
    })
}

function renderMostAvailableProducts(products) {
  products = products.sort((a, b) => b.available_amount - a.available_amount)
  document.getElementById('table-head').innerHTML = `
  <tr>
    <th>Product Id</th>
    <th>Name</th>
    <th>Available Amount</th>
  </tr>`

  let output = ''
  products.forEach((product) => {
    output += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.available_amount}</td>
      </tr>`
  })
  document.getElementById('table-body').innerHTML = output
}

function fetchMostNewProducts() {
  fetch('models/fetchMostNewProducts.php', {
    method: 'POST',
    body: {},
  })
    .then((res) => res.json())
    .then((data) => {
      renderMostNewProducts(data)
    })
}

function renderMostNewProducts(products) {
  products = products.sort((a, b) => {
    if (b.date_of_update > a.date_of_update) return 1
    else return -1
  })
  document.getElementById('table-head').innerHTML = `
  <tr>
    <th>Product Id</th>
    <th>Name</th>
    <th>Date of Updation</th>
  </tr>`

  let output = ''
  products.forEach((product) => {
    output += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.date_of_update}</td>
      </tr>`
  })
  document.getElementById('table-body').innerHTML = output
}

function fetchMostSoldProducts() {
  fetch('models/fetchMostSoldProducts.php', {
    method: 'POST',
    body: {},
  })
    .then((res) => res.json())
    .then((data) => {
      renderMostSoldProducts(data)
    })
}

function renderMostSoldProducts(products) {
  products = products.sort((a, b) => b.sold_amount - a.sold_amount)
  document.getElementById('table-head').innerHTML = `
  <tr>
    <th>Product Id</th>
    <th>Name</th>
    <th>Total Sold</th>
  </tr>`

  let output = ''
  products.forEach((product) => {
    output += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.sold_amount}</td>
      </tr>`
  })
  document.getElementById('table-body').innerHTML = output
}

let dailyIncomeList = []
let dateCount = 0
function fetchDailyIncome() {
  let output = `
    <div class="product-list">
      <table id="product-table">
        <thead id='table-head'>
          <tr>
            <th>Date</th>
            <th>Sold Quantity</th>
            <th>Total Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody id='table-body'>
        </tbody>
      </table>
    </div>
    <p style="text-align: center;" id="not-found"></p>`
  document.getElementById('dashboard-container').innerHTML = output
  fetchUniqueDates()
}

function fetchUniqueDates() {
  fetch('models/fetchUniqueDates.php', {
    method: 'POST',
    body: {},
  })
    .then((res) => res.json())
    .then((data) => {
      fetchDailyIncomeList(data)
      dateCount = data.length
    })
}

function fetchDailyIncomeList(dates) {
  dailyIncomeList = []
  dates.forEach((date) => {
    calculateDailyIncome(date.date)
  })
  renderDailySoldProducts()
}

async function calculateDailyIncome(date) {
  await fetch('models/calculateDailyIncome.php', {
    method: 'POST',
    body: JSON.stringify({ date: date }),
  })
    .then((res) => res.json())
    .then((data) => {
      dailyIncomeList.push(data[0])
    })

  renderDailySoldProducts()
}

async function addSoldProduct(product) {
  await fetch('models/addSoldProduct.php', {
    method: 'POST',
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {})
}

function renderDailySoldProducts() {
  tableBody = document.getElementById('table-body')
  let output = ''
  dailyIncomeList = dailyIncomeList.sort((a, b) => {
    if (b.date > a.date) return 1
    else return -1
  })
  dailyIncomeList.forEach((dailyIncome) => {
    output += `
      <tr>
        <td>${dailyIncome.date}</td>
        <td>${dailyIncome.quantity}</td>
        <td>${dailyIncome.total_price}৳</td>
        <td>${dailyIncome.profit}৳</td>
      </tr>`
  })
  tableBody.innerHTML = output
}

getLoggedUsername()
function getLoggedUsername() {
  fetch('models/fetchLoggedUser.php', {
    method: 'POST',
    body: {},
  })
    .then((res) => res.json())
    .then((data) => {
      loggedUsername = data
      console.log(loggedUsername)
    })
}
