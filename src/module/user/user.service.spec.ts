import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from '../../entity';
import { JwtHelper } from '../../helper/jwt.helper';
import {
  LoginRequestDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { DateHelper } from '../../helper';
import { BadRequestException, NotFoundException } from '../../exception';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let jwtHelper: JwtHelper;
  let dateHelper: DateHelper;

  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        JwtHelper,
        DateHelper,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    jwtHelper = module.get<JwtHelper>(JwtHelper);
    dateHelper = module.get<DateHelper>(DateHelper);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const registerRequestDto: RegisterRequestDto = {
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'password123',
        nickname: 'Test User',
        role: 'ROLE_USER',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(undefined);
      jest.spyOn(roleRepository, 'findOneBy').mockResolvedValueOnce({
        id: 1,
        name: 'ROLE_USER',
        created_at: new Date(),
        updated_at: new Date(),
        users: null,
      });
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'hashedpassword',
        nickname: 'Test User',
        role: 'ROLE_USER',
        created_at: new Date(),
        updated_at: new Date(),
        events: null,
      });
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'hashedpassword',
        nickname: 'Test User',
        role: 'ROLE_USER',
        created_at: new Date(),
        updated_at: new Date(),
        events: null,
      });
      jest.spyOn(jwtHelper, 'generateToken').mockResolvedValueOnce('testtoken');
      const expected: RegisterResponseDto = {
        data: {
          user: {
            id: 1,
            username: 'testuser',
            email: 'testuser@test.com',
            nickname: 'Test User',
            role: 'ROLE_USER',
            accessToken: 'testtoken',
          },
        },
      };

      const result = await userService.registerUser(registerRequestDto);
      expect(result).toEqual(expected);
    });

    it('should throw a BadRequestException if user already exists', async () => {
      const registerRequestDto: RegisterRequestDto = {
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'password123',
        nickname: 'Test User',
        role: 'ROLE_USER',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'hashedpassword',
        nickname: 'Test User',
        role: 'ROLE_USER',
        created_at: new Date(),
        updated_at: new Date(),
        events: null,
      });

      await expect(
        userService.registerUser(registerRequestDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if role does not exists', async () => {
      const registerRequestDto: RegisterRequestDto = {
        username: 'testuser',
        email: 'testuser@test.com',
        password: 'password123',
        nickname: 'Test User',
        role: 'INVALID_ROLE',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(undefined);
      jest.spyOn(roleRepository, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(
        userService.registerUser(registerRequestDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('loginUser', () => {
    it('should login user with valid credentials', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'testuser';
      user.email = 'testuser@example.com';
      user.nickname = 'Test User';
      user.password = await bcrypt.hash('password', 10);
      user.role = 'ROLE_USER';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const loginRequestDto = new LoginRequestDto();
      loginRequestDto.username = 'testuser';
      loginRequestDto.password = 'password';
      const result = await userService.loginUser(loginRequestDto);

      expect(result).toEqual({
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            nickname: user.nickname,
            role: user.role,
            accessToken: expect.any(String),
          },
        },
      });
    });
    it('should throw a NotFoundException when provided with an invalid username', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);
      const loginRequestDto = new LoginRequestDto();
      loginRequestDto.username = 'invaliduser';
      loginRequestDto.password = 'password';
      await expect(userService.loginUser(loginRequestDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw a BadRequestException when provided with invalid credentials', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'testuser';
      user.email = 'testuser@example.com';
      user.nickname = 'Test User';
      user.password = await bcrypt.hash('password', 10);
      user.role = 'ROLE_USER';
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);
      const loginRequestDto = new LoginRequestDto();
      loginRequestDto.username = 'testuser';
      loginRequestDto.password = 'invalidpassword';
      await expect(userService.loginUser(loginRequestDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
