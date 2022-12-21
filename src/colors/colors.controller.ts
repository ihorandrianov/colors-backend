import { Controller, Get, Param, Query } from '@nestjs/common';
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @Get()
  async getAllColors(
    @Query('group') group: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return await this.colorsService.getAllColors(
      Number(page),
      Number(limit),
      group,
    );
  }

  @Get('count')
  async getPagesCount(@Query('group') group: string) {
    return await this.colorsService.pagesCount(group);
  }

  @Get('search')
  async searchColor(
    @Query('color') color: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return await this.colorsService.searchColor(
      Number(page),
      Number(limit),
      color,
    );
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.colorsService.getById(id);
  }
}
