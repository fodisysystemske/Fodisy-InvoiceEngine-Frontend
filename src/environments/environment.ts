# Allow scripts just for your current user (no global changes)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Install Scoop
iwr -useb get.scoop.sh | iex

# Add extras bucket
scoop bucket add extras

# Install Supabase CLI
scoop install supabase
export const environment = {
  supabaseUrl: 'https://cjivbxowemkvzoojfdrw.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqaXZieG93ZW1rdnpvb2pmZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzc3NzUsImV4cCI6MjA4ODcxMzc3NX0.3cmBt7-XNtFUuTxapQlfP_9b-wYxz1HhTAIvZSANNFE'
};