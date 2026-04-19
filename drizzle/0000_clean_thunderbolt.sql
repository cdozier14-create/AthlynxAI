CREATE TABLE `activity_log` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int,
	`eventType` varchar(64) NOT NULL,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `athlete_profiles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sport` varchar(64),
	`position` varchar(64),
	`school` varchar(128),
	`year` varchar(32),
	`gpa` float,
	`height` varchar(16),
	`weight` int,
	`hometown` varchar(128),
	`bio` text,
	`hudlUrl` text,
	`instagramUrl` text,
	`twitterUrl` text,
	`tiktokUrl` text,
	`recruitingScore` int DEFAULT 0,
	`nilValue` int DEFAULT 0,
	`transferStatus` varchar(32),
	`classYear` varchar(16),
	`state` varchar(64),
	`recruitingStatus` varchar(32),
	`followers` int DEFAULT 0,
	`coverUrl` text,
	`highlightUrl` text,
	`instagram` varchar(128),
	`twitter` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `athlete_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversation_participants` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`userId` int NOT NULL,
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversation_participants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(128),
	`isGroup` boolean NOT NULL DEFAULT false,
	`lastMessage` text,
	`lastMessageAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_contacts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`company` varchar(128),
	`role` enum('Athlete','Coach','Brand','Agent','Investor','Team') NOT NULL DEFAULT 'Athlete',
	`status` enum('Lead','Active','VIP','Churned') NOT NULL DEFAULT 'Lead',
	`notes` text,
	`lastActivity` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_pipeline` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`contactId` int NOT NULL,
	`stage` enum('New Lead','Contacted','Demo Scheduled','Proposal Sent','Closed Won','Closed Lost') NOT NULL DEFAULT 'New Lead',
	`dealValue` int DEFAULT 0,
	`assignedTo` varchar(128),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_pipeline_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`senderId` int NOT NULL,
	`content` text NOT NULL,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nil_deals` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`athleteId` int NOT NULL,
	`brandName` varchar(128) NOT NULL,
	`dealValue` int NOT NULL DEFAULT 0,
	`status` enum('pending','active','completed','declined') NOT NULL DEFAULT 'pending',
	`description` text,
	`category` varchar(64),
	`startDate` timestamp,
	`endDate` timestamp,
	`contractUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `nil_deals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` varchar(64) NOT NULL,
	`title` varchar(256) NOT NULL,
	`body` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`relatedId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `post_comments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `post_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `post_likes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `post_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`type` enum('text','highlight','training','nil_deal','game_result','transfer') NOT NULL DEFAULT 'text',
	`mediaUrl` text,
	`mediaType` varchar(16),
	`likeCount` int NOT NULL DEFAULT 0,
	`commentCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `training_logs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`workout` varchar(128) NOT NULL,
	`duration` int,
	`notes` text,
	`performance` int,
	`logDate` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `training_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transfer_portal_entries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`athleteId` int NOT NULL,
	`fromSchool` varchar(128),
	`toSchool` varchar(128),
	`status` enum('entered','committed','withdrawn') NOT NULL DEFAULT 'entered',
	`eligibilityYears` int,
	`enteredAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transfer_portal_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`openId` varchar(128),
	`name` varchar(128),
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('athlete','coach','brand','admin') NOT NULL DEFAULT 'athlete',
	`sport` varchar(64),
	`school` varchar(128),
	`year` varchar(32),
	`bio` text,
	`avatarUrl` text,
	`phone` varchar(20),
	`trialEndsAt` timestamp,
	`phoneVerified` boolean NOT NULL DEFAULT false,
	`passwordHash` varchar(255),
	`stripeCustomerId` varchar(128),
	`stripeSubscriptionId` varchar(128),
	`stripePlanId` varchar(128),
	`credits` int NOT NULL DEFAULT 0,
	`lastSignedIn` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `verification_codes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`code` varchar(10) NOT NULL,
	`type` enum('signup','login','password_reset') NOT NULL DEFAULT 'signup',
	`verified` boolean NOT NULL DEFAULT false,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `waitlist` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(128),
	`sport` varchar(64),
	`school` varchar(128),
	`phone` varchar(20),
	`role` varchar(64),
	`signedUpAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `waitlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `waitlist_email_unique` UNIQUE(`email`)
);
