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

        document.querySelector('#btnDeletar').addEventListener('click', () => {
          fetch(`/produtos/delete/${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                document.location.reload();
                alert(`Produto: ${data.deletedProduct.nome} excluido com sucesso`);
              } else {
                alert('Erro ao excluir produto, tente novamente');
              }
            })
        })

        document.querySelector('#btnSalvar').addEventListener('click', () => {
          const newDesc = document.querySelector('#productDesc').value
          const newNome = document.querySelector('#productNome').value
          const newPreco = document.querySelector('#productPreco').value
          const newCategory = document.querySelector('#productCategoria').value

          if (!newDesc.trim() || !newNome.trim() || !newCategory.trim()) {
            alert('Informe todos os dados');
            return;
          }

          if (newPreco.includes(',')) {
            alert('Troque (,) por (.) no preço');
            return;
          }

          const preco = parseFloat(newPreco);

          fetch(`/produtos/update/${id}`, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome: newNome,
              desc: newDesc,
              preco: preco,
              categoria: newCategory
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                document.location.reload();
                alert(`Produto: ${data.newProduct.nome} atualizado com sucesso`);
              } else {
                alert('Erro ao atualizar produto, tente novamente');
              }
            })
        })
      });
  })
}