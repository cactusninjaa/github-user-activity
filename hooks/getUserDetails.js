import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const getUserDetails = async (username) => {
  try {
    const response = await octokit.request(`GET /users/${username}`, {
      headers: { 'X-GitHub-Api-Version': '2022-11-28' }
    });
    return response.data;
  } catch (err) {
    throw new Error(`Failed to fetch details for "${username}": ${err.message}`);
  }
};

