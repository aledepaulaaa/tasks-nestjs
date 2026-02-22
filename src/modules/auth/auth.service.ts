import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { ChangePasswordDTO, SignInDTO, SignUpDTO } from './auth.dto'
import * as bcrypt from 'bcrypt'
import { MailService } from '../mail/mail.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
    ) {}

    async signup(data: SignUpDTO) {
        // Criptografar a senha do usuário
        const hash = await bcrypt.hash(data.password, 12)

        // Salvar o usuário no banco de dados
        const newUser = await this.usersService.create({
            ...data,
            password: hash,
        })

        // retornar o token JWT de acesso
        return {
            token: this.jwtService.sign({
                sub: newUser.id,
            }),
        }
    }

    async signin(data: SignInDTO) {
        const user = await this.usersService.findByEmail(data.email)

        if (user && (await bcrypt.compare(data.password, user.password))) {
            return {
                token: this.jwtService.sign({
                    sub: user.id,
                }),
            }
        }

        throw new UnauthorizedException()
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            purpose: 'password_reset',
        })

        await this.mailService.sendPasswordRequest(user.email, token)

        return {
            message: 'Requisição de senha enviada para o email.',
        }
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const payload = await this.jwtService.verify(token)

            if (payload.purpose !== 'password_reset') {
                throw new BadRequestException('Token inválido')
            }

            const user = await this.usersService.findById(payload.sub)

            if (!user) {
                throw new BadRequestException('Token inválido')
            }

            const hash = await bcrypt.hash(newPassword, 12)

            return this.prisma.user.update({
                where: { id: user.id },
                data: { password: hash },
            })
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Token inválido ou expirado')
        }
    }

    async changePassword(userId: string, data: ChangePasswordDTO) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const valid = await bcrypt.compare(data.currentPassword, user.password)

        if (!valid) {
            throw new UnauthorizedException('Current password is not valid')
        }

        const hash = await bcrypt.hash(data.newPassword, 12)

        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hash },
        })
    }
}
