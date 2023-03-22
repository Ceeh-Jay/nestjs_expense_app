import { ReportType } from './data';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { data } from 'src/data';
import {AppService} from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(
    private readonly appService: AppService
  ){}
  @Get()
  getAllReport(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body()
    {
      source,
      amount,
    }: {
      source: string;
      amount: number;
    },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, {amount, source})
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body()
    body: {
      source: string;
      amount: number;
    },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

      return this.appService.updateReport(reportType, id, body)
    
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id : string
  ) {
    return this.appService.deleteReport(id);
  }
}