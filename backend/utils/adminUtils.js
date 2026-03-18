/**
 * Check if a given email belongs to an admin user.
 * Admin emails are configured via the ADMIN_EMAILS environment variable (comma-separated).
 * @param {string} email
 * @returns {boolean}
 */
const isAdminEmail = (email) => {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
    : [];
  return adminEmails.includes(email.toLowerCase());
};

module.exports = { isAdminEmail };
