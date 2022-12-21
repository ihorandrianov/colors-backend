import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColorsController } from './colors/colors.controller';
import { ColorsService } from './colors/colors.service';
import { ColorsModule } from './colors/colors.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ColorsModule, PrismaModule],
  controllers: [AppController, ColorsController],
  providers: [AppService, ColorsService],
})
export class AppModule {}
