ALTER TABLE `images` DROP FOREIGN KEY `images_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `images` ADD `breeds` text;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `user_id`;