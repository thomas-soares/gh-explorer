export function setMeta(name: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

export function setOGMeta(property: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.content = content;
}

export interface PageMetaOptions {
  title: string;
  description: string;
  ogTitle?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function setPageMeta(options: PageMetaOptions) {
  const { title, description, ogTitle, ogImage, ogUrl } = options;

  document.title = title;
  setMeta('description', description);

  if (ogTitle) setOGMeta('og:title', ogTitle);
  if (ogImage) setOGMeta('og:image', ogImage);
  if (ogUrl) setOGMeta('og:url', ogUrl);
}
