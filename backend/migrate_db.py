"""
One-time migration for an EXISTING crowdsafe.db.

Adds the new columns the updated Visitor model needs (email, payment_id,
amount_paid) without touching your 7 existing visitor rows. The new
payment_orders table doesn't need a migration - SQLAlchemy's create_all()
in database.py will create it automatically the next time main.py starts,
since it's a brand new table.

Run this ONCE, from the backend/ folder, before starting the updated main.py:

    python migrate_db.py
"""
import sqlite3

DB_PATH = "crowdsafe.db"


def column_exists(cursor, table, column):
    cursor.execute(f"PRAGMA table_info({table})")
    return any(row[1] == column for row in cursor.fetchall())


def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    added = []
    for col, ddl in [
        ("email", "ALTER TABLE visitors ADD COLUMN email VARCHAR(150)"),
        ("payment_id", "ALTER TABLE visitors ADD COLUMN payment_id VARCHAR(100)"),
        ("amount_paid", "ALTER TABLE visitors ADD COLUMN amount_paid INTEGER"),
        ("group_id", "ALTER TABLE visitors ADD COLUMN group_id VARCHAR(40)"),
        ("member_index", "ALTER TABLE visitors ADD COLUMN member_index INTEGER"),
    ]:
        if not column_exists(cursor, "visitors", col):
            cursor.execute(ddl)
            added.append(col)

    conn.commit()
    conn.close()

    if added:
        print(f"✓ Added columns to visitors table: {', '.join(added)}")
    else:
        print("✓ visitors table is already up to date - nothing to do")
    print("✓ payment_orders table will be created automatically when main.py next starts")


if __name__ == "__main__":
    main()
