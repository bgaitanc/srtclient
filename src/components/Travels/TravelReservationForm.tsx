import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '@store/hooks.ts';
import type { TravelReservationFormProps } from '@srtTypes/reservationDetails.types.ts';
import { useReservations } from '@hooks/useReservations.ts';
import CircularLoading from '@components/Loading/CircularLoading.tsx';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const TravelReservationForm: React.FC<TravelReservationFormProps> = ({
  viajeId,
  onCancel,
}) => {
  const { userId } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    reservationDetailsQuery: {
      data: reservationDetails,
      isLoading,
      isFetching,
    },
    createReservation,
    createReservationMeta: {
      isLoading: isCreatingReservation,
      isSuccess: isSuccessCreatingReservation,
      isError: isErrorCreatingReservation,
      error: errorCreatingReservation,
    },
  } = useReservations({
    viajeId,
  });

  console.log(userId);

  const reservedSeats = reservationDetails?.data.asientosReservados ?? [];

  const [selectedSeats, setSelectedSeats] = React.useState<number[]>([]);

  const seats = useMemo(() => {
    const s = Array.from(
      { length: reservationDetails?.data.capacidad ?? 0 },
      (_, i) => i + 1
    );

    return s.map((s) => ({
      number: s,
      reserved: reservedSeats.includes(s),
      selected: selectedSeats.includes(s),
    }));
  }, [reservationDetails, selectedSeats]);

  const isLoadingRequest = useMemo(
    () => isLoading || isFetching || isCreatingReservation,
    [isLoading, isFetching, isCreatingReservation]
  );

  const handleSelectedSeats = (seat: number) => {
    const newSelectedSeats = selectedSeats.some((x) => x === seat)
      ? selectedSeats.filter((x) => x !== seat)
      : [...selectedSeats, seat];
    setSelectedSeats(newSelectedSeats);
  };
  const onConfirm = () => {
    const request = {
      viajeId,
      clienteId: userId!,
      detalle: selectedSeats,
      //TODO la fecha la esta registrando en UTC
      fechaReserva: new Date().toISOString(),
    };

    createReservation(request);
  };

  useEffect(() => {
    if (isSuccessCreatingReservation) {
      navigate('/');
    }
  }, [isSuccessCreatingReservation]);

  useEffect(() => {
    if (isErrorCreatingReservation) {
      //TODO eliminar
      console.log('Error al crear la reserva');
      console.log(errorCreatingReservation);
    }
  }, [isErrorCreatingReservation, errorCreatingReservation]);

  return (
    <>
      <CircularLoading show={isLoadingRequest} />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-300 bg-opacity-60">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl relative border border-blue-100">
          <h2 className="text-xl font-extrabold text-blue-800 mb-6 text-center drop-shadow">
            Selecciona los asientos que deseas reservar
          </h2>
          <div className="grid grid-cols-4 gap-4 justify-items-center bg-amber-50 py-10">
            {seats.map((seat, i) => (
              <div
                onClick={() => handleSelectedSeats(seat.number)}
                key={i}
                className={`${seat.reserved ? 'pointer-events-none bg-gray-600' : ''} ${seat.selected ? 'bg-green-500' : ''} cursor-pointer border rounded-sm border-blue-100 py-1 w-8 text-center`}
              >
                {seat.number}
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-6">
            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={!selectedSeats.length}
            >
              Confirmar
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelReservationForm;
