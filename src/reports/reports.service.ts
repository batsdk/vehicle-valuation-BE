import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {

    // Injecting Reports Repository here
    constructor(@InjectRepository(Report) private repository: Repository<Report>){}

    create(body: CreateReportDto) {
        const report = this.repository.create(body)
        return this.repository.save(report)
    }
}
