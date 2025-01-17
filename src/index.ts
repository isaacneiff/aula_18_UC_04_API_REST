import express, {Request, Response } from "express"


// Criando a instância do servidor
const app =  express()

// A API vai suportar o recebimento e envido de JSON
app.use(express.json())


const resourceHello = (req: Request, res: Response) => {
  console.log(req.ip)
  res.send({message: "hello Word"})
}

app.get("/Hello", resourceHello)
const PORT = 3000
app.listen(PORT)
