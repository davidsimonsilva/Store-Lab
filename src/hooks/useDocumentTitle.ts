import { useEffect } from 'react';

export interface SEOOptions {

  title: string;

  description?: string;

  ogTitle?: string;

  ogDescription?: string;

  ogImage?: string;

  ogType?: 'website' | 'product' | 'article';

  ogUrl?: string;
}

export const MAX_DOCUMENT_TITLE_LENGTH = 50;
const DEFAULT_TITLE = 'Store-lab';
const DEFAULT_DESCRIPTION =
  'Uma plataforma de e-commerce moderna e elegante, apresentando eletrônicos, gadgets e tecnologia de alta performance na StoreLab.';

export function truncateTitle(title: string, maxLength: number = MAX_DOCUMENT_TITLE_LENGTH): string {
  const trimmed = title.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength - 3).trimEnd()}...`;
}

export function formatDocumentTitle(rawTitle?: string): string {
  if (!rawTitle || !rawTitle.trim()) {
    return DEFAULT_TITLE;
  }

  const trimmed = rawTitle.trim();

  if (
    trimmed === '/' ||
    trimmed.toLowerCase() === 'storelab' ||
    trimmed.toLowerCase() === 'store-lab' ||
    trimmed.toLowerCase() === 'store-lab | inovação, eletrônicos e gadgets' ||
    trimmed.toLowerCase() === 'storelab | inovação, eletrônicos e gadgets' ||
    trimmed.toLowerCase().includes('inovação, eletrônicos e gadgets')
  ) {
    return DEFAULT_TITLE;
  }

  const cleanTitle = trimmed.replace(/\s*\|\s*StoreLab$/i, '').replace(/\s*\|\s*Store-Lab$/i, '').trim();

  return truncateTitle(cleanTitle, MAX_DOCUMENT_TITLE_LENGTH);
}

function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content?: string): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;

  if (!content) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export function applySEO(optionsOrTitle: string | SEOOptions): void {
  if (typeof document === 'undefined') return;

  const options: SEOOptions =
    typeof optionsOrTitle === 'string'
      ? { title: optionsOrTitle }
      : optionsOrTitle;

  const formattedTitle = formatDocumentTitle(options.title);
  document.title = formattedTitle;

  const metaDescription = options.description || DEFAULT_DESCRIPTION;
  setMetaTag('name', 'description', metaDescription);

  const ogTitle = options.ogTitle || formattedTitle;
  const ogDescription = options.ogDescription || metaDescription;
  const ogType = options.ogType || 'website';
  const ogUrl = options.ogUrl || (typeof window !== 'undefined' ? window.location.href : '');

  setMetaTag('property', 'og:title', ogTitle);
  setMetaTag('property', 'og:description', ogDescription);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:site_name', 'StoreLab');
  if (ogUrl) {
    setMetaTag('property', 'og:url', ogUrl);
  }
  if (options.ogImage) {
    setMetaTag('property', 'og:image', options.ogImage);
    setMetaTag('name', 'twitter:image', options.ogImage);
  }

  setMetaTag('name', 'twitter:card', options.ogImage ? 'summary_large_image' : 'summary');
  setMetaTag('name', 'twitter:title', ogTitle);
  setMetaTag('name', 'twitter:description', ogDescription);
}

export function useDocumentTitle(optionsOrTitle: string | SEOOptions): void {
  useEffect(() => {
    applySEO(optionsOrTitle);
  }, [optionsOrTitle]);
}

