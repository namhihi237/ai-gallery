import { SetMetadata } from '@nestjs/common';

// usage: @CustomMessage('message...')
export const CustomMessage = (message: string) =>
  SetMetadata('customMessage', message);
