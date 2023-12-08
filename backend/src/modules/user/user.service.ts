import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser({ email, name, image }: { email: string; name: string; image?: string }) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return await this.userModel.create({ email, name, image });
    }
    return this.userModel.findOneAndUpdate(
      { email },
      {
        name,
        image,
      },
      { new: true },
    );
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }
}
