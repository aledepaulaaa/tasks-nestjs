import { ExecutionContext } from '@nestjs/common'
import { RequestContextService } from '../services/request-context.service'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from './jwt-auth.guard'

describe('JwtAuthGuard', () => {
    let guard: JwtAuthGuard
    let requestContextService: RequestContextService
    let mockExecutionContext: ExecutionContext

    beforeEach(() => {
        requestContextService = {
            setUser: jest.fn(),
        } as any

        guard = new JwtAuthGuard(requestContextService)

        mockExecutionContext = {
            switchToHttp: () => ({
                getRequest: () => ({
                    user: { id: 1, username: 'testeuser' },
                }),
            }),
        } as ExecutionContext
    })

    it('O teste precisa retornar true e o usuário é definido como autenticado', async () => {
        const superCanActivate = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate')
        superCanActivate.mockResolvedValue(true)

        const result = await guard.canActivate(mockExecutionContext)

        expect(result).toBe(true)
        expect(requestContextService.setUser).toHaveBeenCalledWith({
            id: 1,
            username: 'testeuser',
        })
    })

    it('O teste precisa retornar falso e o usuário não é definido como autenticado', async () => {
        const superCanActivate = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate')
        superCanActivate.mockResolvedValue(false)

        const result = await guard.canActivate(mockExecutionContext)

        expect(result).toBe(false)
        expect(requestContextService.setUser).not.toHaveBeenCalled()
    })

    it('O teste deve lançar um erro quando super.canActivate lançar um erro.', async () => {
        const error = new Error('Autenticação falhou')
        const superCanActivate = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate')
        superCanActivate.mockRejectedValue(error)

        await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(error)
        expect(requestContextService.setUser).not.toHaveBeenCalled()
    })
})
