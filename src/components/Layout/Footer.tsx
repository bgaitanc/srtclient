import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Sistema de Reserva de Transporte. Todos los derechos reservados.</p>
        <p>Desarrollado por DevTeam</p>
      </div>
    </footer>
  );
};

export default Footer;