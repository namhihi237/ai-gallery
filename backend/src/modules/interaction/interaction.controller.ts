import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';
import { User } from '../user/user.schema';
import { AuthGuard } from '../../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('interaction')
export class InteractionController {
  constructor(private interactionService: InteractionService) {}

  @Post()
  @HttpCode(201)
  async like(@CurrentUser() currentUser: User & { _id: string }, @Body() imageID: string) {
    return this.interactionService.like(imageID, currentUser._id);
  }
}
