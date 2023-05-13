import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  EventsResponseDto,
  GetEventResponseDto,
} from './dto';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { AuthPayload } from 'src/util/auth.payload';
import { Auth, SwaggerCustomException } from 'src/decorator';
import { Event } from 'src/entity';
import { SuccessResponseDto } from 'src/common';

@Controller('events')
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    return await this.eventService.createEvent(event, auth.sub);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  ): Promise<{
    data: Event[];
    meta: { total: number; page: number; pageSize: number };
  }> {
    return await this.eventService.findEvents(page, pageSize, auth.sub);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    return await this.eventService.getEvent(eventId, auth.sub);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    return await this.eventService.deleteEvent(eventId, auth.sub);
  }
}
