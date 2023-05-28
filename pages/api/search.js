export default async function handler(a, b) {
  b.redirect(302, "/search/" + a.body.search);
}
