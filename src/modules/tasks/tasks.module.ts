import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { PrismaModule } from '../prisma/prisma.module'
import { RequestContextService } from '../../common/services/request-context.service'

@Module({
    imports: [PrismaModule],
    controllers: [TasksController],
    providers: [TasksService, RequestContextService],
})
export class TasksModule {}
