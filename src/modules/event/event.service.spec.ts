import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Event } from 'src/entities';
import { JwtHelper, DateHelper } from 'src/utils';
import { CreateEventRequestDto, UpdateEventRequestDto } from 'src/dtos/events';
import { EventRepository } from '../database/event.repository';
import { EventService } from './event.service';
import { NotFoundException } from 'src/exceptions';

describe('EventsService', () => {
  let eventService: EventService;
  let eventRepository: EventRepository;
  let jwtHelper: JwtHelper;
  let dateHelper: DateHelper;
  beforeEach(async () => {
    dotenv.config();
    const module: TestingModule = await Test.createTestingModule({
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
  describe('findEvents', () => {
    it('should return the events response with correct data and meta', async () => {
      const page = 1;
      const pageSize = 10;
      const userId = 123;
      const eventData = [
        {
          id: 1,
          title: 'Event 1',
          description: 'Description 1',
          due_date: new Date(),
          user: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          title: 'Event 2',
          description: 'Description 2',
          due_date: new Date(),
          user: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      const total = 2;
      jest
        .spyOn(eventRepository, 'pagination')
        .mockResolvedValue([eventData, total]);
      const response = await eventService.findEvents(page, pageSize, userId);
      expect(eventRepository.pagination).toHaveBeenCalledWith(
        userId,
        page,
        pageSize,
      );
      expect(response).toEqual({
        data: eventData,
        meta: {
          total: total,
          page: page,
          pageSize: eventData.length,
        },
      });
    });
  });

  describe('getEvent', () => {
    it('should return the event response when it exists', async () => {
      const eventId = 1;
      const userId = 123;
      const event = {
        id: eventId,
        title: 'Event 1',
        description: 'Description 1',
        due_date: new Date(),
        user: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(eventRepository, 'checkEventOwnership')
        .mockResolvedValue(event);
      const response = await eventService.getEvent(eventId, userId);
      expect(eventRepository.checkEventOwnership).toHaveBeenCalledWith(
        eventId,
        userId,
      );
      expect(response).toEqual({
        data: {
          event: event,
        },
      });
    });
    it('should throw NotFoundException when event does not exist', async () => {
      const eventId = 1;
      const userId = 123;
      jest
        .spyOn(eventRepository, 'checkEventOwnership')
        .mockResolvedValue(null);
      await expect(eventService.getEvent(eventId, userId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('updateEvent', () => {
    it('should update the event and return the updated event response when it exists', async () => {
      const eventId = 1;
      const userId = 123;
      const updateEventRequestDto: UpdateEventRequestDto = {
        title: 'Updated Event',
        description: 'Updated Description',
        due_date: new Date(),
      };
      const event = {
        id: eventId,
        title: 'Event 1',
        description: 'Description 1',
        due_date: new Date(),
        user: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const updatedEvent = {
        ...event,
        ...updateEventRequestDto,
        updated_at: new Date(),
      };
      jest
        .spyOn(eventRepository, 'checkEventOwnership')
        .mockResolvedValue(event);
      jest.spyOn(eventRepository, 'updateEvent').mockResolvedValue(undefined);
      jest.spyOn(eventRepository, 'findById').mockResolvedValue(updatedEvent);

      const response = await eventService.updateEvent(
        eventId,
        updateEventRequestDto,
        userId,
      );
      expect(eventRepository.checkEventOwnership).toHaveBeenCalledWith(
        eventId,
        userId,
      );
      expect(eventRepository.updateEvent).toHaveBeenCalledWith(eventId, {
        title: updateEventRequestDto.title,
        description: updateEventRequestDto.description,
        due_date: updateEventRequestDto.due_date,
        updated_at: expect.any(Date),
      });
      expect(eventRepository.findById).toHaveBeenCalledWith(eventId);
      expect(response).toEqual({
        data: {
          event: {
            id: updatedEvent.id,
            title: updatedEvent.title,
            description: updatedEvent.description,
            due_date: updatedEvent.due_date,
            created_at: updatedEvent.created_at,
            updated_at: updatedEvent.updated_at,
          },
        },
      });
    });

    it('should throw NotFoundException when event does not exist', async () => {
      const eventId = 1;
      const userId = 123;
      const updateEventRequestDto: UpdateEventRequestDto = {
        title: 'Updated Event',
        description: 'Updated Description',
        due_date: new Date(),
      };
      jest
        .spyOn(eventRepository, 'checkEventOwnership')
        .mockResolvedValue(null);
      await expect(
        eventService.updateEvent(eventId, updateEventRequestDto, userId),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteEvent', () => {
    it('should delete the event and return a success response when it exists', async () => {
      const eventId = 1;
      const userId = 123;
      const event = {
        id: eventId,
        title: 'Event 1',
        description: 'Description 1',
        due_date: new Date(),
        user: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(eventRepository, 'checkEventOwnership')
        .mockResolvedValue(event);
      jest.spyOn(eventRepository, 'deleteEvent').mockResolvedValue(undefined);

      const response = await eventService.deleteEvent(eventId, userId);
      expect(eventRepository.checkEventOwnership).toHaveBeenCalledWith(
        eventId,
        userId,
      );
      expect(eventRepository.deleteEvent).toHaveBeenCalledWith(eventId);
      expect(response).toEqual({
        data: {
          result: { success: true },
        },
      });
    });

    it('should throw NotFoundException when event does not exist', async () => {
      const eventId = 1;
      const userId = 123;
      jest
        .spyOn(eventRepository, 'checkEventOwnership')
        .mockResolvedValue(null);
      await expect(
        eventService.deleteEvent(eventId, userId),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
