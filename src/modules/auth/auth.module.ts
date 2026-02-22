import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { MailService } from '../mail/mail.service'
import { MailModule } from '../mail/mail.module'
import { RequestContextService } from '../../common/services/request-context.service'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        }),
        MailModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UsersService,
        RequestContextService,
        PrismaService,
        JwtStrategy,
        MailService,
    ],
})
export class AuthModule {}
