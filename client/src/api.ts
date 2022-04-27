import axios from "axios";

export type Match = {
  id: string;
  creationTime: number;
  companyName: string;
  amountReq: number;
  borrower: {
    bankruptcy: boolean;
    creditScore: number;
    ssn: number;
    financeData: {
      number: string;
      balance: number;
      currency: string;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      state: string;
      userIp: string;
    };
  };
  labels?: string[];
};

export type ApiClient = {
  getMatches: () => Promise<Match[]>;
  deleteMatch: any;
};

export const createApiClient = (): ApiClient => {
  return {
    getMatches: () => {
      return axios
        .get(`http://localhost:8888/api/match`)
        .then((res) => res.data);
    },
    deleteMatch: (id:string, approvedOrDenied:string) => {
      return axios
      .post(`http://localhost:8888/delete`,{}, {params:{id,approvedOrDenied}})
      .then((res) => res.status)
    }
  };
};
