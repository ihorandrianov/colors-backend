import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async getAllColors(page: number, limit: number, group: string) {
    if (group) {
      return await this.prisma.color.findMany({
        where: {
          colorGroup: group,
        },
        skip: page * limit,
        take: limit,
      });
    }
    return await this.prisma.color.findMany({
      skip: page * limit,
      take: limit,
    });
  }

  async pagesCount(group: string) {
    if (group) {
      return await this.prisma.color.count({
        where: {
          colorGroup: {
            search: group,
          },
        },
      });
    }
    return await this.prisma.color.count();
  }

  async getItemsByColor(color: string) {
    return await this.prisma.color.findMany({
      where: {
        colorGroup: color,
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.color.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async searchColor(page: number, limit: number, query: string) {
    return await this.prisma.color.findMany({
      skip: page * limit,
      take: limit,
      where: {
        hex: {
          contains: query,
        },
      },
    });
  }
}
