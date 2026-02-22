import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDTO, UpdateUserDTO, UserLisItemDTO } from './users.dto'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto'
import { paginate, paginateOutput } from '../../utils/pagination.utils'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(query?: QueryPaginationDTO) {
        const users = await this.prisma.user.findMany({
            ...paginate(query),
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        const total = await this.prisma.user.count()
        return paginateOutput<UserLisItemDTO>(users, total, query)
    }

    findById(id: string) {
        return this.prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                createdProjects: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
            },
        })
    }

    findByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email,
            },
        })
    }

    create(data: CreateUserDTO) {
        return this.prisma.user.create({
            data,
        })
    }

    update(id: string, data: UpdateUserDTO) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data,
        })
    }

    async remove(id: string) {
        await this.prisma.user.delete({
            where: {
                id,
            },
        })
    }
}
