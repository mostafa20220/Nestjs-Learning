import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role: Prisma.EnumRoleFilter) {
    return await this.databaseService.employee.findMany(
      role && { where: { role } },
    );
  }

  async findOne(id: number) {
    const user = await this.databaseService.employee.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`Employee with ID ${id} not found`);
    return user;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    await this.findOne(id);
    return await this.databaseService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.databaseService.employee.delete({
      where: { id },
    });
  }
}
