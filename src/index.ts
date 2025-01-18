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

const pedidos = [


]

const resourceHello = (req: Request, res: Response) => {
  console.log(req.ip)
  res.send({message: "hello Word"})
}

app.get("/Hello", resourceHello)

// GET /lanches
app.get("/lanches", (req: Request, res: Response) => {

  res.send(lanches)
})

// POST /pedidos
app.post("/pedidos", (req: Request, res: Response) => {
  // resgatar as informações da requisição
  const {id_cliente,quantidade,nome_cliente, endereco, telefone} = req.body
  const pedido = {
    id: pedidos.length + 1,
    status: "criado",
    id_cliente,
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



// GET /pedidos/id/status

// PATCH /pedidos/id -> cancelar um pedido

// PUT /pedidos/id -> alterar o pedido

// DELETE /pedidos/id



const PORT = 3000
app.listen(PORT)
