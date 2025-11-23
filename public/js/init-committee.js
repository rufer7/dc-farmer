/**
 * Committee page initialization
 */
import { renderCommittee } from '/public/js/data-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderCommittee('committee-roles');
});
