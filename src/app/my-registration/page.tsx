import RegistrationsCatalog from "@/components/registrations-page/RegistrationsCatalog";
import { getCookieInfo } from "@/lib/getCookieInfo";



export  default  async function MyRegistrationPage() {

  const user_id = await getCookieInfo();


  return (
    <>
      <RegistrationsCatalog user_id={user_id} />
    </>
  );
}

