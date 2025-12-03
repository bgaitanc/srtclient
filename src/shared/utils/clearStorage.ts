/**
 * Utilidad para limpiar tokens del sessionStorage
 * Ejecutar esto en la consola del navegador si hay problemas con tokens inválidos
 */

export function clearAuthStorage() {
    sessionStorage.removeItem('default_auth_token');
    sessionStorage.removeItem('default_refresh_token');
}

// Auto-ejecutar si se detecta un token corrupto o con formato antiguo (JSON.stringify)
if (typeof window !== 'undefined') {
    const authToken = sessionStorage.getItem('default_auth_token');

    if (authToken) {
        const parts = authToken.split('.');

        if (parts.length !== 3) {
            console.warn('⚠️ Detected corrupted or old format token, clearing storage...');
            clearAuthStorage();
        }

        if (authToken.startsWith('"') || authToken.startsWith("'")) {
            console.warn('⚠️ Detected old JSON-stringified token format, clearing storage...');
            clearAuthStorage();
        }
    }
}
