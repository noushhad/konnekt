import { Alert, Linking } from 'react-native';

export const appSchemes = {
  instagram: (h: string) => `instagram://user?username=${h}`,
  linkedin:  (h: string) => `linkedin://in/${h}`,
  twitter:   (h: string) => `twitter://user?screen_name=${h}`,
  facebook:  (u: string) => `fb://facewebmodal/f?href=${encodeURIComponent(/^https?:/.test(u) ? u : `https://facebook.com/${u}`)}`,
  tiktok:    (h: string) => `tiktok://@${h}`,
  youtube:   (h: string) => `vnd.youtube://www.youtube.com/@${h}`,
  whatsapp:  (p: string) => `whatsapp://send?phone=${p}`
};

export const webUrls = {
  instagram: (h: string) => `https://instagram.com/${h}`,
  linkedin:  (h: string) => `https://www.linkedin.com/in/${h}/`,
  twitter:   (h: string) => `https://twitter.com/${h}`,
  facebook:  (u: string) => /^https?:/.test(u) ? u : `https://facebook.com/${u}`,
  tiktok:    (h: string) => `https://www.tiktok.com/@${h}`,
  youtube:   (h: string) => `https://www.youtube.com/@${h}`,
  whatsapp:  (p: string) => `https://wa.me/${p.replace('+','')}`
};

export async function openHandle(platform: keyof typeof appSchemes, value: string) {
  const appUrl = appSchemes[platform](value);
  const webUrl = webUrls[platform](value);
  try {
    const supported = await Linking.canOpenURL(appUrl);
    await Linking.openURL(supported ? appUrl : webUrl);
  } catch {
    Alert.alert('Cannot open', webUrl);
  }
}
