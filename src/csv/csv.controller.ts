// src/csv/csv.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CsvService } from './csv.service';
import { getCsvFileName } from 'lib/common/utils/get-csv-file-name.util';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get('generate')
  async generateCsv(@Res() res: Response) {
    const csvFilePath = await this.csvService.generateCsv();
    const csvFileName = getCsvFileName();

    res.download(csvFilePath, csvFileName, (err) => {
      if (err) {
        res.status(500).send('Could not download the file.');
      }
    });
  }
}
