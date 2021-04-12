export const adaptAuthInfo = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatar: user.avatar_url,
  isPro: user.is_pro
});
