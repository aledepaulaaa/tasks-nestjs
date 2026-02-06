// biome-ignore assist/source/organizeImports: <biome-ignore lint: false>
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Versionamento
  app.enableVersioning({
    type: VersioningType.URI
  })

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Curso de NestJs - Tasks API')
    .setDescription('API desenvolvida durante o curso de NestJs - Monaro Dev')
    .setVersion('1')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  // Validações
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
