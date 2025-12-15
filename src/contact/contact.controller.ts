import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a contact message' })
  @ApiResponse({ status: 201, description: 'Contact message created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createContactMessageDto: CreateContactMessageDto) {
    return this.contactService.create(createContactMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contact messages' })
  @ApiResponse({ status: 200, description: 'List of contact messages' })
  findAll() {
    return this.contactService.findAll();
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get count of unread messages' })
  @ApiResponse({ status: 200, description: 'Unread count' })
  getUnreadCount() {
    return this.contactService.getUnreadCount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact message by ID' })
  @ApiParam({ name: 'id', description: 'Contact message UUID' })
  @ApiResponse({ status: 200, description: 'Contact message found' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiParam({ name: 'id', description: 'Contact message UUID' })
  @ApiResponse({ status: 200, description: 'Message marked as read' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.markAsRead(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update message status' })
  @ApiParam({ name: 'id', description: 'Contact message UUID' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string', example: 'read' } } } })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: string,
  ) {
    return this.contactService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact message' })
  @ApiParam({ name: 'id', description: 'Contact message UUID' })
  @ApiResponse({ status: 200, description: 'Contact message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contact message not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.remove(id);
  }
}
