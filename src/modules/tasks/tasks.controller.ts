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
import { TasksService } from './tasks.service'
import { ValidateResourcesIdsInterceptor } from '../../common/interceptors/validate-resources-ids.interceptor'
import { ValidateResourcesIds } from '../../common/decorators/validate-resources-ids.decorator'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
} from '@nestjs/swagger'
import { ApiPaginatedResponse } from '../../common/swagger/api-paginated-response'
import { TaskFullDTO, TaskListItemDTO, TaskRequestDTO } from './tasks.dto'
import { QueryPaginationDTO } from '../../common/dtos/query-pagination.dto'

@Controller({
    version: '1',
    // é um padrão de RestAPI
    path: 'projects/:projectId/tasks',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @ValidateResourcesIds()
    @ApiPaginatedResponse(TaskListItemDTO)
    findAllByProject(
        @Param('projectId', ParseUUIDPipe) projectId: string,
        @Query() query?: QueryPaginationDTO,
    ) {
        return this.tasksService.findAllByProject(projectId, query)
    }

    @Post()
    @ValidateResourcesIds()
    @ApiCreatedResponse({ type: TaskListItemDTO })
    @HttpCode(HttpStatus.CREATED)
    create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskRequestDTO) {
        return this.tasksService.create(projectId, data)
    }

    @Get(':taskId')
    @ValidateResourcesIds()
    @ApiOkResponse({ type: TaskFullDTO })
    findByTaskId(
        @Param('projectId', ParseUUIDPipe) projectId: string,
        @Param('taskId', ParseUUIDPipe) taskId: string,
    ) {
        return this.tasksService.findById(projectId, taskId)
    }

    @Put(':taskId')
    @ValidateResourcesIds()
    @ApiOkResponse({ type: TaskListItemDTO })
    @HttpCode(HttpStatus.OK)
    update(
        @Param('projectId', ParseUUIDPipe) projectId: string,
        @Param('taskId', ParseUUIDPipe) taskId: string,
        @Body() data: TaskRequestDTO,
    ) {
        return this.tasksService.update(projectId, taskId, data)
    }

    @Delete(':taskId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ValidateResourcesIds()
    @ApiNoContentResponse({ description: 'Task deleted successfully' })
    remove(
        @Param('projectId', ParseUUIDPipe) projectId: string,
        @Param('taskId', ParseUUIDPipe) taskId: string,
    ) {
        return this.tasksService.delete(projectId, taskId)
    }
}
