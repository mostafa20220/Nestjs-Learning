import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'ADMIN' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'ENGINEER' },
    { id: 3, name: 'Jimp Doe', email: 'jim@example', role: 'MANAGER' },
    { id: 4, name: 'Jill Doe', email: 'jill@example', role: 'MANAGER' },
    { id: 5, name: 'Jack Doe', email: 'jack@example', role: 'ADMIN' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    if (this.findByEmail(createUserDto.email)) {
      return { message: 'Email already exists' };
    }

    this.users.push({
      id: this.users.length + 1,
      ...createUserDto,
    });

    return this.users[this.users.length - 1];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index < 0) throw new NotFoundException('User not found!');
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found!');
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
