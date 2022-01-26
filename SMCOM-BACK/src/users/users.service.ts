import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
// TODO : Store users in a database with a user entity!!!
// TODO : This is only temporary and should not be pushed to production
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Administrateur',
      password: 'admin',
      roles: ['admin', 'normal'],
      API_key: 'vayv33mljnV9F5OkdFajxhRdp',
    },
    {
      userId: 2,
      username: 'Philippe',
      password: 'user',
      roles: ['normal'],
      API_key: '5FqSgUxyKQ8WvMWBaRm2xjX0P',
    },
    {
      userId: 3,
      username: 'Pierre',
      password: 'user',
      roles: ['normal', 'operator'],
      API_key: 'UxyKQ8WvMWB5FqSgaRm2xjX0P',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
