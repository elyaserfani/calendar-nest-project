import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from '../../entity';
import { JwtHelper } from '../../helper/jwt.helper';
import { RegisterRequestDto } from './dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let jwtHelper: JwtHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtHelper,
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    jwtHelper = module.get<JwtHelper>(JwtHelper);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('registerUser', () => {
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
      nickname: 'Test User',
      role: 'ROLE_USER',
      created_at: new Date(),
      updated_at: new Date(),
      events: null,
    };
    const mockRegisterRequestDto: RegisterRequestDto = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
      nickname: 'Test User',
      role: 'user',
    };

    it('should register a new user', async () => {});

    it('should throw a BadRequestException if user already exists', async () => {});

    it('should throw a NotFoundException if role does not exists', async () => {});
  });

  describe('loginUser', () => {
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
      nickname: 'Test User',
      role: 'ROLE_USER',
      created_at: new Date(),
      updated_at: new Date(),
      events: null,
    };

    it('should login user', async () => {});

    it('should throw a BadRequestException if credentials is invalid', async () => {});

    it('should throw a NotFoundException if user with this username not found', async () => {});
  });
});
