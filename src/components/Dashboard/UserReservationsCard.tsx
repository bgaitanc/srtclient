import React, { useState } from 'react';
import type { GetReservationInfoResponse } from '@srtTypes/reservation.types.ts';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { SrtFormats } from '@config/constants.ts';
import Button from '@mui/material/Button';
import ReservationTicket from '@components/Reservations/ReservationTicket.tsx';

interface UserReservationsCardProps {
  reservationsData?: GetReservationInfoResponse[];
}

const UserReservationsCard: React.FC<UserReservationsCardProps> = ({
  reservationsData,
}) => {
  const [ticket, setTicket] = useState<GetReservationInfoResponse | null>(null);
  const [showTicket, setShowTicket] = useState(false);

  const columns: GridColDef<GetReservationInfoResponse>[] = [
    {
      field: 'reservaId',
      headerName: '# Reserva',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'fechaReserva',
      headerName: 'Fecha de Reserva',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => (
        <span>{dayjs(cell.value).format(SrtFormats.DATE_SHORT)}</span>
      ),
    },
    {
      field: 'origen',
      headerName: 'Origen',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => <span>{cell.row.ruta.locacionOrigen}</span>,
    },
    {
      field: 'destino',
      headerName: 'Destino',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => <span>{cell.row.ruta.locacionDestino}</span>,
    },
    {
      field: 'distancia',
      headerName: 'Distancia',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => <span>{cell.row.ruta.distanciaKM} KM</span>,
    },
    {
      field: 'fechaSalida',
      headerName: 'Fecha Salida',
      width: 175,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => (
        <span>
          {dayjs(cell.row.viaje.fechaHoraSalida).format(
            SrtFormats.DATE_TIME_SHORT
          )}
        </span>
      ),
    },
    {
      field: 'fechaLlegada',
      headerName: 'Fecha Llegada',
      width: 175,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => (
        <span>
          {dayjs(cell.row.viaje.fechaHoraLlegada).format(
            SrtFormats.DATE_TIME_SHORT
          )}
        </span>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 175,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => <span>{`C$ ${cell.value}`}</span>,
    },
    {
      field: 'acciones',
      headerName: '',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (cell) => (
        <Button
          variant="contained"
          onClick={() => {
            setTicket(cell.row);
            setShowTicket(true);
          }}
        >
          Ver ticket
        </Button>
      ),
    },
  ];

  const onClose = () => {
    setShowTicket(false);
    setTicket(null);
  }

  return (
    reservationsData &&
    reservationsData?.length > 0 && (
      <>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Mis Reservas
          </h1>
          <Box className="w-full">
            <DataGrid
              columns={columns}
              rows={reservationsData}
              getRowId={(row) => row.reservaId}

            />
          </Box>
        </div>
        {showTicket && <ReservationTicket data={ticket!} onClose={onClose} onSubmit={onClose} />}
      </>
    )
  );
};

export default UserReservationsCard;
