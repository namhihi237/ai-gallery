import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    const { cloudName, apiKey, apiSecret } = this.configService.get('cloudinary');

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  generatePresignedUrl() {
    const { cloudName, apiSecret, apiKey } = this.configService.get('cloudinary');
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp }, apiSecret);
    return `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&signature=${signature}&timestamp=${timestamp}`;
  }

  async uploadFile(file: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path);

    return result.secure_url;
  }
}
