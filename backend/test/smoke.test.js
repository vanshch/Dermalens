import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { readdir, unlink } from "node:fs/promises";
import { test } from "node:test";
import { MongoMemoryServer } from "mongodb-memory-server-core";
import mongoose from "mongoose";
import sharp from "sharp";
import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";

const uploadsDirectory = new URL("../uploads/", import.meta.url);

async function post(baseUrl, path, body, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  const response = await fetch(`${baseUrl}${path}`, { method: "POST", headers, body });
  return { status: response.status, body: await response.json() };
}

test("a clean demo can sign in, analyze an image, and request an appointment", { timeout: 300_000 }, async (t) => {
  const mongo = await MongoMemoryServer.create({ instance: { ip: "127.0.0.1" } });
  const uploadSuffix = `.smoke-${randomUUID()}`;
  let server;
  let uploadSent = false;
  t.after(async () => {
    try {
      if (server) {
        await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
      }
      await mongoose.disconnect();
    } finally {
      await mongo.stop();
    }
    if (uploadSent) {
      const uploadedFiles = await readdir(uploadsDirectory);
      for (const filename of uploadedFiles.filter((name) => name.endsWith(uploadSuffix))) {
        await unlink(new URL(filename, uploadsDirectory));
      }
    }
  });
  Object.assign(process.env, {
    HOST: "127.0.0.1",
    PORT: "0",
    MONGO_URI: mongo.getUri("dermalens_smoke"),
    JWT_SECRET: randomUUID(),
    GEMINI_API_KEY: "",
    GEMINI_MODEL: "",
    EMAIL_USER: "",
    EMAIL_PASS: "",
  });
  ({ default: server } = await import("../server.js"));
  if (!server.listening) await once(server, "listening");
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(baseUrl);
  assert.equal(health.status, 200);
  await health.text();

  const credentials = { email: "demo-patient@example.test", password: "test-only-password" };
  const registration = await post(baseUrl, "/api/auth/register", { ...credentials, name: "Demo Patient" });
  assert.equal(registration.status, 201, JSON.stringify(registration.body));
  const login = await post(baseUrl, "/api/auth/login", credentials);
  assert.equal(login.status, 200, JSON.stringify(login.body));
  const token = login.body.data.token;
  assert.equal(typeof token, "string");

  const png = await sharp({ create: { width: 16, height: 16, channels: 3, background: "#b7b7b7" } }).png().toBuffer();
  const file = new FormData();
  file.set("file", new Blob([png], { type: "image/png" }), `synthetic${uploadSuffix}`);
  uploadSent = true;
  const image = await post(baseUrl, "/api/post/image", file, token);
  assert.equal(image.status, 200, JSON.stringify(image.body));
  assert.equal(image.body.data.modelPredictions.length, 3);
  assert.ok(image.body.data.modelPredictions.every(({ probability }) => Number.isFinite(probability)));
  assert.equal(image.body.data.geminiPrediction, null);

  const doctor = await Doctor.create({
    name: "Demo Doctor",
    email: "demo-doctor@example.test",
    specialty: "Dermatology",
    specialization: "Dermatology",
    credentials: "Test credentials",
    experience: "Test experience",
    education: "Test education",
    availableSlots: ["10:00 AM"],
  });
  const appointmentDate = "2030-01-07";
  const booking = await post(baseUrl, "/api/appointment/create", {
    specialization: doctor.specialization,
    doctorId: doctor.email,
    appointmentDate,
    appointmentTime: doctor.availableSlots[0],
    symptoms: "Synthetic smoke test data",
    userId: credentials.email,
  }, token);
  assert.equal(booking.status, 201, JSON.stringify(booking.body));
  assert.equal(booking.body.data.appointmentDate, appointmentDate);
  const savedAppointment = await Appointment.findOne({ appointmentNumber: booking.body.data.appointmentNumber });
  assert.equal(savedAppointment?.date.toISOString(), `${appointmentDate}T00:00:00.000Z`);
});
