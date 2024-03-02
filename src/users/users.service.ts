import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; email: string; role: string }) {
    if (this.findByEmail(user.email)) {
      return { message: 'Email already exists' };
    }

    this.users.push({
      id: this.users.length + 1,
      ...user,
    });

    return this.users[this.users.length - 1];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const user = this.users.find((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
