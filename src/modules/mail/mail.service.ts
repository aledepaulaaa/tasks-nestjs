import { Inject, Injectable } from '@nestjs/common'
import { EMAIL_SERVICE, SEND_PASSWORD_RESET } from '../../consts'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class MailService {
    constructor(@Inject(EMAIL_SERVICE) private client: ClientProxy) {}

    async sendPasswordRequest(email: string, token: string) {
        const url = `${process.env.BASE_URL!}/auth/reset-password?token=${token}`

        this.client.emit(SEND_PASSWORD_RESET, { email, url })
    }
}
