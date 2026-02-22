import { Module } from '@nestjs/common'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'
import { PrismaService } from '../prisma/prisma.service'
import { RequestContextService } from '../../common/services/request-context.service'

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, RequestContextService]
})
export class CommentsModule {}
