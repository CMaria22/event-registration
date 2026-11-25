GET /api/events
type Event=
{
    eventId:string;
    title:string;
    eventDate: string;
    startTime: string;
    availability: Availability;

};
response =>
{
    data: Events[];
    isSuccess: boolean;
    status: number;
};
type Availability = {kind:'limited'; remaining:number} | {kind:'unlimited'} | {kind:'unknown'}.

#Possible  HTTP failures :
    - status 500 internal server error
    - zod errors while parsing
    - invalid data

Examples 
{
  data: [
    {
      eventId: "evt-001",
      title: "Product Design Sprint",
      eventDate: "2026-12-05",
      startTime: "2026-12-05T18:30:00+02:00",
      availability: {kind:'limited'; remaining:22}
    }
  ],
  "isSuccess": true,
  "status": 200
}


