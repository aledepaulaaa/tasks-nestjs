import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProjectsModule } from './modules/projects/projects.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { UsersModule } from './modules/users/users.module'
import { CollaboratorsService } from './modules/collaborators/collaborators.service'
import { CollaboratorsController } from './modules/collaborators/collaborators.controller'
import { CollaboratorsModule } from './modules/collaborators/collaborators.module'
import { CommentsModule } from './modules/comments/comments.module'
import { AuthModule } from './modules/auth/auth.module'
import { RequestContextService } from './common/services/request-context.service'
import { MailModule } from './modules/mail/mail.module'
import { CloudinaryService } from './common/services/cloudinary/cloudinary.service'

@Module({
    imports: [
        PrismaModule,
        ProjectsModule,
        TasksModule,
        UsersModule,
        CollaboratorsModule,
        CommentsModule,
        AuthModule,
        MailModule,
    ],
    controllers: [AppController, CollaboratorsController],
    providers: [AppService, CollaboratorsService, RequestContextService, CloudinaryService],
})
export class AppModule {}
