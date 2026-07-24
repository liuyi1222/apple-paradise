-- ==========================================
-- 苹果乐园 · 留言系统 · Supabase 建表 SQL
-- ==========================================

-- 1. 创建留言表
CREATE TABLE IF NOT EXISTS messages (
  id          BIGSERIAL    PRIMARY KEY,
  content     TEXT         NOT NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- 2. 开启行级安全 (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 3. 允许任何人读取留言
CREATE POLICY "allow_public_read"
  ON messages
  FOR SELECT
  USING (true);

-- 4. 允许任何人插入留言
CREATE POLICY "allow_public_insert"
  ON messages
  FOR INSERT
  WITH CHECK (true);

-- 5. 按时间倒序索引（首页取最新 N 条）
CREATE INDEX IF NOT EXISTS idx_messages_created_at
  ON messages (created_at DESC);
