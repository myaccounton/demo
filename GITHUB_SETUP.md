# GitHub Pages Setup Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com and sign in
2. Click the "+" icon → "New repository"
3. Name it (e.g., `cancer-awareness`)
4. Choose **Public** (required for free GitHub Pages)
5. **Don't** check any boxes (no README, .gitignore, or license)
6. Click "Create repository"

## Step 2: Connect and Push to GitHub

After creating the repository, run these commands in your terminal:

```bash
cd "C:\Users\OMEN\OneDrive\Desktop\cancer-awareness"
git remote add origin https://github.com/YOUR_USERNAME/cancer-awareness.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select **Deploy from a branch**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **Save**

## Step 4: Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/cancer-awareness/
```

It may take a few minutes for the site to go live after enabling Pages.

## Troubleshooting

- If you get authentication errors, you may need to set up a Personal Access Token
- Make sure your repository is set to **Public** for free GitHub Pages
- Wait 2-5 minutes after enabling Pages for the site to deploy

