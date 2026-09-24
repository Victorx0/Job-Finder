from dotenv import load_dotenv
import os
# ==========================================
# CONFIGURATION
# ==========================================

# 1. Load the environment variables from .env
load_dotenv()

# 2. Access variables using os.getenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Provide fallback default values if variable isn't found
port = os.getenv("PORT", "8000")

print(f"Loaded API Key: {SUPABASE_KEY}")
print(f"Connecting to DB at: {SUPABASE_URL}")