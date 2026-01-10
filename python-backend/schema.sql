-- ATHLYNX AI Platform - PostgreSQL Database Schema
-- NEON Database - January 10, 2026

-- ==================== USERS ====================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    password_hash VARCHAR(255),
    role VARCHAR(32) DEFAULT 'user',
    avatar_url TEXT,
    bio TEXT,
    is_vip BOOLEAN DEFAULT FALSE,
    vip_code_used VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_signed_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== VIP CODES ====================

CREATE TABLE IF NOT EXISTS vip_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(32) UNIQUE NOT NULL,
    description TEXT,
    max_uses INTEGER DEFAULT 1,
    uses INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default VIP codes
INSERT INTO vip_codes (code, description, max_uses, active) VALUES
('FOUNDER2026', 'Founder Access Code', 100, TRUE),
('ATHLYNXVIP', 'ATHLYNX VIP Early Access', 100, TRUE),
('PERFECTSTORM', 'The Perfect Storm Launch', 100, TRUE),
('DHGEMPIRE', 'DHG Empire Access', 100, TRUE),
('CHAD2026', 'Chad Dozier Special Access', 100, TRUE)
ON CONFLICT (code) DO NOTHING;

-- ==================== VERIFICATION CODES ====================

CREATE TABLE IF NOT EXISTS verification_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    phone VARCHAR(20),
    code VARCHAR(6) NOT NULL,
    type VARCHAR(32) DEFAULT 'signup',
    verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== WAITLIST ====================

CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(32),
    sport VARCHAR(64),
    referral_code VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ATHLETE PROFILES ====================

CREATE TABLE IF NOT EXISTS athlete_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    sport VARCHAR(64),
    position VARCHAR(64),
    school VARCHAR(255),
    graduation_year INTEGER,
    height VARCHAR(16),
    weight VARCHAR(16),
    stats JSONB,
    highlights JSONB,
    social_links JSONB,
    transfer_status VARCHAR(32) DEFAULT 'not_in_portal',
    nil_status VARCHAR(32) DEFAULT 'not_available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== NIL DEALS ====================

CREATE TABLE IF NOT EXISTS nil_deals (
    id SERIAL PRIMARY KEY,
    athlete_id INTEGER REFERENCES users(id),
    brand_id INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    value DECIMAL(12, 2),
    status VARCHAR(32) DEFAULT 'pending',
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    terms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== POSTS / SOCIAL FEED ====================

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content TEXT,
    media_urls JSONB,
    post_type VARCHAR(32) DEFAULT 'text',
    visibility VARCHAR(32) DEFAULT 'public',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== COMMENTS ====================

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== LIKES ====================

CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- ==================== FOLLOWS ====================

CREATE TABLE IF NOT EXISTS follows (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id),
    following_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- ==================== MESSAGES ====================

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    recipient_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== NOTIFICATIONS ====================

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(64) NOT NULL,
    title VARCHAR(255),
    message TEXT,
    link VARCHAR(512),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== TRANSFER PORTAL PLAYERS ====================

CREATE TABLE IF NOT EXISTS transfer_portal_players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sport VARCHAR(64) NOT NULL,
    position VARCHAR(64),
    current_school VARCHAR(255),
    previous_school VARCHAR(255),
    hometown VARCHAR(255),
    state VARCHAR(2),
    rating INTEGER,
    nil_valuation DECIMAL(12, 2),
    status VARCHAR(32) DEFAULT 'available',
    eligibility VARCHAR(64),
    stats JSONB,
    highlights_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== CRM / SIGNUP ANALYTICS ====================

CREATE TABLE IF NOT EXISTS signup_analytics (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(320),
    phone VARCHAR(20),
    role VARCHAR(32),
    sport VARCHAR(64),
    referral_source VARCHAR(255),
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    signup_type VARCHAR(32),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== PARTNER ACCESS ====================

CREATE TABLE IF NOT EXISTS partner_access (
    id SERIAL PRIMARY KEY,
    access_code VARCHAR(64) UNIQUE NOT NULL,
    partner_name VARCHAR(255) NOT NULL,
    access_level VARCHAR(32) DEFAULT 'view',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert partner access codes
INSERT INTO partner_access (access_code, partner_name, access_level) VALUES
('CHAD-FOUNDER-2026', 'Chad A. Dozier', 'admin'),
('GLENN-PARTNER-2026', 'Glenn Tse', 'full'),
('LEE-PARTNER-2026', 'Lee Marshall', 'full'),
('JIMMY-PARTNER-2026', 'Jimmy Boyd', 'full'),
('ANDREW-PARTNER-2026', 'Andrew Kustes', 'full'),
('MOM-ADVISOR-2026', 'Nicki Simpson Leggett', 'view'),
('DAVID-ADVISOR-2026', 'David Roland Ford Sr.', 'view')
ON CONFLICT (access_code) DO NOTHING;

-- ==================== MILESTONES ====================

CREATE TABLE IF NOT EXISTS milestones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_value DECIMAL(12, 2),
    current_value DECIMAL(12, 2) DEFAULT 0,
    achieved BOOLEAN DEFAULT FALSE,
    achieved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== STRIPE SUBSCRIPTIONS ====================

CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    plan VARCHAR(64),
    status VARCHAR(32),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES ====================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_vip_codes_code ON vip_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_transfer_portal_sport ON transfer_portal_players(sport);
CREATE INDEX IF NOT EXISTS idx_signup_analytics_email ON signup_analytics(email);

-- ==================== COMPLETE ====================
-- ATHLYNX Database Schema Created Successfully
-- Dreams Do Come True 2026! 🦁
