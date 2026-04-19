#!/usr/bin/env python3
"""
Download all Manus CDN assets and re-upload to permanent S3 hosting via manus-upload-file.
Then generate a URL mapping file for find-and-replace in the codebase.
"""
import os
import subprocess
import json
import urllib.request
import urllib.error
import time
from pathlib import Path

MANUS_URLS_FILE = "/tmp/manus_urls.txt"
ASSETS_DIR = "/tmp/manus_assets"
MAPPING_FILE = "/tmp/url_mapping.json"

os.makedirs(ASSETS_DIR, exist_ok=True)

# Read all Manus CDN URLs
with open(MANUS_URLS_FILE) as f:
    raw_urls = [line.strip().strip('"') for line in f if line.strip()]

# Filter to media files only
media_urls = [u for u in raw_urls if any(u.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.mov'])]
print(f"Found {len(media_urls)} media URLs to migrate")

url_mapping = {}
failed = []

for i, url in enumerate(media_urls):
    filename = url.split('/')[-1]
    local_path = os.path.join(ASSETS_DIR, filename)
    
    # Skip if already downloaded
    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        print(f"[{i+1}/{len(media_urls)}] Already downloaded: {filename}")
    else:
        # Download
        try:
            print(f"[{i+1}/{len(media_urls)}] Downloading: {filename}")
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as response:
                with open(local_path, 'wb') as f:
                    f.write(response.read())
            size = os.path.getsize(local_path)
            print(f"  -> {size/1024:.0f}KB")
        except Exception as e:
            print(f"  FAILED: {e}")
            failed.append(url)
            continue
    
    # Upload to permanent hosting
    try:
        result = subprocess.run(
            ['manus-upload-file', local_path],
            capture_output=True, text=True, timeout=60
        )
        output = result.stdout.strip()
        # Extract URL from output (last line that starts with https://)
        lines = output.split('\n')
        new_url = None
        for line in reversed(lines):
            line = line.strip()
            if line.startswith('https://'):
                new_url = line
                break
        
        if new_url:
            url_mapping[url] = new_url
            print(f"  -> Uploaded: {new_url[:60]}...")
        else:
            print(f"  UPLOAD FAILED: {output[:100]}")
            failed.append(url)
    except Exception as e:
        print(f"  UPLOAD ERROR: {e}")
        failed.append(url)

# Save mapping
with open(MAPPING_FILE, 'w') as f:
    json.dump(url_mapping, f, indent=2)

print(f"\n=== DONE ===")
print(f"Mapped: {len(url_mapping)}/{len(media_urls)}")
print(f"Failed: {len(failed)}")
if failed:
    print("Failed URLs:")
    for u in failed:
        print(f"  {u}")
print(f"Mapping saved to: {MAPPING_FILE}")
