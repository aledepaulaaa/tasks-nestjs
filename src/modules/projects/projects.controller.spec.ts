import { Test, TestingModule } from '@nestjs/testing'
import { ProjectsController } from './projects.controller'
import { ProjectsModule } from './projects.module'
import { ProjectsService } from './projects.service'
import { PrismaService } from '../prisma/prisma.service'
import { RequestContextService } from '../../common/services/request-context.service'
import { paginateOutput } from '../../utils/pagination.utils'
import { Project } from '@prisma/client'
import { mockedProjects, mockPaginationQuery } from './projects.mocks'

describe('ProjectsController', () => {
    let controller: ProjectsController
    let service: ProjectsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ProjectsModule],
        })
            .overrideProvider(ProjectsService)
            .useValue(service)
            .overrideProvider(PrismaService)
            .useValue({ $connect: jest.fn() })
            .overrideProvider(RequestContextService)
            .useValue({ getUserId: jest.fn().mockRejectedValue('user-1') })
            .compile()

        controller = module.get<ProjectsController>(ProjectsController)
        service = module.get<ProjectsService>(ProjectsService)
    })

    describe('findAll', () => {
        it('[TESTE FINDALL SUCCESS] - Este teste precisa retornar uma lista de projetos paginados', async () => {
            const mockedResponse = paginateOutput<Project>(
                mockedProjects,
                mockedProjects.length,
                mockPaginationQuery,
            )

            jest.spyOn(service, 'findAll').mockResolvedValue(mockedResponse)

            const response = await controller.findAll()

            expect(response).toEqual(mockedResponse)
            expect(service.findAll).toHaveBeenCalledTimes(1)
        })
    })

    describe('findOne', () => {
        it('[TESTE FINDONE SUCCESS] - Este teste precisa retornar um projeto pelo ID', async () => {
            const project = mockedProjects[0]
            const projectId = project.id
            const expectedResult = {
                ...project,
                tasks: [],
            }

            jest.spyOn(service, 'findbyId').mockResolvedValue(expectedResult)

            const response = await controller.findOne(projectId)

            expect(response).toEqual(expectedResult)
            expect(service.findbyId).toHaveBeenCalledWith(projectId)
            expect(service.findbyId).toHaveBeenCalledTimes(1)
        })
    })

    describe('create', () => {
        it('[TESTE CREATE SUCCESS] - Este teste precisa criar um novo projeto', async () => {
            const project = mockedProjects[0]

            jest.spyOn(service, 'create').mockResolvedValue(project)

            const response = await controller.create({
                name: project.name,
                description: project.description as string,
            })

            expect(response).toEqual(project)
            expect(service.create).toHaveBeenCalledTimes(1)
        })

        it('[TESTE CREATE ERROR] - Este teste precisa retornar um erro de validação', async () => {
            const error = new Error('Nome é requerido')

            jest.spyOn(service, 'create').mockRejectedValue(error)

            await expect(controller.create({ name: '', description: '' })).rejects.toThrow(
                'Nome é requerido',
            )
        })
    })

    describe('update', () => {
        it('[TESTE UPDATE SUCCESS] - Este teste precisa atualizar um projeto', async () => {
            const project = { ...mockedProjects[0], tasks: [] }

            jest.spyOn(service, 'update').mockResolvedValue(project)

            const response = await controller.update(project.id, {
                name: project.name,
                description: project.description as string,
            })

            expect(response).toEqual(project)
            expect(service.update).toHaveBeenCalledTimes(1)
        })
    })

    describe('remove', () => {
        it('[TESTE REMOVE SUCCESS] - Este teste precisa remover um projeto', async () => {
            jest.spyOn(service, 'remove').mockImplementation()
            await controller.remove(mockedProjects[0].id)

            expect(service.remove).toHaveBeenCalledTimes(1)
        })
    })
})
