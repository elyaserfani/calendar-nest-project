import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Event } from 'src/entities';
import { JwtHelper, DateHelper } from 'src/utils';
import { CreateEventRequestDto, CreateEventResponseDto } from 'src/dtos/events';
import { UtilityModule } from '../utility';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

describe('EventsService', () => {
  let eventService: EventService;
  let eventRepository: EventRepository;
  let jwtHelper: JwtHelper;
  let dateHelper: DateHelper;
  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilityModule],
      providers: [
        EventService,
        EventRepository,
        JwtService,
        JwtHelper,
        DateHelper,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
      ],
    }).compile();

    eventService = module.get<EventService>(EventService);
    eventRepository = module.get<EventRepository>(EventRepository);
    jwtHelper = module.get<JwtHelper>(JwtHelper);
    dateHelper = module.get<DateHelper>(DateHelper);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createEvent', () => {
    it('should create an event and return the response', async () => {
      const createEventRequestDto: CreateEventRequestDto = {
        title: 'Event title',
        description: 'Event description',
        due_date: new Date(),
      };
      const userId = 123;
      const savedEvent = {
        id: 1,
        title: 'Test Event',
        description: 'Test Description',
        due_date: new Date(),
        user: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest.spyOn(eventRepository, 'createEvent').mockResolvedValue(savedEvent);
      const response = await eventService.createEvent(
        createEventRequestDto,
        userId,
      );
      expect(eventRepository.createEvent).toHaveBeenCalledWith(
        createEventRequestDto,
        userId,
      );
      expect(response).toEqual({
        data: {
          event: {
            id: savedEvent.id,
            title: savedEvent.title,
            description: savedEvent.description,
            due_date: savedEvent.due_date,
          },
        },
      });
    });
  });
});
