import { Controller } from '@nestjs/common';
import { ServicesService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private services: ServicesService) {}
}
