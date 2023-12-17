import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';

@Module({
  providers: [InteractionService],
  controllers: [InteractionController],
})
export class InteractionModule {}
