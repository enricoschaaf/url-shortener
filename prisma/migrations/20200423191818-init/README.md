# Migration `20200423191818-init`

This migration has been generated at 4/23/2020, 7:18:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Url" (
    "id" text  NOT NULL ,
    "longUrl" text  NOT NULL ,
    "slug" text  NOT NULL ,
    PRIMARY KEY ("id")
) 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200423191818-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,14 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Url {
+  id      String @default(cuid()) @id
+  slug    String
+  longUrl String
+}
```


