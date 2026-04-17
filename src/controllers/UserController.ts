import type { Request, Response } from "express";
import type { Usuario } from "../prisma/generated/prisma/client"
import { AuthService, authService } from "../services/AuthService";
import { UserService } from "../services/UserService";

class AuthController {
    constructor(private readonly service: AuthService) {
    }

    async cadastrar(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Usuario
            const usuarioCriado = await this.service.cadastrar(dadosUsuario);
            return res.status(201).json({
                message: "Usuário criado com sucesso!",
                data: usuarioCriado
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }


    async logar(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Partial<Usuario>
            const dadosLogin = await this.service.logar(dadosUsuario);
            return res.status(200).json({
                message: "Usuário autenticado com sucesso!",
                accessToken: dadosLogin.tokenAcesso,
                refreshToken: dadosLogin.tokenRefresh
            })
        } catch (error) {
            console.log(error)
            return res.status(404).json({
                error
            })
        }
    }
}

//     async atualizar(req: Request, res: Response) {
//     try {
//         const idUsuario = Number(req.params.id)
//         const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

//         const usuarioAtualizado = await this.service.atualizar({
//             data: {
//                 ...dadosParaAtualizar
//             },
//             where: {
//                 id: idUsuario
//             }
//         })
//         return res.status(200).json(usuarioAtualizado);
//     } catch (error) {
//         console.log(error)
//     }
// }



//   async deletar(req: Request, res: Response) {
//     try {
//         const idUsuario = Number(req.params.id)
//         const usuarioDeletado = await this.service.deletar({
//             where: {
//                 id: idUsuario
//             }
//         });
//         return res.status(201).json({
//             message: "Usuário deletado com sucesso!",
//             data: usuarioDeletado
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(404).json({
//             error
//         })
//     }
// }





export const UserController = new UserController(UserService)
