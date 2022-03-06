const products = document.querySelectorAll('.product');
const productModal = new bootstrap.Modal(document.querySelector('#productModal'), {
  keyboard: false
})

async function addAllCategories() {
  await fetch('/categorias')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#productCategoria');
      container.innerHTML = ''

      data.map(categoria => {
        const dataHTML = `<option value="${categoria.desc}">${categoria.desc}</option>`
        container.innerHTML += dataHTML
      });
    })
}

for (let i = 0; i < products.length; i++) {
  products[i].addEventListener('click', e => {
    const id = e.target.id;

    if (!id) {
      alert('Erro ao carregar ID, atualize a página e tente novamente');
      return;
    }

    fetch(`/produtos/${id}`)
      .then(res => res.json())
      .then(async ({ nome, desc, preco: { $numberDecimal }, image, categoria }) => {
        const preco = $numberDecimal;

        document.querySelector('#produto').innerHTML = nome;
        document.querySelector('#productImage').src = `/img/${image}`
        document.querySelector('#productDesc').value = desc;
        document.querySelector('#productNome').value = nome;
        document.querySelector('#productPreco').value = preco;

        await addAllCategories();
        document.querySelector('#productCategoria').value = categoria;

        productModal.show();
      });
  })
}