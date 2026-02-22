import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { authorAttributes } from '../../consts'
import { CommentListItemDTO, CommentRequestDTO } from './comments.dto'
import { RequestContextService } from '../../common/services/request-context.service'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto'
import { paginate, paginateOutput } from '../../utils/pagination.utils'

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly requestContext: RequestContextService,
    ) {}

    async findAllbyTask(taskId: string, query?: QueryPaginationDTO) {
        const comments = await this.prisma.comment.findMany({
            ...paginate(query),
            where: { taskId },
            include: authorAttributes,
        })

        const total = await this.prisma.comment.count({
            where: { taskId },
        })

        return paginateOutput<CommentListItemDTO>(comments, total, query)
    }

    findById(taskId: string, commentId: string) {
        return this.prisma.comment.findFirst({
            where: {
                id: commentId,
                taskId,
            },
            include: authorAttributes,
        })
    }

    create(taskId: string, data: CommentRequestDTO) {
        const userId = this.requestContext.getUserId()
        return this.prisma.comment.create({
            data: {
                content: data.content,
                taskId,
                authorId: userId,
            },
            include: authorAttributes,
        })
    }

    async update(taskId: string, commentId: string, data: CommentRequestDTO) {
        const userId = this.requestContext.getUserId()
        const existingComment = await this.prisma.comment.findFirst({
            where: {
                id: commentId,
                taskId,
                authorId: userId,
            },
        })

        if (!existingComment) {
            throw new NotFoundException('Comentário não encontrado')
        }

        return this.prisma.comment.update({
            where: { id: commentId },
            data,
            include: authorAttributes,
        })
    }

    async remove(taskId: string, commentId: string) {
        const userId = this.requestContext.getUserId()
        const existingComment = await this.prisma.comment.findFirst({
            where: {
                id: commentId,
                taskId,
                authorId: userId,
            },
        })

        if (!existingComment) {
            throw new NotFoundException('Comentário não encontrado')
        }

        await this.prisma.comment.delete({
            where: { id: commentId },
        })
    }
}
