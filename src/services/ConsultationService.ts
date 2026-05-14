import type { Consulta } from "../prisma/generated/prisma/client";
import { consultaRepository, type ConsultaRepository } from "../repositories/ConsultationRepository";

export class ConsultaService {
    constructor(private readonly repository: ConsultaRepository) {}

    async listarTodasConsultas() {
        return await this.repository.listarTodasConsultas();
    }

    async buscarConsultaId(idConsulta: number) {
        return await this.repository.buscarConsultaId(idConsulta);
    }

    async criarConsulta(dadosConsulta: Consulta) {
        return await this.repository.criarConsulta(dadosConsulta);
    }

    async atualizarConsulta(idConsulta: number, dadosParaAtualizar: Omit<Consulta, 'id'>) {
        return await this.repository.atualizarConsulta(idConsulta, dadosParaAtualizar);
    }

    async deletarConsulta(idConsulta: number) {
        return await this.repository.deletarConsulta(idConsulta);
    }
}

export const consultaService = new ConsultaService(consultaRepository);