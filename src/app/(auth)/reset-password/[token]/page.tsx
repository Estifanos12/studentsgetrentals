import { NewPasswordForm } from '@/components/auth/new_password';

type NewPasswordProps = {
  params: { token: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function NewPassword(props: NewPasswordProps) {
  return <NewPasswordForm />;
}
