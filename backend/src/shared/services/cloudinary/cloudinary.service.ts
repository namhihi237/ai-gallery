import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const { cloudName, apiKey, apiSecret } = this.configService.get('cloudinary');
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  generatePresignedUrl(): string {
    const { cloudName, apiKey } = this.configService.get('cloudinary');
    const timestamp = new Date().getTime();
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      apiKey,
    );

    return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&timestamp=${timestamp}&signature=${signature}`;
  }
}
