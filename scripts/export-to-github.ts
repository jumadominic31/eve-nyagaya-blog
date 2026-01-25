// GitHub Export Script - Uses Replit GitHub connection
import { Octokit } from '@octokit/rest';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function exportToGitHub() {
  const repoName = 'eve-nyagaya-blog';
  const repoDescription = 'Personal blog and podcast website for Eve Nyagaya - Built with React, Express, and PostgreSQL';
  
  try {
    console.log('Connecting to GitHub...');
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    // Check if repo already exists
    let repoExists = false;
    try {
      await octokit.repos.get({ owner: user.login, repo: repoName });
      repoExists = true;
      console.log(`Repository ${repoName} already exists.`);
    } catch (e: any) {
      if (e.status !== 404) throw e;
    }
    
    // Create repo if it doesn't exist
    if (!repoExists) {
      console.log(`Creating repository: ${repoName}...`);
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: repoDescription,
        private: false,
        auto_init: false,
      });
      console.log('Repository created successfully!');
    }
    
    // Get the remote URL
    const remoteUrl = `https://github.com/${user.login}/${repoName}.git`;
    console.log(`\nRepository URL: https://github.com/${user.login}/${repoName}`);
    console.log(`\nTo push your code, run these commands in the Shell:`);
    console.log(`  git remote add github ${remoteUrl}`);
    console.log(`  git push -u github main`);
    console.log(`\nOr if 'github' remote already exists:`);
    console.log(`  git push github main`);
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

exportToGitHub();
