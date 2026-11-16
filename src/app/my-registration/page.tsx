import RegistrationsCatalog from "@/components/registrations-page/RegistrationsCatalog";
import { getCookieInfo } from "@/lib/getCookieInfo";



export  default  async function MyRegistrationPage() {

  const user_id = await getCookieInfo();

  if(user_id===null||user_id===undefined) return <div> You need to sign in! </div>;
  return (
    <>
      <RegistrationsCatalog user_id={user_id} />
    </>
  );
}

