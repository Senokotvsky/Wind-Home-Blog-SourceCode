import isMobile from "is-mobile";

function budidQQShareUri(data: ShareData) {
  if (isMobile()) {
    return;
  }
  return {};
}
