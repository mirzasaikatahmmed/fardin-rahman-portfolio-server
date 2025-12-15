import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactMessageRepository: Repository<ContactMessage>,
  ) {}

  async create(createContactMessageDto: CreateContactMessageDto): Promise<ContactMessage> {
    const message = this.contactMessageRepository.create(createContactMessageDto);
    return await this.contactMessageRepository.save(message);
  }

  async findAll(): Promise<ContactMessage[]> {
    return await this.contactMessageRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.contactMessageRepository.findOne({ where: { id } });
    
    if (!message) {
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    }
    
    return message;
  }

  async markAsRead(id: string): Promise<ContactMessage> {
    const message = await this.findOne(id);
    message.isRead = true;
    message.readAt = new Date();
    return await this.contactMessageRepository.save(message);
  }

  async updateStatus(id: string, status: string): Promise<ContactMessage> {
    const message = await this.findOne(id);
    message.status = status;
    return await this.contactMessageRepository.save(message);
  }

  async remove(id: string): Promise<void> {
    const message = await this.findOne(id);
    await this.contactMessageRepository.remove(message);
  }

  async getUnreadCount(): Promise<number> {
    return await this.contactMessageRepository.count({
      where: { isRead: false },
    });
  }
}
