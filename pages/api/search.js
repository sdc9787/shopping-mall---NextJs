export default async function handler(a, b) {
  const searchQuery = encodeURIComponent(a.body.search);
  b.redirect(302, "/search/" + searchQuery);
}
