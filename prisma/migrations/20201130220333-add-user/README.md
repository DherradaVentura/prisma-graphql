# Migration `20201130220333-add-user`

This migration has been generated by Diego Herrada at 11/30/2020, 5:03:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Post" ADD COLUMN     "authorId" INTEGER

CREATE TABLE "User" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

ALTER TABLE "Post" ADD FOREIGN KEY("authorId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201130215031-init..20201130220333-add-user
--- datamodel.dml
+++ datamodel.dml
@@ -2,17 +2,26 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Post {
-  id        Int     @default(autoincrement()) @id
+  id        Int     @id @default(autoincrement())
   title     String
   content   String?
   published Boolean @default(false)
-}
+  author    User?   @relation(fields: [authorId], references: [id])
+  authorId  Int?
+}
+
+model User {
+  id    Int    @id @default(autoincrement())
+  email String @unique
+  name  String
+  posts Post[]
+}
```

