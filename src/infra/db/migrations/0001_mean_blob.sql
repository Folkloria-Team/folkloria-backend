CREATE TABLE `provinces` (
	`id` char(36) NOT NULL,
	`name` char(100) NOT NULL,
	`code` char(10) NOT NULL,
	CONSTRAINT `provinces_id` PRIMARY KEY(`id`),
	CONSTRAINT `provinces_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `story` (
	`id` char(36) NOT NULL,
	`province_id` char(36) NOT NULL,
	`title` char(255) NOT NULL,
	`sinopsis` text NOT NULL,
	`content` text NOT NULL,
	`cover` char(255) NOT NULL,
	CONSTRAINT `story_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `story` ADD CONSTRAINT `story_province_id_provinces_id_fk` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE cascade ON UPDATE no action;