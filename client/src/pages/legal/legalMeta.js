/**
 * Legal publishing state. Keep this the single switch for draft vs published behavior:
 * - `draft`: draft banner shown, pages are `noindex`, placeholder check only warns.
 * - `published`: banner removed, pages indexable, placeholder check fails the build.
 * Switch to `published` only after owner and qualified legal review (PLAN-A-02).
 */
export const LEGAL_STATUS = 'draft'

export const legalDocuments = {
  '/privacy-policy': {
    label: 'Privacy Policy / Privacy Notice',
    title: 'A clear thread for your information.',
    description: 'How Moeko Works plans to handle information when you visit or use Tsumugi.',
    version: '0.1 (draft)',
  },
  '/terms-of-service': {
    label: 'Terms of Service / Terms and Conditions',
    title: 'The shared rules for making together.',
    description: 'The planned terms for using Tsumugi and protecting the work brought into it.',
    version: '0.1 (draft)',
  },
  '/cookie-and-local-storage-policy': {
    label: 'Cookie & Local Storage Policy',
    title: 'A thoughtful approach to browser storage.',
    description: 'How Tsumugi may use cookies, local storage, session storage, and similar browser technologies.',
    version: '0.1 (draft)',
  },
}

/**
 * Everything the client writes to cookies, localStorage, or sessionStorage.
 * Update this list in the same change as any feature that stores data in the browser.
 */
export const storageInventory = []
