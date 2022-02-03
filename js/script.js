class Produto{
    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        this.valorAtual = 0;
        this.somaTotal = 0;
    }

    salvar(){
        let produto = this.lerDados();

        if (this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
                this.calcular(1, produto);
            }else{
                this.atualizar(this.editId, produto);
            }
            
        }

        this.listaTabela();
        this.cancelar();
    }

    lerDados(){
        let produto = {};

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;
        produto.quantidade = document.getElementById('qtd').value;

        return produto;
    }

    validaCampos(produto){
        let msg = "";

        if(produto.nomeProduto == ''){
            msg += '- Informe o Nome do produto! \n';
        }

        if(produto.preco == ''){
            msg += '- Informe o preco do produto! \n';
        }

        if(msg != ""){
            alert(msg);
            return false;
        }

        return true;
    }

    adicionar(produto){
        
        produto.preco = parseFloat(produto.preco);
        produto.preco = produto.preco.toFixed(2);
        
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
    
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                let valAnterior = this.arrayProdutos[i].preco;
                this.arrayProdutos[i].preco = produto.preco;
                console.log(this.arrayProdutos[i].quantidade)
                this.calcular(2, this.arrayProdutos[i].preco, this.arrayProdutos[i].quantidade, valAnterior)

            }
        }
    }

    preparaEditacao(dados){
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;
        document.getElementById('qtd').value = dados.quantidade;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText ="";
        
        for (let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_qtd = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acao = tr.insertCell();
        
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_qtd.innerText = this.arrayProdutos[i].quantidade;
            td_valor.innerText = this.arrayProdutos[i].preco;
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute('onclick', 'produto.preparaEditacao('+ JSON.stringify(this.arrayProdutos[i]) +')');

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.png';
            imgDelete.setAttribute('onclick', 'produto.deletar('+ this.arrayProdutos[i].id+')');
            this.valorAtual = this.arrayProdutos[i].preco
            
            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgDelete);
            
        }
    }

    calcular(idx, dados, quantidade, valAnterior = 0){
        //idx 1 = adicionar - idx 2 = atualizar - idx 3 = deletar 
        let total = 0;

        if(idx == 1){
            total = parseFloat(dados.preco) * dados.quantidade;
            this.somaTotal += total;
        }else if(idx == 2){
            this.somaTotal -= parseFloat(valAnterior) * quantidade;
            console.log(this.somaTotal)
            console.log(dados)
            console.log(quantidade)
            total = parseFloat(dados) * quantidade;
            this.somaTotal += parseFloat(dados);

        }else if(idx == 3){
            this.somaTotal -= parseFloat(dados);
        }

        document.getElementById('total').innerText = 'Total: R$'+this.somaTotal;
        return this.somaTotal;
    }

    cancelar(){
        document.getElementById('produto').value = "";
        document.getElementById('preco').value = "";
        document.getElementById('qtd').value = 1;
        
        document.getElementById('btn1').innerText = "Salvar";
        this.editId = null;

        document.getElementById('produto').focus();
    }

    deletar(id){
        if(confirm("Deseja excluir o item do ID " + id)){
            
            let tbody = document.getElementById('tbody');
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.calcular(3, this.arrayProdutos[i].preco, this.arrayProdutos[i].qtd)
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

}

var produto = new Produto();