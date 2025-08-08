export interface ResponseGetMe {
  data: {
    id: number;
    fullname: string;
    email: string;
    avatar: string;
    phone: string;
    address: string;
    village: string;
    district: string;
    city: string;
    province: string;
    country: string;
    zip_code: string;
    status: number;
    id_anggota: number;
    role: {
      id: number;
      name: string;
    };
    email_verified: boolean;
    expiration: number;
  };

  message: string;
  status: number;
}
