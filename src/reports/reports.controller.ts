import { Body, Controller,Post,UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/gaurds/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {

    constructor(private reportService: ReportsService){}

    @Post()
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User ){
        return this.reportService.create(body,user)
    }

}
