import { getToken, setToken, getRefreshToken, setRefreshToken, removeToken, removeRefreshToken } from './token';
import { API_BASE_URL } from '@config/constants';
import type { UserLoginRes } from '@models/authentication';
import type { SrtResponse } from '../types/srtApi.types';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string) {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
}

export async function refreshAccessToken(): Promise<string | null> {
    const currentToken = getToken();
    const currentRefreshToken = getRefreshToken();

    if (!currentToken || !currentRefreshToken) {
        return null;
    }

    if (isRefreshing) {
        // Si ya se está refrescando, esperar a que termine
        return new Promise((resolve) => {
            subscribeTokenRefresh((token: string) => {
                resolve(token);
            });
        });
    }

    isRefreshing = true;

    try {
        const response = await fetch(`${API_BASE_URL}/authentication/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                AccessToken: currentToken,
                RefreshToken: currentRefreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data: SrtResponse<UserLoginRes> = await response.json();

        if (data.success && data.data) {
            const newAccessToken = data.data.token;
            const newRefreshToken = data.data.refreshToken;

            setToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            onTokenRefreshed(newAccessToken);
            isRefreshing = false;

            return newAccessToken;
        }

        throw new Error('Invalid response from refresh token endpoint');
    } catch (error) {
        console.error('Error refreshing token:', error);
        isRefreshing = false;

        // Si falla el refresh, limpiar tokens y redirigir al login
        removeToken();
        removeRefreshToken();

        // Redirigir al login
        window.location.href = '/login';

        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();

        const bufferTime = 5 * 60 * 1000;

        return exp - now < bufferTime;
    } catch {
        return true;
    }
}
