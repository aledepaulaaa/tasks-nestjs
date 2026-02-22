import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from '../prisma/prisma.service'
import { CloudinaryService } from '../../common/services/cloudinary/cloudinary.service'
import { RequestContextService } from '../../common/services/request-context.service'

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, CloudinaryService, RequestContextService],
})
export class UsersModule {}
