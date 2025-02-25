import { useQuery } from "@tanstack/react-query";
import { authGetInitData } from "@/client";

const useUserAuth = () => {
  const { data } = useQuery({
    queryKey: [`user`],
    queryFn: async () => authGetInitData({}),
  });

  return data;
};

export default useUserAuth;
