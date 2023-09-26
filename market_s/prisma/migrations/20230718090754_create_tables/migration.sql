-- CreateTable
CREATE TABLE "categorys" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supcategorys" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "category_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "supcategorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "price" INTEGER NOT NULL,
    "description" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'sale',
    "supcategory_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorys_title_key" ON "categorys"("title") WHERE "deleted_at" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "supcategorys_title_key" ON "supcategorys"("title") WHERE "deleted_at" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title") WHERE "deleted_at" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_user_id_product_id_key" ON "orders"("user_id", "product_id") WHERE "deleted_at" IS NULL;

-- AddForeignKey
ALTER TABLE "supcategorys" ADD CONSTRAINT "supcategorys_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categorys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supcategory_id_fkey" FOREIGN KEY ("supcategory_id") REFERENCES "supcategorys"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
