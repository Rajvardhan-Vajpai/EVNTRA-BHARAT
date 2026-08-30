import os
import shutil

BASE = os.path.join("assets", "images", "events")
SRC_IMAGE = os.path.join(BASE, "delhi", "nh7-weekender-delhi", "1.webp")

fixed_count = 0

for root, dirs, files in os.walk(BASE):
    # Only process leaf directories (event folders)
    if not dirs:
        for i in range(1, 5):
            dst = os.path.join(root, f"{i}.webp")
            if not os.path.exists(dst) or os.path.getsize(dst) < 1000:
                print(f"Missing: {dst}")
                if os.path.exists(SRC_IMAGE):
                    shutil.copy2(SRC_IMAGE, dst)
                    print(f"  -> Fixed using copy.")
                    fixed_count += 1
                else:
                    print("Source image not found!")

print(f"\nFixed {fixed_count} missing images.")
