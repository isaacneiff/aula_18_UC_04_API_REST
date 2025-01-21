import { error } from "console"
import express, {Request, Response } from "express"


// Criando a instância do servidor
const app =  express()

// A API vai suportar o recebimento e envido de JSON
app.use(express.json())

const lanches = [
  {
  id: 1,
  nome: "X-Pica",
  tamanho: "p",
  valor: 25
  },
  {
  id: 2,
  nome: "X-bacon",
  tamanho: "M",
  valor: 30
  },
  {
  id: 3,
  nome: "X-Egg",
  tamanho: "G",
  valor: 40
  }
]

type Pedido = {
  id: number;
  status: string;
  id_lanche: number;
  nome_lanche: string;
  quantidade: number;
  nome_cliente: string;
  endereco: string;
  telefone: string;
}

const pedidos: Pedido [] = []

// GET /lanches
app.get("/lanches", (req: Request, res: Response) => {

  res.send(lanches)
})

// POST /pedidos
app.post("/pedidos", (req: Request, res: Response) => {
  // resgatar as informações da requisição
  const {id_lanche,quantidade,nome_cliente, endereco, telefone} = req.body

  // validar se o lanche com id existe na lista de lanches

let lanche

for (const l of lanches) {
  if (l.id === id_lanche){
    lanche = l
    break
  }
}

  // Se não existir, retorna um erro dizendo que não existe

if (!lanche) {
  res.status(404).send("Lanche não encontrado!")
  return
}

  // Se existir, segue a criação do pedido
  const nome_lanche = lanche.nome
  const pedido = {
    id: pedidos.length + 1,
    status: "criado",
    id_lanche,
    nome_lanche,
    quantidade,
    nome_cliente,
    endereco,
    telefone,
  }
  // adicionar um pedido a lista de pedidos
  pedidos.push(pedido)
  //retornar o pedido com o id
  res.send(pedido)

} )

// Buscar um pedido pelo ID
// GET /pedidos/id/status

app.get("/pedidos/:id/status", (req: Request, res: Response) => {

  // Como pegar o Id do pedido na requisição?

  const  {id} = req.params

  if(!id) {
    res.status(400).send("ID do pedido inválido")
    return
  }
  // Converto o id que é string para um número inteiro
  const id_pedido = parseInt(id, 10)
  // Buscar o pedido com o Id da requisição
  let pedido
  for (const p of pedidos) {

    if(p.id === id_pedido) {
      pedido = p
      break
    }

  }

  res.send({ id_pedido: id })
  // Se o pedido não exisitr retorna um erro
  if (!pedido) {
    res.status(404).send({error: "ID do pedido inválido"})
    return
  }

  // Se existir, retorna o pedido completo


})



// PATCH /pedidos/id -> cancelar um pedido

// PUT /pedidos/id -> alterar o pedido

// DELETE /pedidos/id



const PORT = 3000
app.listen(PORT)
