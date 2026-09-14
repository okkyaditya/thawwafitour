import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`packages_itinerary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`desc\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_itinerary_order_idx\` ON \`packages_itinerary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_itinerary_parent_id_idx\` ON \`packages_itinerary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_included\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_included_order_idx\` ON \`packages_included\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_included_parent_id_idx\` ON \`packages_included\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_excluded\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_excluded_order_idx\` ON \`packages_excluded\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`packages_excluded_parent_id_idx\` ON \`packages_excluded\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`packages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`cover_image_id\` integer,
  	\`cover_image_url\` text,
  	\`tagline\` text,
  	\`price\` numeric NOT NULL,
  	\`price_note\` text DEFAULT 'harga per orang, twin share',
  	\`badge\` text DEFAULT 'none',
  	\`promo_label\` text,
  	\`status\` text DEFAULT 'active' NOT NULL,
  	\`featured\` integer DEFAULT false,
  	\`depart_date\` text NOT NULL,
  	\`duration\` text NOT NULL,
  	\`airline\` text NOT NULL,
  	\`flight\` text,
  	\`hotel_makkah_name\` text NOT NULL,
  	\`hotel_makkah_stars\` text DEFAULT '3' NOT NULL,
  	\`hotel_makkah_distance\` text NOT NULL,
  	\`hotel_madinah_name\` text NOT NULL,
  	\`hotel_madinah_stars\` text DEFAULT '3' NOT NULL,
  	\`hotel_madinah_distance\` text NOT NULL,
  	\`haramain\` integer DEFAULT false,
  	\`thaif\` integer DEFAULT false,
  	\`seats_total\` numeric NOT NULL,
  	\`seats_left\` numeric NOT NULL,
  	\`visa\` text DEFAULT 'Visa Umrah',
  	\`group\` text,
  	\`ustadz_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ustadz_id\`) REFERENCES \`ustadz\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_cover_image_idx\` ON \`packages\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_ustadz_idx\` ON \`packages\` (\`ustadz_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_updated_at_idx\` ON \`packages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`packages_created_at_idx\` ON \`packages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_related_categories\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_related_categories_order_idx\` ON \`posts_related_categories\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_related_categories_parent_idx\` ON \`posts_related_categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`read_time\` numeric NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ustadz\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`focus\` text NOT NULL,
  	\`initials\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`ustadz_updated_at_idx\` ON \`ustadz\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ustadz_created_at_idx\` ON \`ustadz\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`initials\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`gallery\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`art\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`gallery_updated_at_idx\` ON \`gallery\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_created_at_idx\` ON \`gallery\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`wa_number\` text DEFAULT '6285121008442' NOT NULL,
  	\`wa_display\` text DEFAULT '+62 851-2100-8442' NOT NULL,
  	\`email\` text DEFAULT 'info@thawwafi.com' NOT NULL,
  	\`instagram\` text DEFAULT '@thawwafi.tour' NOT NULL,
  	\`instagram_url\` text DEFAULT 'https://instagram.com/thawwafi.tour' NOT NULL,
  	\`legal_name\` text DEFAULT 'PT Noor Barkatul Haromain' NOT NULL,
  	\`ppiu\` text DEFAULT '12690001206830002' NOT NULL,
  	\`addr_legal\` text DEFAULT 'Ruko Market City Pondok Cabe Blok C2 No. 2, Jalan Pondok Cabe Raya, Pamulang, Tangerang Selatan',
  	\`addr_ops\` text DEFAULT 'Ruko Urbana Place No. A8, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan',
  	\`maps_query\` text DEFAULT 'Urbana Place, Jl. Merpati Raya, Sawah Baru, Ciputat, Tangerang Selatan',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_updated_at_idx\` ON \`site_settings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_created_at_idx\` ON \`site_settings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`packages_id\` integer,
  	\`posts_id\` integer,
  	\`ustadz_id\` integer,
  	\`testimonials_id\` integer,
  	\`gallery_id\` integer,
  	\`site_settings_id\` integer,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`packages_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`ustadz_id\`) REFERENCES \`ustadz\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gallery_id\`) REFERENCES \`gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`site_settings_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_packages_id_idx\` ON \`payload_locked_documents_rels\` (\`packages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_ustadz_id_idx\` ON \`payload_locked_documents_rels\` (\`ustadz_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gallery_id_idx\` ON \`payload_locked_documents_rels\` (\`gallery_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_site_settings_id_idx\` ON \`payload_locked_documents_rels\` (\`site_settings_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`packages_itinerary\`;`)
  await db.run(sql`DROP TABLE \`packages_included\`;`)
  await db.run(sql`DROP TABLE \`packages_excluded\`;`)
  await db.run(sql`DROP TABLE \`packages\`;`)
  await db.run(sql`DROP TABLE \`posts_related_categories\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`ustadz\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`gallery\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}
