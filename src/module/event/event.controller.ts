import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventRequestDto, CreateEventResponseDto } from './dto';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { AuthPayload } from 'src/util/auth.payload';
import { Auth } from 'src/decorator';

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
}
