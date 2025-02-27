import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class KeepAliveService {
  private readonly logger = new Logger(KeepAliveService.name);

  // A cada 5 minutos (*/5 * * * *)
  @Cron('*/5 * * * *')
  async handleKeepAlive() {
    try {
      await axios.get('https://debt-management-app-zevh.onrender.com/ping');
      this.logger.log('Ping enviado para manter a API ativa');
    } catch (error) {
      this.logger.error('Falha ao pingar a API', error.message);
    }
  }
}
