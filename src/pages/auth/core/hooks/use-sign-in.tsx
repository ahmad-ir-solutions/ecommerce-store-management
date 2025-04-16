import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { getUserByToken, login } from '../_requests';
import { useAuth } from '../auth-context';

const useSignIn = () => {
  const { saveAuth, setCurrentUser } = useAuth();

  const { mutate, isError, error, isPending: isLoading, isSuccess, data } = useMutation({
      mutationFn: (body: ISignInForm) => login(body),
    });

  const { mutate: mutateVerifyToken } = useMutation({mutationFn: (token: string) => getUserByToken(token)});

  useEffect(() => {
    if (isSuccess && data) {
      const apiToken = data?.data?.data?.api_token;
      if (apiToken) {
        mutateVerifyToken(apiToken, {
          onSuccess: (res) => {
            const authData = {
              api_token: apiToken,
              data: res?.data,
            };
            saveAuth(authData);
            setCurrentUser(res?.data);
          },
        });
      }
    }
  }, [data, isSuccess, mutateVerifyToken, saveAuth, setCurrentUser]);

  return { mutate, isError, error, isLoading, isSuccess };
};

export default useSignIn;
