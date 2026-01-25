import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Lead {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name?: string;

  @Prop({ default: false })
  subscribed: boolean;

  @Prop()
  source?: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);

// Transform _id to id for GraphQL compatibility
LeadSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LeadSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
