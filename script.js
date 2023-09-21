class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null
        
    }


    salvar() {
        let produto = this.lerDados();

        if( this.validaCampo(produto) == true) {
            if(this.editId == null) {
               this.adcionar(produto)
            }else {
                this.atualizar(this.editId, produto)
            }
        }
        this.listaTabela();

        this.cancelar()
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell() 
            let td_produto = tr.insertCell()
            let td_preco = tr.insertCell()
            let td_acoes = tr.insertCell()
            

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center')
            td_acoes.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick", "produto.editar("+JSON.stringify(this.arrayProdutos[i])+")");


            let imgDel = document.createElement('img');
            imgDel.src = 'img/botao-apagar.png'
            imgDel.setAttribute("onclick", "produto.deletar("+this.arrayProdutos[i].id+")");


            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDel);


            console.log(this.arrayProdutos)


        }
    }   

    adcionar(produto) {
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;
    }   

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }
 
    editar(dadosArray) {
        this.editId = dadosArray.id
        console.log(this.editId)

        document.getElementById('produto').value = dadosArray.nomeProduto
        document.getElementById('preco').value = dadosArray.preco

        document.getElementById('btn1').innerText = "Atualizar"
    }

    lerDados() {
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('preco').value

        return produto
    }


    validaCampo(produto) {
        let msg = "";

        if(produto.nomeProduto == "" || produto.preco == "" ) {
            msg += "preencha todos os campos"
            alert(msg)
            return false
        }


        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';
        
        document.getElementById('btn1').innerText = "salvar"
        this.editId = null
    }

    deletar(id) {

        if(confirm(`Deseja realmente deletar o produto do id ${id} ?`)) {
            let tbody = document.getElementById('tbody')
       
            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
        }

        console.log(this.arrayProdutos)
    }
}

const produto = new Produto()