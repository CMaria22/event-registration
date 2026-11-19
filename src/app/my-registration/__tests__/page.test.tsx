

import RegistrationsCatalog from "@/components/registrations-page/RegistrationsCatalog";
import { registrations } from "@/mocks/fixtures";
import { server } from "@/mocks/server";
import { render, screen, waitFor } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { expect, test } from "vitest";

test("Alice's stale 700ms response does not overwrite Bob's 100ms list", async () => {
 
  server.use(
    http.get(
      "https://api.example.com/registrations/:userId",
      async ({ params }) => {
        const { userId } = params;

        if (userId === "user-id-1") {
          await delay(700);
          return HttpResponse.json({
            isSuccess: true,
            status: 200,
            data: registrations.filter((r) => r.id_user === "user-id-1"),
          });
        }

        if (userId === "user-id-2") {
          await delay(100);
          return HttpResponse.json({
            isSuccess: true,
            status: 200,
            data: registrations.filter((r) => r.id_user === "user-id-2"),
          });
        }

        return HttpResponse.json({ isSuccess: true,status: 200, data: [] });
      },
    ),
  );

 
  const { rerender } = render(<RegistrationsCatalog user_id="user-id-1" />);

  
  rerender(<RegistrationsCatalog user_id="user-id-2" />);

  
  expect(await screen.findByText(/Design Systems 101/)).toBeInTheDocument();

 
  await new Promise((resolve) => setTimeout(resolve, 750));

  
  await waitFor(() => {
    expect(screen.getByText(/Design Systems 101/)).toBeInTheDocument();
    expect(screen.queryByText(/Product Design Sprint/)).not.toBeInTheDocument();
    expect(screen.queryByText(/React Patterns Lab/)).not.toBeInTheDocument();
  });
});

test("testing retry", async ()=>{
   server.use(
     http.get(
       "https://api.example.com/registrations/user-id-1",
       async () => {
         await delay(200);
         return HttpResponse.json(
           {
             isSuccess: false,
             status: 401,
             error: "Session expired — sign in again",
           },
           { status: 401 },
         );
       },
       { once: true },
     ),
     http.get(
       "https://api.example.com/registrations/user-id-1",
       async () => {
         return HttpResponse.json(
           { isSuccess: true, status: 200, data: [] },
         );
       },
       { once: true },
     ),
   );
    
    render(<RegistrationsCatalog user_id="user-id-1" />);
    expect(await screen.findByText(/Loading.../)).toBeInTheDocument();
    expect(
      await screen.findByText(/Session expired — sign in again/),
    ).toBeInTheDocument();

    (await screen.findByRole("button")).click();
    expect( await screen.findByText(/No registrations found./)).toBeInTheDocument();

})

test("Alice is selected",
   async ()=>{
   const others = registrations.filter((reg) => reg.id_user !== "user-id-1");
   render(<RegistrationsCatalog user_id="user-id-1" />);
   others.forEach((reg) => {
     expect(screen.queryByText(reg.event_name)).not.toBeInTheDocument();
   });
   }
);