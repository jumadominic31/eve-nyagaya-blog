// Push to GitHub using Replit GitHub connection token
import { execSync } from 'child_process';

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
    throw new Error('X_REPLIT_TOKEN not found');
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

async function pushToGitHub() {
  const repoName = 'eve-nyagaya-blog';
  
  try {
    console.log('Getting GitHub token...');
    const token = await getAccessToken();
    
    // Get username from token
    const response = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const user = await response.json();
    const username = user.login;
    
    console.log(`Authenticated as: ${username}`);
    
    // Create authenticated URL
    const authUrl = `https://${username}:${token}@github.com/${username}/${repoName}.git`;
    
    console.log('Pushing to GitHub...');
    
    // Push using the authenticated URL
    try {
      execSync(`git push ${authUrl} main`, { 
        stdio: 'inherit',
        cwd: '/home/runner/workspace'
      });
      console.log('\nSuccessfully pushed to GitHub!');
      console.log(`View your repository: https://github.com/${username}/${repoName}`);
    } catch (e) {
      // Try with force if branch doesn't exist on remote
      execSync(`git push -u ${authUrl} main`, { 
        stdio: 'inherit',
        cwd: '/home/runner/workspace'
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

pushToGitHub();
