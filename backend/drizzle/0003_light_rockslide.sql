ALTER TABLE `images` MODIFY COLUMN `breeds` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `width`;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `height`;