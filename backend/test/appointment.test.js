import assert from "node:assert/strict";
import { test } from "node:test";
import mongoose from "mongoose";
import appointmentController from "../controllers/appointmentController.js";
import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";

const requestBody = {
  specialization: "Dermatology",
  doctorId: "doctor@example.test",
  appointmentTime: "10:00 AM",
  symptoms: "Synthetic test data",
  userId: "patient@example.test",
};

async function submit(body) {
  const response = {
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
    },
  };
  await appointmentController.create_appointment({ body }, response);
  return response;
}

test("persists the chosen date at UTC midnight and returns it", async (t) => {
  t.mock.method(Doctor, "findOne", async () => ({
    _id: new mongoose.Types.ObjectId(),
    name: "Test Doctor",
    email: requestBody.doctorId,
  }));
  t.mock.method(Appointment.prototype, "save", async function () {
    assert.equal(this.date.toISOString(), "2030-01-07T00:00:00.000Z");
  });
  t.mock.method(console, "warn", () => {});
  const originalEmailUser = process.env.EMAIL_USER;
  delete process.env.EMAIL_USER;
  t.after(() => {
    if (originalEmailUser !== undefined) process.env.EMAIL_USER = originalEmailUser;
  });

  const response = await submit({ ...requestBody, appointmentDate: "2030-01-07" });
  assert.equal(response.statusCode, 201);
  assert.equal(response.body.data.appointmentDate, "2030-01-07");
  assert.match(response.body.data.appointmentNumber, /^[0-9A-F]{8}$/);
});

test("rejects missing, malformed, and impossible dates before querying MongoDB", async (t) => {
  const lookup = t.mock.method(Doctor, "findOne", () => assert.fail("Unexpected database lookup"));
  for (const appointmentDate of [undefined, "2030-1-7", "2030-02-29", "2030-13-01"]) {
    const response = await submit({ ...requestBody, appointmentDate });
    assert.equal(response.statusCode, 400);
    assert.equal(response.body.success, false);
  }
  assert.equal(lookup.mock.callCount(), 0);
});
