import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { PrismaService } from '../../modules/prisma/prisma.service'
import { VALIDATE_RESOURCES_IDS_KEY } from '../../consts'

@Injectable()
export class ValidateResourcesIdsInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<Request>> {
        // Validar se o endpoint possui o decorator @ValidateResourcesIds()
        const shouldValidate = this.reflector.get<boolean>(
            VALIDATE_RESOURCES_IDS_KEY,
            context.getHandler(),
        )

        /*
        aqui executamos uma validação, se qualquer endpoint não estiver usando o decorator @ValidateResourcesIds()
        a execução continua com o next.handle()
    */
        if (!shouldValidate) {
            return next.handle()
        }

        // Validar o projectId da URL
        const request = context.switchToHttp().getRequest()
        const projectId = request.params.projectId
        const project = await this.prisma.project.findFirst({
            where: {
                id: projectId,
            },
        })

        if (!project) {
            throw new NotFoundException('Projeto não encontrado')
        }

        // Validar o taskId da URL, se existir
        const taskId = request.params.taskId
        if (taskId) {
            const task = await this.prisma.task.findFirst({
                where: {
                    projectId,
                    id: taskId,
                },
            })

            if (!task) {
                throw new NotFoundException('Tarefa não encontrada')
            }
        }

        return next.handle()
    }
}
