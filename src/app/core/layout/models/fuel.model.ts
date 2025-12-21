export interface FuelRecord {
  id: number;
  date: string;
  station: string;
  city: string;
  uf: string;
  fuelType: 'Gasolina' | 'Etanol' | 'Diesel';
  pricePerLiter: number;
  liters: number;
  total: number;

  driver: {
    name: string;
    cpf: string;
  };

  vehicle: {
    plate: string;
    model: string;
  };
}
