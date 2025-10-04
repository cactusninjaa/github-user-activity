import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const getUserEvents = async (username) => {
  try {
    const response = await octokit.request(`GET /users/${username}/events`, {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    });
    return response.data;
  } catch (err) {
    throw new Error(`Failed to fetch events for "${username}": ${err.message}`);
  }
};