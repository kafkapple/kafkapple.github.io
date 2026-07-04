#!/usr/bin/env python3
import sys
import time
import subprocess
import urllib.request
import json

def get_current_sha():
    try:
        return subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip()
    except Exception as e:
        print(f"❌ Failed to get current git SHA: {e}")
        sys.exit(1)

def check_run_status(sha):
    url = f"https://api.github.com/repos/kafkapple/kafkapple.github.io/actions/runs?head_sha={sha}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            runs = data.get("workflow_runs", [])
            for run in runs:
                if run.get("name") == "pages build and deployment":
                    return run.get("status"), run.get("conclusion"), run.get("html_url")
    except Exception as e:
        print(f"⚠️ API request failed (might be rate-limited): {e}")
    return None, None, None

def main():
    sha = get_current_sha()
    print(f"🔍 Monitoring GitHub Pages deployment for commit {sha[:7]}...")
    
    max_attempts = 24  # 24 * 10s = 4 minutes
    attempt = 0
    
    while attempt < max_attempts:
        status, conclusion, run_url = check_run_status(sha)
        
        if status is None:
            # Workflow run not created yet or API failed, wait and retry
            pass
        elif status == "completed":
            if conclusion == "success":
                print(f"✅ GitHub Pages deployment succeeded! Run URL: {run_url}")
                sys.exit(0)
            else:
                print(f"❌ GitHub Pages deployment failed with conclusion: {conclusion}")
                print(f"🔗 View run here: {run_url}")
                sys.exit(1)
        else:
            print(f"⏳ Deployment status: {status} (Attempt {attempt + 1}/{max_attempts}). Waiting...")
        
        time.sleep(10)
        attempt += 1
        
    print("❌ Timeout waiting for GitHub Pages deployment.")
    sys.exit(1)

if __name__ == "__main__":
    main()
