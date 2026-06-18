export const PREMIUM_KEY = "techcart-premium";

export function isPremium() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PREMIUM_KEY) === "true";
}

export function setPremium() {
  localStorage.setItem(PREMIUM_KEY, "true");
  window.dispatchEvent(new Event("premium-changed"));
}
