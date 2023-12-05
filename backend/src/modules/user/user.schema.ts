import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.User })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
