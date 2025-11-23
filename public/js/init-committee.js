/**
 * Committee page initialization
 */
import { renderCommittee } from './data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderCommittee('committee-roles');
});
