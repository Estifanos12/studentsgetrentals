import { toast } from '@/components/ui/use-toast';
import { apiRequest } from '@/services/api/apiRequest';

export const getQuiz = async (quiz: string) => {
  try {
    const response = await apiRequest({
      method: 'GET',
      endpoint: `api/get-quizzes/${quiz}`,
    });

    if (response.status !== 200) {
      toast({
        title: 'Error',
        variant: 'destructive',
      });
      return;
    }
    return response.data;
  } catch (error) {
    toast({
      title: 'Error',
      variant: 'destructive',
    });
  }
};
