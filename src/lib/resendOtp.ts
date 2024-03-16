import { toast } from '@/components/ui/use-toast';
import { apiRequest } from '@/services/api/apiRequest';

export const resendOtp = async (email: string) => {
  try {
    const response = await apiRequest({
      method: 'POST',
      endpoint: 'api/resend-otp',
      data: JSON.stringify({ email }),
    });

    if (response.status !== 200) {
      toast({
        title: response.data.error,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'OTP sent successfully',
      description: 'OTP sent successfully',
    });
  } catch (error) {
    console.log(error);
    toast({
      title: (error?.response?.data?.message as string) || 'Error',
      variant: 'destructive',
    });
  }
};
