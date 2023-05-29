import { User } from 'src/entities';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>;
  createUser(userData: Partial<User>): Promise<User>;
  findUserWithRolesAndPermissions(userId: number): Promise<User | undefined>;
}
