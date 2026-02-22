import { ApiProperty } from '@nestjs/swagger'
import { TaskPriority, TaskStatus } from '@prisma/client'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class ProjectRequestDTO {
    @ApiProperty({ description: 'Project name', required: true, minLength: 3 })
    @IsString({ message: 'O campo "name" deve ser uma string' })
    @IsNotEmpty({ message: 'O campo "name" é obrigatório' })
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    name!: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string
}

export class ProjectListItemDTO {
    @ApiProperty() id!: number
    @ApiProperty() name!: string
    @ApiProperty() description!: string
    @ApiProperty({ format: 'date-time' }) createdAt!: string
    @ApiProperty({ format: 'date-time' }) updateAt!: string
    @ApiProperty() createdById!: string
}

export class ProjectTaskDTO {
    @ApiProperty() id!: string
    @ApiProperty() title!: string
    @ApiProperty({ nullable: true, required: false }) description?: string
    @ApiProperty({
        enum: TaskStatus,
        default: TaskStatus.TODO,
    })
    status!: string
    @ApiProperty({
        enum: TaskPriority,
        default: TaskPriority.MEDIUM,
    })
    priority!: string
    @ApiProperty({ nullable: true, required: false, format: 'date-time' }) dueDate?: string
    @ApiProperty({ format: 'date-time' }) createdAt!: string
    @ApiProperty({ format: 'date-time' }) updateAt!: string
}

export class ProjectFullDTO extends ProjectListItemDTO {
    @ApiProperty({ type: [ProjectTaskDTO] }) tasks!: ProjectTaskDTO[]
}
