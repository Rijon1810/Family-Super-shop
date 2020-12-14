const sideBarBtn = document.getElementById('aside-toggle'),
  sideBar = document.getElementById('side-bar'),
  sideLinks = document.getElementsByClassName('side-link'),
  productContainer = document.getElementById('product-container')

sideBarBtn.addEventListener('click', (e) => {
  sideBarBtn.classList.toggle('hidden')
  sideBar.classList.toggle('hidden')
  productContainer.classList.toggle('hidden')
})

sideBar.addEventListener('click', (e) => {
  if (e.target.classList.contains('side-link')) {
    classRemover(sideLinks, 'active')
    e.target.classList.add('active')
  } else if (e.target.parentElement.classList.contains('side-link')) {
    classRemover(sideLinks, 'active')
    e.target.parentElement.classList.add('active')
  }
})

function classRemover(nodeLists, className) {
  ;[...nodeLists].forEach((node) => {
    node.classList.remove(className)
  })
}
