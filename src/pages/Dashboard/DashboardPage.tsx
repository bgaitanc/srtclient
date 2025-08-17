import React, { useMemo } from 'react';
import UserInfoCard from '@components/Dashboard/UserInfoCard.tsx';
import UserReservationsCard from '@components/Dashboard/UserReservationsCard.tsx';
import { useAppSelector } from '@store/hooks.ts';
import CircularLoading from '@components/Loading/CircularLoading.tsx';
import { useGetUserInfoQuery } from '@services/users.service.ts';
import { useGetUserReservationsQuery } from '@services/reservations.service.ts';

const DashboardPage: React.FC = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const {
    data: userData,
    isLoading: isLoadingUserData,
    isFetching: isFetchingUserData,
  } = useGetUserInfoQuery(undefined, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: reservations,
    isLoading: isLoadingReservations,
    isFetching: isFetchingReservations,
  } = useGetUserReservationsQuery(userId ?? 0, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const isLoading = useMemo(
    () =>
      isLoadingUserData ||
      isFetchingUserData ||
      isLoadingReservations ||
      isFetchingReservations,
    [
      isLoadingUserData,
      isFetchingUserData,
      isLoadingReservations,
      isFetchingReservations,
    ]
  );

  return (
    <>
      <CircularLoading show={isLoading} />
      <div className="flex flex-col items-center justify-center min-h-screen text-center gap-8">
        <UserInfoCard userData={userData?.data} />
        <UserReservationsCard reservationsData={reservations?.data} />
      </div>
    </>
  );
};

export default DashboardPage;
