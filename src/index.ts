import express from 'express';
import { prisma } from './prisma/prisma';
import type { Usuario } from './prisma/generated/prisma/client';

const app = express();
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  console.log(req)
  res.send("Hello world")
})

// Endpoints usuario
app.get('/usuarios', async (_, res) => {
  const usuarios = await prisma.usuario.findMany();
  return res.json(usuarios);
})

app.get('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuario);
})

app.post("/usuarios", async (req, res) => {
  console.log(req.body)
  const dadosUsuario = req.body as Usuario
  const usuarioCriado = await prisma.usuario.create({
    data: {
      email: dadosUsuario.email,
      nome: dadosUsuario.nome || null
    }
  })
  return res.status(201).json(usuarioCriado)
})

app.put("/usuarios/:id", async (req, res) => {
  const idUsuario = Number(req.params.id)
  const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

  const usuarioAtualizado = await prisma.usuario.update({
    data: {
      ...dadosParaAtualizar
    },
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuarioAtualizado);
})

app.delete('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuarioDeletado = await prisma.usuario.delete({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json({
    mensagem: "Usuário deletado com sucesso!",
    data: usuarioDeletado
  });
})

//Exames

app.listen(port, () => {
  console.log("Servidor ta de pé :p")
})