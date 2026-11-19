import RegistrationsCatalog from "@/components/registrations-page/RegistrationsCatalog";
import { UserSelector } from "@/components/user/UserSelector";
import { getCookieInfo } from "@/lib/getCookieInfo";



export  default  async function MyRegistrationPage() {

  const user_id = await getCookieInfo();

  return (
    <>
      <UserSelector/>
      <RegistrationsCatalog user_id={user_id} />
    </>
  );
}

