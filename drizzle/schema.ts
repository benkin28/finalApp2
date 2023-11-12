import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  date,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);

export const test = pgTable("test", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 30 }),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 30 }).notNull(),
  description: varchar("description", { length: 60 }).notNull(),
  creationdate: date("creationdate").notNull(),
  ispending: boolean("ispending").notNull(),
});

export const test2 = pgTable("test2", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 30 }).notNull(),
  description: varchar("description", { length: 60 }).notNull(),
  creationdate: date("creationdate").notNull(),
  ispending: boolean("ispending").notNull(),
});

export type ToDo = typeof todos.$inferSelect;
