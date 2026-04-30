import { describe, it, expect } from 'vitest';

const routeModules: Array<[string, () => Promise<unknown>]> = [
  ['Landing', () => import('../../components/Landing')],
  ['Login', () => import('../../components/Login')],
  ['Signup', () => import('../../components/Signup')],
  ['ForgotPassword', () => import('../../components/ForgotPassword')],
  ['Home', () => import('../../components/Home')],
  ['LostFound', () => import('../../components/LostFound')],
  ['Profile', () => import('../../components/Profile')],
  ['Complaints', () => import('../../components/Complaints')],
  ['CampusMap', () => import('../../components/CampusMap')],
  ['Events', () => import('../../components/Events')],
  ['News', () => import('../../components/News')],
  ['Facilities', () => import('../../components/Facilities')],
  ['ClubsRecruitment', () => import('../../components/ClubsRecruitment')],
  ['ChatWindow', () => import('../../components/Chat/ChatWindow')],
  ['PrivacyPolicy', () => import('../../components/PrivacyPolicy')],
  ['TermsOfService', () => import('../../components/TermsOfService')],
];

const IMPORT_TIMEOUT_MS = 20000;

describe('Route module smoke tests', () => {
  it.each(routeModules)('%s module loads with default export', async (_name, loader) => {
    const mod = await loader();
    const defaultExport = (mod as { default?: unknown }).default;

    expect(defaultExport).toBeDefined();
    expect(typeof defaultExport).toMatch(/function|object/);
  }, IMPORT_TIMEOUT_MS);
});
