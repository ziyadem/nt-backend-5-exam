-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_tel" VARCHAR(200) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "refresh_token" VARCHAR,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_tel_key" ON "users"("user_tel") WHERE "deleted_at" IS NULL;
