/**
 * Data Loader Module
 * Handles fetching and rendering of dynamic content (events, news, members, teams)
 */

/**
 * Constants
 */
const DATA_PATH = "data/";
const MEMBER_PLACEHOLDER = "images/placeholders/member-placeholder.svg";

/**
 * Fetch JSON data from a file
 */
async function fetchData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error);
    return null;
  }
}

/**
 * Render upcoming events (future events only, sorted by date, max 3)
 */
export async function renderUpcomingEvents(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const events = await fetchData(`${DATA_PATH}events.json`);
  if (!events || !Array.isArray(events)) {
    showEmptyState(
      container,
      "No events scheduled",
      "Check back soon for upcoming club events."
    );
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events
    .filter((event) => event.date >= today && !event.cancelled)
    .toSorted((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  if (upcomingEvents.length === 0) {
    showEmptyState(
      container,
      "No upcoming events",
      "Check back soon for new events!"
    );
    return;
  }

  container.innerHTML = upcomingEvents
    .map(
      (event) => `
    <div class="event-card">
      <div class="event-date">${formatDate(event.date)}</div>
      <h3 class="event-title">${escapeHtml(event.title)}</h3>
      ${
        event.startTime
          ? `<div class="event-time">⏰ ${event.startTime}${
              event.endTime ? ` - ${event.endTime}` : ""
            }</div>`
          : ""
      }
      <div class="event-location">📍 ${escapeHtml(event.location)}</div>
      ${
        event.description
          ? `<p class="card-content">${escapeHtml(event.description)}</p>`
          : ""
      }
      ${
        event.type ? `<span class="badge">${escapeHtml(event.type)}</span>` : ""
      }
    </div>
  `
    )
    .join("");
}

/**
 * Render latest news teasers (max 3, sorted by date descending)
 */
export async function renderLatestNews(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // For now, we'll use a simple news.json approach
  // In future, this could parse markdown frontmatter
  const newsArticles = await fetchData(`${DATA_PATH}news.json`);
  if (!newsArticles || !Array.isArray(newsArticles)) {
    showEmptyState(
      container,
      "No news available",
      "Stay tuned for club updates and announcements."
    );
    return;
  }

  const latestNews = newsArticles
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  if (latestNews.length === 0) {
    showEmptyState(container, "No news available", "Stay tuned for updates!");
    return;
  }

  container.innerHTML = latestNews
    .map(
      (article) => `
    <div class="news-teaser">
      <div class="news-meta">
        ${formatDate(article.date)}${
        article.author ? ` • ${escapeHtml(article.author)}` : ""
      }
      </div>
      <h3 class="news-title">${escapeHtml(article.title)}</h3>
      ${
        article.summary
          ? `<p class="news-summary">${escapeHtml(article.summary)}</p>`
          : ""
      }
      ${
        article.tags && article.tags.length > 0
          ? `
        <div>
          ${article.tags
            .map(
              (tag) =>
                `<span class="badge badge-outline">${escapeHtml(tag)}</span>`
            )
            .join(" ")}
        </div>
      `
          : ""
      }
    </div>
  `
    )
    .join("");
}

/**
 * Render team roster (members list for a specific team)
 */
export async function renderTeamRoster(teamId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const [teams, members] = await Promise.all([
    fetchData(`${DATA_PATH}teams.json`),
    fetchData(`${DATA_PATH}members.json`),
  ]);

  if (!teams || !members) {
    showEmptyState(
      container,
      "Unable to load roster",
      "Please try again later."
    );
    return;
  }

  const team = teams.find((t) => t.id === teamId);
  if (!team) {
    showEmptyState(
      container,
      "Team not found",
      "The requested team could not be found."
    );
    return;
  }

  if (!team.members || team.members.length === 0) {
    showEmptyState(
      container,
      "No team members yet",
      "This team is currently being formed. Check back soon!"
    );
    return;
  }

  const teamMembers = members.filter((member) =>
    team.members.includes(member.id)
  );

  container.innerHTML = `
    <div class="grid grid-3">
      ${teamMembers.map((member) => renderMemberCard(member)).join("")}
    </div>
  `;
}

/**
 * Render active members list
 */
export async function renderActiveMembers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const members = await fetchData(`${DATA_PATH}members.json`);
  if (!members || !Array.isArray(members)) {
    showEmptyState(
      container,
      "Unable to load members",
      "Please try again later."
    );
    return;
  }

  const activeMembers = members.filter(
    (member) => member.membershipCategory === "active" || member.active
  );

  if (activeMembers.length === 0) {
    showEmptyState(
      container,
      "No active members",
      "Member information will be available soon."
    );
    return;
  }

  container.innerHTML = `
    <div class="grid grid-4">
      ${activeMembers.map((member) => renderMemberCard(member)).join("")}
    </div>
  `;
}

/**
 * Render passive members list
 */
export async function renderPassiveMembers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const members = await fetchData(`${DATA_PATH}members.json`);
  if (!members || !Array.isArray(members)) {
    showEmptyState(
      container,
      "Unable to load members",
      "Please try again later."
    );
    return;
  }

  const passiveMembers = members.filter(
    (member) => member.membershipCategory === "passive"
  );

  if (passiveMembers.length === 0) {
    showEmptyState(
      container,
      "No passive members",
      "Member information will be available soon."
    );
    return;
  }

  container.innerHTML = `
    <div class="grid grid-4">
      ${passiveMembers.map((member) => renderMemberCard(member)).join("")}
    </div>
  `;
}

/**
 * Render committee roles with assigned members
 */
export async function renderCommittee(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const [roles, members] = await Promise.all([
    fetchData(`${DATA_PATH}committee-roles.json`),
    fetchData(`${DATA_PATH}members.json`),
  ]);

  if (!roles || !members) {
    showEmptyState(
      container,
      "Unable to load committee",
      "Please try again later."
    );
    return;
  }

  const sortedRoles = roles.sort((a, b) => (a.order || 0) - (b.order || 0));

  container.innerHTML = sortedRoles
    .map((role) => {
      const assignedMember = members.find((m) => m.committeeRoleId === role.id);

      return `
      <div class="card">
        <h3 class="card-title">${escapeHtml(role.title)}</h3>
        ${
          role.description
            ? `<p class="card-subtitle">${escapeHtml(role.description)}</p>`
            : ""
        }
        ${
          assignedMember
            ? `
          <div class="member-card">
            ${
              assignedMember.image
                ? `
              <img src="images/members/${assignedMember.image}" 
                   alt="${escapeHtml(assignedMember.displayName)}" 
                   class="member-image">
            `
                : `
              <img src="${MEMBER_PLACEHOLDER}" 
                   alt="Member placeholder" 
                   class="member-image">
            `
            }
            <div class="member-name">${escapeHtml(
              assignedMember.displayName
            )}</div>
          </div>
        `
            : `
          <p class="text-muted">Position currently vacant</p>
        `
        }
      </div>
    `;
    })
    .join("");
}

/**
 * Render member card HTML
 */
function renderMemberCard(member) {
  return `
    <div class="member-card">
      ${
        member.image
          ? `
        <img src="images/members/${member.image}" 
             alt="${escapeHtml(member.displayName)}" 
             class="member-image">
      `
          : `
        <img src="${MEMBER_PLACEHOLDER}" 
             alt="Member placeholder" 
             class="member-image">
      `
      }
      <div class="member-name">${escapeHtml(member.displayName)}</div>
      ${
        member.role
          ? `<div class="member-role">${escapeHtml(member.role)}</div>`
          : ""
      }
    </div>
  `;
}

/**
 * Show empty state message
 */
function showEmptyState(container, title, message) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">🎯</div>
      <h3 class="empty-state-title">${escapeHtml(title)}</h3>
      <p class="empty-state-message">${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Format ISO date to readable format
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
