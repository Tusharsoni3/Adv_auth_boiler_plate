import { pgTable, uuid, text, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(), 
  name: text('name').notNull().unique(),
  
  role: roleEnum('role').default('user'),
  isVerified: boolean('is_verified').default(false),
  
  // OAuth Fields
  provider: text('provider').default('email'), // 'email', 'google'
  providerId: text('provider_id'), // Google's User ID
  
  // 2FA Fields
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
  twoFactorSecret: text('two_factor_secret'), // Encrypted secret
  tfA_expiresAT : timestamp("2FA_expires_at"),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});



// Email Verification Codes
export const emailVerificationCodes = pgTable('email_verification_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  code: text('code').notNull(), 
  expiresAt: timestamp('expires_at').notNull(),
});

// Password reset 
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tokenHash: text('token_hash'), // Hashed for security
  expiresAt: timestamp('expires_at'),
});