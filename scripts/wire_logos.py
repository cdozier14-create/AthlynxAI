#!/usr/bin/env python3
"""
Wire all 7 logos into the correct components.
Replace Manus CDN logo references with /logos/ paths.
"""
import os
import re

REPO = "/home/ubuntu/athlynx-audit"

# Logo mapping: old CDN URL fragment -> new local path
# Based on the 7 logos provided:
# 1. athlynx-main-logo.png = icon(35).png = blue crystal mountain = Athlynx main nav logo
# 2. nil-portal-logo.png = 19811b65 = "n" with blue slash = NIL Portal Feed
# 3. nil-messenger-logo.png = e0264197 = "n" in speech bubble = NIL Messenger
# 4. dhg-crab-logo.png = 61aee1d2 = crab shield = DHG Company Logo
# 5. athlynx-sports-brand.png = economic_upturn_vision = athletes/city = Athlynx Sports Brand
# 6. mobile-app-icon.png = mobile-app-logo(6) = phone with swoosh = Mobile App Icon
# 7. settings-support-icon.png = admin-logo(7) = gear with arrow = Settings & Support

# The existing manuscdn.com URLs that map to these logos (from git history):
# AzsuZOzvfgvscIdI.png = DHG crab logo (used as ATHLYNX logo in PlatformLayout - wrong, should be athlynx-main-logo)
# QNTbeHFuYniqJHLn.png = NIL Portal icon
# EeLChdOizNwqbjTd.png = NIL Messenger icon

LOGO_REPLACEMENTS = {
    # DHG crab logo - used for DHG Empire, DHG sections
    "AzsuZOzvfgvscIdI.png": "/logos/dhg-crab-logo.png",
    # NIL Portal Feed logo
    "QNTbeHFuYniqJHLn.png": "/logos/nil-portal-logo.png",
    # NIL Messenger logo
    "EeLChdOizNwqbjTd.png": "/logos/nil-messenger-logo.png",
    # Mobile app icon
    "mobile-app-logo": "/logos/mobile-app-icon.png",
    # Admin/settings icon
    "admin-logo": "/logos/settings-support-icon.png",
}

# Files to update
TARGET_FILES = [
    "client/src/components/PlatformLayout.tsx",
    "client/src/components/DashboardLayout.tsx",
    "client/src/components/BrandingHeader.tsx",
    "client/src/components/UnifiedNav.tsx",
    "client/src/components/UnifiedFooter.tsx",
    "client/src/components/OnboardingModal.tsx",
    "client/src/components/PWAInstallBanner.tsx",
    "client/src/components/InstallAppModal.tsx",
    "client/src/pages/NILPortal.tsx",
    "client/src/pages/MessengerApp.tsx",
    "client/src/pages/DHG.tsx",
    "client/src/pages/DHGEmpire.tsx",
    "client/src/pages/DHGCorporate.tsx",
    "client/src/pages/DHGHome.tsx",
    "client/src/pages/Home.tsx",
]

changes = 0
for rel_path in TARGET_FILES:
    full_path = os.path.join(REPO, rel_path)
    if not os.path.exists(full_path):
        continue
    with open(full_path, 'r') as f:
        content = f.read()
    
    original = content
    for old_fragment, new_url in LOGO_REPLACEMENTS.items():
        # Replace full manuscdn URL containing this fragment
        pattern = r'https://files\.manuscdn\.com/[^\s"\']+' + re.escape(old_fragment)
        content = re.sub(pattern, new_url, content)
    
    if content != original:
        with open(full_path, 'w') as f:
            f.write(content)
        n = len(re.findall(r'/logos/', content)) - len(re.findall(r'/logos/', original))
        print(f"Updated: {rel_path}")
        changes += 1

# Now fix PlatformLayout specifically:
# Line 205: The ATHLYNX nav logo should be athlynx-main-logo.png (blue crystal)
# Line 354: The DHG footer logo should be dhg-crab-logo.png
platform_path = os.path.join(REPO, "client/src/components/PlatformLayout.tsx")
if os.path.exists(platform_path):
    with open(platform_path, 'r') as f:
        content = f.read()
    
    # Fix the main ATHLYNX nav logo (alt="ATHLYNX") - should be the blue crystal logo
    content = content.replace(
        'src="/logos/dhg-crab-logo.png" alt="ATHLYNX"',
        'src="/logos/athlynx-main-logo.png" alt="ATHLYNX"'
    )
    # Also fix any manuscdn reference for ATHLYNX alt
    content = re.sub(
        r'src="https://files\.manuscdn\.com/[^"]*" alt="ATHLYNX"',
        'src="/logos/athlynx-main-logo.png" alt="ATHLYNX"',
        content
    )
    # Fix onError fallback for ATHLYNX
    content = re.sub(
        r'\.src = "https://files\.manuscdn\.com/[^"]*AzsuZOzvfgvscIdI[^"]*"',
        '.src = "/logos/athlynx-main-logo.png"',
        content
    )
    
    with open(platform_path, 'w') as f:
        f.write(content)
    print(f"Fixed PlatformLayout ATHLYNX vs DHG logo separation")
    changes += 1

print(f"\nTotal files updated: {changes}")
print("All 7 logos wired in.")
