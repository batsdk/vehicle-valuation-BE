import { IsBoolean } from 'class-validator';

IsBoolean;

export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}
