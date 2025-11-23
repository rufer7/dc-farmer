/**
 * Active members page initialization
 */
import { renderActiveMembers } from './data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderActiveMembers('active-members');
});
