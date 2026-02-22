import { Module } from '@nestjs/common'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { PrismaModule } from '../prisma/prisma.module'
import { RequestContextService } from '../../common/services/request-context.service'

@Module({
    imports: [PrismaModule],
    controllers: [ProjectsController],
    providers: [ProjectsService, RequestContextService],
})
export class ProjectsModule {}
