import type { PrismaClient, Token, Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class AuthRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async cadastrar(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || ""
            }
        })
    }

    async existeUsuario(email: string) {
        return await this.prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
    }

    async deletar(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || ""
            }
        })
    }


    
    //   async (dadosUsuario: Partial<Usuario>) {
    //     return await this.prisma.usuario.create({
    //         data: {
    //             email: dadosUsuario.email || "",
    //             senha: dadosUsuario.senha || "",
    //             nome: dadosUsuario.nome || ""
    //         }
    //     })
    // }






}

export const authRepository = new AuthRepository(prisma)
