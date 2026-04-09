import { Router } from "express";
// import express from 'express';
import { prisma } from '../prisma/prisma';
import type { Usuario } from '../prisma/generated/prisma/client';
import { createHash } from '../utils/createHash';
// import { auth } from '../middleware/auth';
// import cors from "cors"

export const userRouter = Router();


// Endpoints usuario
userRouter.get('/usuarios', async (_, res) => {
  const usuarios = await prisma.usuario.findMany();
  return res.json(usuarios);
})

userRouter.get('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuario);
})


userRouter.put("/usuarios/:id", async (req, res) => {
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

userRouter.delete('/usuarios/:id', async (req, res) => {
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