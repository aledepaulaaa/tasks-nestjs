import { Test, TestingModule } from '@nestjs/testing'
import { ProjectsService } from './projects.service'
import { PrismaService } from '../prisma/prisma.service'
import { RequestContextService } from '../../common/services/request-context.service'
import { Project } from '@prisma/client'
import { paginateOutput } from '../../utils/pagination.utils'
import { mockedProjects, mockPaginationQuery } from './projects.mocks'

describe('ProjectsService', () => {
    let service: ProjectsService
    let prisma: PrismaService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectsService,
                PrismaService,
                {
                    provide: PrismaService,
                    useValue: {
                        project: {
                            findMany: jest.fn(),
                            count: jest.fn(),
                            findFirst: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                        projectCollaborator: {
                            create: jest.fn(),
                            deleteMay: jest.fn(),
                        },
                        task: {
                            deleteMany: jest.fn(),
                        },
                    },
                },
                {
                    provide: RequestContextService,
                    useValue: {
                        getUserId: jest.fn().mockReturnValue('user-1'),
                    },
                },
            ],
        }).compile()

        service = module.get<ProjectsService>(ProjectsService)
        prisma = module.get<PrismaService>(PrismaService)
    })

    // teste para retornar lista de projetos
    it('Este teste deve ser capaz de retornar uma lista paginada de projetos', async () => {
        // criando um mock e especificando o retorno das funções
        jest.spyOn(prisma.project, 'findMany').mockResolvedValue(mockedProjects)
        jest.spyOn(prisma.project, 'count').mockResolvedValue(mockedProjects.length)

        // chamada da função
        const result = await service.findAll(mockPaginationQuery)

        // comparações
        expect(result).toEqual(
            paginateOutput<Project>(mockedProjects, mockedProjects.length, mockPaginationQuery),
        )
        expect(prisma.project.findMany).toHaveBeenCalledTimes(1)
    })

    // teste para retornar um projeto por ID
    it('Este teste deve ser capaz de retornar um projeto por ID', async () => {
        const project: any = mockedProjects[0]
        jest.spyOn(prisma.project, 'findFirst').mockResolvedValue(project)

        const result = await service.findbyId(project)
        expect(result).toEqual(project)
        expect(prisma.project.findFirst).toHaveBeenCalledTimes(1)
    })

    // teste para criar um projeto
    it('Este teste deve ser capaz de criar um novo projeto', async () => {
        const project = mockedProjects[0]
        jest.spyOn(prisma.project, 'create').mockResolvedValue(project)

        const result = await service.create({
            name: project.name,
            description: project.description as string,
        })

        expect(result).toEqual(project)
        expect(prisma.project.create).toHaveBeenCalledTimes(1)
    })

    // teste para atualizar um projeto por ID
    it('Este teste deve ser capaz de atualizar um projeto', async () => {
        const project = mockedProjects[0]
        jest.spyOn(prisma.project, 'update').mockResolvedValue(project)

        const result = await service.update(project.id, {
            name: project.name,
            description: project.description as string,
        })

        expect(result).toEqual(project)
        expect(prisma.project.update).toHaveBeenCalledTimes(1)
    })

    // teste para excluir um projeto por ID
    it('Este teste deve ser capaz de excluir um projeto por ID', async () => {
        const project = mockedProjects[0]

        await service.remove(project.id)

        expect(prisma.project.delete).toHaveBeenCalledTimes(1)
    })
})
