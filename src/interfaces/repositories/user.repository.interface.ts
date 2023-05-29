import { IUser } from 'src/modules/user';

export interface IUserRepository {
  findByUsername(username: string): Promise<IUser | undefined>;
  createUser(userData: Partial<IUser>): Promise<IUser>;
  findUserWithRolesAndPermissions(userId: number): Promise<IUser | undefined>;
}
