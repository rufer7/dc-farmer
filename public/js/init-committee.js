/**
 * Committee page initialization
 */
import { renderCommittee } from '/public/js/data-loader.js';
import { updateYear } from '/public/js/year.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderCommittee('committee-roles');
});
