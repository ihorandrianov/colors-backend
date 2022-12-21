import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ColorsService, PrismaService],
  controllers: [ColorsController],
})
export class ColorsModule {}
