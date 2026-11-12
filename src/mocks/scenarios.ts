import { http, HttpResponse } from "msw/http";

//401
export const unauthorizedResponse = http.get(
  "https://api.example.com/registrations/:id",
  () => {
    return HttpResponse.json({ error: "Unauthorized", status:401, isSuccess:false }, { status: 401 });
  },
);

//409

export const eventResponse = http.get(
  "https://api.example.com/events/:id",
  () =>
    HttpResponse.json({
      data: {
        id: "evt-test",
        name: "Test",
        description: "Testing event",
        type: "Workshop",
        date: "2027-01-04",
        startTime: "09:00",
        endTime: "12:00",
        location: "Bucharest",
        availability: "limited",
        availableSeats: 5,
        fee: 0,
      },
      status: 200,
      isSuccess: true,
    }),
);

export const conflictResponse = http.post(
  "https://api.example.com/registrations",
  () => {
    return HttpResponse.json({
      error: "Already registered for this event",
      status: 409,
      isSuccess: false,
    });
  },
);

//422
export const unprocessableRegistrationResponse = http.post(
  "https://api.example.com/registrations",
  () => {
    return HttpResponse.json(
      { error: "Invalid registration data", status:422, isSuccess:false },
      { status: 422 },
    );
  },
);

//500
export const serverErrorResponse = http.get(
  "https://api.example.com/events",
  () => {
    return HttpResponse.json({
      error: "Internal Server Error",
      status: 500,
      isSuccess: false,
    });
  },
);
//slow response
export const slowResponse = http.get(
  "https://api.example.com/events",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds delay
    return HttpResponse.json({ error: "Request timed out" , status: 408, isSuccess:false}, { status: 408 });
  },
);
// invalid json structure
export const invalidJsonResponse = http.get(
  "https://api.example.com/events",
  () => {
    return HttpResponse.json(
      { invalidField: "This is not the expected structure", status:200, isSuccess:false },
      { status: 200 },
    );
  },
);
export const scenarios = {
  default: [],
  serverError: [serverErrorResponse],
  slow: [slowResponse],
  invalidJson: [invalidJsonResponse],
  conflict: [conflictResponse],
  unauthorized: [unauthorizedResponse],
  unprocessable: [unprocessableRegistrationResponse],
};