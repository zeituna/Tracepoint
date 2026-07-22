import sqlite3
import os

db_path = 'instance/tracepoint.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        admin_id INTEGER DEFAULT 1,
        subject TEXT NOT NULL,
        last_message TEXT,
        last_message_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        unread_count INTEGER DEFAULT 0,
        user_name TEXT,
        user_type TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        sender_id INTEGER NOT NULL,
        sender_type TEXT DEFAULT 'user',
        sender_name TEXT,
        read BOOLEAN DEFAULT 0,
        status TEXT DEFAULT 'sent',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
""")

try:
    cursor.execute("ALTER TABLE users ADD COLUMN online BOOLEAN DEFAULT 0")
except:
    pass

conn.commit()
conn.close()
print("✅ Chat tables created successfully!")
