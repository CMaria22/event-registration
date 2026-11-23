import { expect, test } from "vitest";
import {  useGetEvents } from "./useGetEvents"
import { renderHook, waitFor } from "@testing-library/react";
import {events} from "@/mocks/fixtures"

test("getting the events",async ()=>{
    const s = renderHook(() => useGetEvents());
    expect(s.result.current.status==="loading").toBeTruthy();
      await waitFor(() => expect(s.result.current.status).toBe("success"));
    expect(s.result.current.data?.length === events.length).toBeTruthy();
     for (let i = 0; i < events.length; i++) {
       expect(s.result.current.data![i]).toEqual(events[i]);
     }
})