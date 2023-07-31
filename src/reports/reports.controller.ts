import { Body, Controller,Post,UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/gaurds/auth.guard';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {

    constructor(private reportService: ReportsService){}

    @Post()
    createReport(@Body() body: CreateReportDto ){
        return this.reportService.create(body)
    }


}
