import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['Admin', 'Manager', 'User']),
  avatar: z.string().url().optional().or(z.literal('')),
  createdAt: z.string(),
  lastActive: z.string(),
  status: z.enum(['active', 'inactive']),
});

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  role: z.enum(['Admin', 'Manager', 'User']),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const ActivitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  action: z.enum(['Login', 'View', 'Edit', 'Delete', 'Create', 'Export']),
  target: z.string(),
  timestamp: z.string(),
});

export const AnalyticsDataSchema = z.object({
  date: z.string(),
  revenue: z.number(),
  visitors: z.number(),
  sessions: z.number(),
  conversions: z.number(),
});

export type UserInput = z.infer<typeof CreateUserSchema>;
export type UserUpdateInput = z.infer<typeof UpdateUserSchema>;
