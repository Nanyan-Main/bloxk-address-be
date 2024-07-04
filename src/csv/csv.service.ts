import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { format } from 'fast-csv';
import { AddressService } from 'src/address/address.service';
import { CSV_FIELDS } from 'src/constant';

@Injectable()
export class CsvService {
  constructor(private readonly addressService: AddressService) {}
  async generateCsv(): Promise<string> {
    const addresses = await this.addressService.findAll();

    const csvFilePath = `data.csv`;
    const ws = fs.createWriteStream(csvFilePath);

    return new Promise((resolve, reject) => {
      const csvStream = format({ headers: CSV_FIELDS });
      csvStream
        .pipe(ws)
        .on('finish', () => {
          resolve(csvFilePath);
        })
        .on('error', (err) => {
          reject(err);
        });

      // Write each row of data to the CSV
      addresses.forEach((row) => {
        csvStream.write(row);
      });

      // End the CSV stream
      csvStream.end();
    });
  }
}
