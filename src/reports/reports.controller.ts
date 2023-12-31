import { Body, Controller,Post,Patch,Param,UseGuards, Get, Query } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/gaurds/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGaurd } from 'src/gaurds/admin.gaurd';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {

    constructor(private reportService: ReportsService){}

    @Get()
    getEstimate(@Query() query: GetEstimateDto){
        return "hi";
    }

    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User ){
        return this.reportService.create(body,user)
    }

    @Patch('/:id')
    @UseGuards(AdminGaurd)
    approveReport(@Param('id') id:string, @Body() body: ApproveReportDto ){
        return this.reportService.changeApproval(id, body.approved)
    }

}
