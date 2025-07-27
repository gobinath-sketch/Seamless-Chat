export const createPageUrl = (pageName) => {
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/${pageName.toLowerCase()}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}; 