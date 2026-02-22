import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ProjectRequestDTO } from './projects.dto'
import { CollaboratorRole, Project } from '@prisma/client'
import { RequestContextService } from '../../common/services/request-context.service'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto'
import { paginate, paginateOutput } from '../../utils/pagination.utils'

@Injectable()
export class ProjectsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly requestContext: RequestContextService,
    ) {}

    async findAll(query?: QueryPaginationDTO) {
        const userId = this.requestContext.getUserId()
        const projects = await this.prisma.project.findMany({
            ...paginate(query),
            where: {
                OR: [
                    { createdById: userId },
                    {
                        collaborators: {
                            some: { userId },
                        },
                    },
                ],
            },
        })

        const total = await this.prisma.project.count({
            where: {
                OR: [
                    { createdById: userId },
                    {
                        collaborators: {
                            some: { userId },
                        },
                    },
                ],
            },
        })

        return paginateOutput<Project>(projects, total, query)
    }

    findbyId(id: string) {
        const userId = this.requestContext.getUserId()
        return this.prisma.project.findFirst({
            where: {
                id,
                createdById: userId,
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                createdById: true,
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        status: true,
                        priority: true,
                        dueDate: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        })
    }

    async create(data: ProjectRequestDTO) {
        const userId = this.requestContext.getUserId()
        const project = await this.prisma.project.create({
            data: {
                ...data,
                createdById: userId,
            },
        })

        // Adicionar o usuário owner ao projeto criado
        await this.prisma.projectCollaborator.create({
            data: {
                projectId: project.id,
                userId: userId,
                role: CollaboratorRole.OWNER,
            },
        })

        return project
    }

    update(id: string, data: ProjectRequestDTO) {
        const userId = this.requestContext.getUserId()
        return this.prisma.project.update({
            where: {
                id: id,
                createdById: userId,
            },
            data,
        })
    }

    remove(id: string) {
        const userId = this.requestContext.getUserId()
        return this.prisma.project.delete({
            where: {
                id,
                createdById: userId,
            },
        })
    }
}
