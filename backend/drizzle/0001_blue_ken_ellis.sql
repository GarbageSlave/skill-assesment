CREATE TABLE `images` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned,
	`cat_id` varchar(255) NOT NULL,
	`url` varchar(255) NOT NULL,
	`width` int,
	`height` int,
	`elo` int DEFAULT 1000,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;