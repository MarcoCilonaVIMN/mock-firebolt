"use strict";

import { expect, jest, test, afterAll, beforeAll } from "@jest/globals";
import * as utilities from "./utilities.mjs";

jest.setTimeout(30030);

const httpPort = 3335;
const socketPort = 9990;

beforeAll(async () => {
  console.log(
    await utilities.mfState(
      true,
      ` -- --discovery --httpPort ${httpPort} --socketPort ${socketPort}`
    )
  );
});

afterAll(async () => {
  //Stop Mock Firebolt
  console.log(await utilities.killPort(socketPort));
});

test(`OPENRPC Response for discovery SDK`, async () => {
  const response = await utilities.fireboltCommand(
    JSON.stringify({
      method: "accessibility.closedCaptionsSettings",
      params: {},
      id: 0,
    }),
    socketPort
  );
  expect(response.includes('"enabled":true')).toEqual(true);
});
