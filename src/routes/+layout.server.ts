import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ platform }) => {
    return {
        umamiWebsiteId: platform?.env?.PUBLIC_UMAMI_WEBSITE_ID || '',
        umamiScriptUrl: platform?.env?.PUBLIC_UMAMI_SCRIPT_URL || 'https://analytics.umami.is/script.js'
    };
};
