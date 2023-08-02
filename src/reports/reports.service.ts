import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {

    // Injecting Reports Repository here
    constructor(@InjectRepository(Report) private repository: Repository<Report>){}

    create(body: CreateReportDto, user: User) {
        const report = this.repository.create(body)
        report.user = user;
        return this.repository.save(report)
    }
}
