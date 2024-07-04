import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { AddressModule } from 'src/address/address.module';

@Module({
  controllers: [CsvController],
  providers: [CsvService],
  imports: [AddressModule],
})
export class CsvModule {}
