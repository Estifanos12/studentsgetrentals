import { toast } from '@/components/ui/use-toast';
import { apiRequest } from '@/services/api/apiRequest';

export const getResult = async (email: string) => {
  console.log(email);
  try {
    const response = await apiRequest({
      method: 'POST',
      endpoint: '/api/get-student-result',
      data: JSON.stringify({ email: email }),
    });

    if (response.status !== 200) {
      toast({
        title: 'Error',
        variant: 'destructive',
      });
      return { result: [] };
    }

    return { result: response.data };
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
    });
    return { result: [] };
  }
};
