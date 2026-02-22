import { Reflector } from '@nestjs/core'
import { ValidateResourcesIdsInterceptor } from './validate-resources-ids.interceptor'
import { PrismaService } from '../../modules/prisma/prisma.service'
import { ExecutionContext, NotFoundException } from '@nestjs/common'
import { of } from 'rxjs'
import { Test, TestingModule } from '@nestjs/testing'
import { VALIDATE_RESOURCES_IDS_KEY } from '../../consts'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'

describe('ValidateResourcesIdsInterceptor', () => {
    let interceptor: ValidateResourcesIdsInterceptor
    let reflector: Reflector
    let prisma: PrismaService

    const mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn(),
        getHandler: jest.fn(),
    } as unknown as ExecutionContext

    const mockCallHandler = {
        handle: jest.fn(() => of({})),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValidateResourcesIdsInterceptor,
                {
                    provide: Reflector,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: PrismaService,
                    useValue: {
                        project: {
                            findFirst: jest.fn(),
                        },
                        task: {
                            findFirst: jest.fn(),
                        },
                    },
                },
            ],
        }).compile()

        interceptor = module.get<ValidateResourcesIdsInterceptor>(ValidateResourcesIdsInterceptor)
        reflector = module.get<Reflector>(Reflector)
        prisma = module.get<PrismaService>(PrismaService)
    })

    it('[TESTE] - Este teste deve ignorar a validação se o decorador não estiver presente', async () => {
        jest.spyOn(reflector, 'get').mockReturnValue(false)

        const result = await interceptor.intercept(mockExecutionContext, mockCallHandler)

        expect(reflector.get).toHaveBeenCalledWith(
            VALIDATE_RESOURCES_IDS_KEY,
            mockExecutionContext.getHandler(),
        )

        expect(result).toBeDefined()
        expect(prisma.project.findFirst).not.toHaveBeenCalled()
    })

    it('[TESTE] - Deve validar o ID do projeto e lançar uma exceção caso o projeto não seja encontrado.', async () => {
        const mockRequest = {
            params: {
                projectId: 'project-1',
            },
        }

        jest.spyOn(reflector, 'get').mockReturnValue(true)
        jest.spyOn(mockExecutionContext, 'switchToHttp').mockReturnValue({
            getRequest: () => mockRequest,
        } as HttpArgumentsHost)
        jest.spyOn(prisma.project, 'findFirst').mockResolvedValue(null)

        await expect(interceptor.intercept(mockExecutionContext, mockCallHandler)).rejects.toThrow(
            NotFoundException,
        )
        expect(prisma.project.findFirst).toHaveBeenCalledWith({
            where: { id: 'project-1' },
        })
    })

    it('[TESTE] - Validar se o projeto existe e se existe, deixar prosseguir com a request', async () => {
        const mockRequest = {
            params: {
                projectId: 'project-1',
            },
        }

        jest.spyOn(reflector, 'get').mockReturnValue(true)
        jest.spyOn(mockExecutionContext, 'switchToHttp').mockReturnValue({
            getRequest: () => mockRequest,
        } as HttpArgumentsHost)
        jest.spyOn(prisma.project, 'findFirst').mockResolvedValue({ id: 'project-1' } as any)

        const result = await interceptor.intercept(mockExecutionContext, mockCallHandler)

        expect(result).toBeDefined()
        expect(prisma.project.findFirst).toHaveBeenLastCalledWith({
            where: { id: 'project-1' },
        })
    })

    it('[TESTE] - Deve validar o ID da tarefa e lançar uma exceção caso a tarefa não seja encontrada.', async () => {
        const mockRequest = {
            params: {
                projectId: 'project-1',
                taskId: 'task-1',
            },
        }
        jest.spyOn(reflector, 'get').mockReturnValue(true)
        jest.spyOn(mockExecutionContext, 'switchToHttp').mockReturnValue({
            getRequest: () => mockRequest,
        } as HttpArgumentsHost)
        jest.spyOn(prisma.project, 'findFirst').mockResolvedValue({ id: 'project-1' } as any)
        jest.spyOn(prisma.task, 'findFirst').mockResolvedValue(null)

        await expect(interceptor.intercept(mockExecutionContext, mockCallHandler)).rejects.toThrow(
            NotFoundException,
        )
        expect(prisma.task.findFirst).toHaveBeenCalledWith({
            where: { projectId: 'project-1', id: 'task-1' },
        })
    })

    it('[TESTE] - Deve-se validar tanto o projeto quanto a tarefa e prosseguir se ambos existirem.', async () => {
        const mockRequest = {
            params: {
                projectId: 'project-1',
                taskId: 'task-1',
            },
        }

        jest.spyOn(reflector, 'get').mockReturnValue(true)
        jest.spyOn(mockExecutionContext, 'switchToHttp').mockReturnValue({
            getRequest: () => mockRequest,
        } as HttpArgumentsHost)
        jest.spyOn(prisma.project, 'findFirst').mockResolvedValue({ id: 'project-1' } as any)
        jest.spyOn(prisma.task, 'findFirst').mockResolvedValue({ id: 'task-1' } as any)

        const result = await interceptor.intercept(mockExecutionContext, mockCallHandler)

        expect(result).toBeDefined()
        expect(prisma.project.findFirst).toHaveBeenCalledWith({
            where: { id: 'project-1' },
        })
        expect(prisma.task.findFirst).toHaveBeenCalledWith({
            where: { projectId: 'project-1', id: 'task-1' },
        })
    })
})
