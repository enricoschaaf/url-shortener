# Migration `20200423192318-add-unique-keyword-to-slug-and-long-url`

This migration has been generated at 4/23/2020, 7:23:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Url.slug" ON "public"."Url"("slug")

CREATE UNIQUE INDEX "Url.longUrl" ON "public"."Url"("longUrl")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200423191818-init..20200423192318-add-unique-keyword-to-slug-and-long-url
--- datamodel.dml
+++ datamodel.dml
@@ -1,14 +1,14 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Url {
   id      String @default(cuid()) @id
-  slug    String
-  longUrl String
+  slug    String @unique
+  longUrl String @unique
 }
```


