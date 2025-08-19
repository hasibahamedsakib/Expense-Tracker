import mongoose from 'mongoose';
import { Blog } from '@/types';

const BlogSchema = new mongoose.Schema<Blog>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Education',
      'Travel',
      'Groceries',
      'Personal Care',
      'Other'
    ]
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  url: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better search performance
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

export default mongoose.models.Blog || mongoose.model<Blog>('Blog', BlogSchema);
