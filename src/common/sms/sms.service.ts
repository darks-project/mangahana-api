import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SMS {
  constructor(private configService: ConfigService) {}

  private apiKey =  this.configService.get<string>('SMS_API_KEY');
  private baseUrl = 'https://api.mobizon.kz';

  private async post(path: string, body: any): Promise<Response> {
    const req = await fetch(
      this.baseUrl + path + '?apiKey=' + this.apiKey,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      },
    );

    return req;
  }

  async Send(recipient: string, text: string): Promise<boolean> {
    const body = new URLSearchParams({
      recipient: '7' + recipient,
      text: text,
    }).toString();

    const req = await this.post('/service/Message/SendSmsMessage', body);
    const res = await req.json();

    if (res.code === 0) {
      return true;
    }

    return false;
  }
}