import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { ValidateResourcesIdsInterceptor } from '../../common/interceptors/validate-resources-ids.interceptor'
import { ValidateResourcesIds } from '../../common/decorators/validate-resources-ids.decorator'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiResponse,
} from '@nestjs/swagger'
import { CommentFullDTO, CommentListItemDTO, CommentRequestDTO } from './comments.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto'
import { ApiPaginatedResponse } from '../../common/swagger/api-paginated-response'

@Controller({
    version: '1',
    path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    @ValidateResourcesIds()
    @ApiPaginatedResponse(CommentListItemDTO)
    findAllByTask(
        @Param('taskId', ParseUUIDPipe) taskId: string,
        @Query() query?: QueryPaginationDTO
    ) {
        return this.commentsService.findAllbyTask(taskId, query)
    }

    @Get(':commentId')
    @ValidateResourcesIds()
    @ApiOkResponse({ type: CommentFullDTO, description: 'Get comment by Id' })
    findById(
        @Param('taskId', ParseUUIDPipe) taskId: string,
        @Param('commentId', ParseUUIDPipe) commentId: string,
    ) {
        return this.commentsService.findById(taskId, commentId)
    }

    @Post()
    @ValidateResourcesIds()
    @ApiCreatedResponse({ type: CommentListItemDTO, description: 'Create a new comment' })
    @HttpCode(HttpStatus.CREATED)
    create(@Param('taskId', ParseUUIDPipe) taskId: string, @Body() data: CommentRequestDTO) {
        return this.commentsService.create(taskId, data)
    }

    @Put(':commentId')
    @ValidateResourcesIds()
    @ApiOkResponse({ type: CommentListItemDTO, description: 'Update a comment' })
    @HttpCode(HttpStatus.OK)
    update(
        @Param('taskId', ParseUUIDPipe) taskId: string,
        @Param('commentId', ParseUUIDPipe) commentId: string,
        @Body() data: CommentRequestDTO,
    ) {
        return this.commentsService.update(taskId, commentId, data)
    }

    @Delete(':commentId')
    @ValidateResourcesIds()
    @ApiNoContentResponse({ description: 'Delete a comment' })
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('taskId', ParseUUIDPipe) taskId: string,
        @Param('commentId', ParseUUIDPipe) commentId: string,
    ) {
        return this.commentsService.remove(taskId, commentId)
    }
}
