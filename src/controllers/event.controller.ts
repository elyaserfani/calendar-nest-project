import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, SwaggerCustomException } from 'src/decorators';
import { SuccessResponseDto } from 'src/commons';
import {
  CreateEventResponseDto,
  CreateEventRequestDto,
  EventsResponseDto,
  GetEventResponseDto,
  UpdateEventResponseDto,
  UpdateEventRequestDto,
} from 'src/dtos/events';
import { JwtAuthGuard } from 'src/guards';
import { AuthPayload } from 'src/utils';
import { EventService } from 'src/modules/event';

@Controller('events')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create new event' })
  @ApiResponse({
    status: 201,
    description: 'Created event',
    type: [CreateEventResponseDto],
  })
  async createEvent(
    @Body() event: CreateEventRequestDto,
    @Auth() auth: AuthPayload,
  ): Promise<CreateEventResponseDto> {
    return this.eventService.createEvent(event, auth.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user events with pagination' })
  @ApiQuery({ name: 'page', type: 'number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', required: true, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'All user events with pagination',
    type: [EventsResponseDto],
  })
  async findAllWithPagination(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Auth() auth: AuthPayload,
  ): Promise<EventsResponseDto> {
    return this.eventService.findEvents(page, pageSize, auth.sub);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single event' })
  @ApiResponse({
    status: 200,
    description: 'Get single event details',
    type: [GetEventResponseDto],
  })
  @SwaggerCustomException(() => [new NotFoundException('Event not found')])
  async getEvent(
    @Param('id') eventId: number,
    @Auth() auth: AuthPayload,
  ): Promise<GetEventResponseDto> {
    return this.eventService.getEvent(eventId, auth.sub);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update single event' })
  @ApiResponse({
    status: 200,
    description: 'Update a single event',
    type: [UpdateEventResponseDto],
  })
  @SwaggerCustomException(() => [new NotFoundException('Event not found')])
  async updateEvent(
    @Param('id') eventId: number,
    @Body() event: UpdateEventRequestDto,
    @Auth() auth: AuthPayload,
  ): Promise<UpdateEventResponseDto> {
    return this.eventService.updateEvent(eventId, event, auth.sub);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete single event' })
  @ApiResponse({
    status: 200,
    description: 'Delete a single event',
    type: [SuccessResponseDto],
  })
  @SwaggerCustomException(() => [new NotFoundException('Event not found')])
  async deleteEvent(
    @Param('id') eventId: number,
    @Auth() auth: AuthPayload,
  ): Promise<SuccessResponseDto> {
    return this.eventService.deleteEvent(eventId, auth.sub);
  }
}
