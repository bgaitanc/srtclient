import { useEffect } from 'react';
import { getToken } from '@utils/token';
import { isTokenExpired, refreshAccessToken } from '@utils/tokenRefresh';

/**
 * Hook que verifica automáticamente si el token está por expirar
 * y lo refresca si es necesario
 */
export const useTokenRefresh = () => {
    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const token = getToken();

            if (token && isTokenExpired(token)) {
                await refreshAccessToken();
            }
        };

        checkAndRefreshToken();
        const interval = setInterval(checkAndRefreshToken, 4 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);
};
