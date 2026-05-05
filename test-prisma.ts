import "dotenv/config";
import { prisma } from "./src/plugins/db";

async function test() {
  try {
    // Test 1: Raw query to check connection
    console.log("Test 1: Raw query...");
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Connection works:", result);

    // Test 2: findMany (no args)
    console.log("\nTest 2: findMany...");
    const users = await prisma.user.findMany();
    console.log("Users:", users);

    // Test 3: findUnique
    console.log("\nTest 3: findUnique...");
    const user = await prisma.user.findUnique({ where: { username: "testuser" } });
    console.log("User:", user);
  } catch (error: any) {
    console.error("FULL ERROR:");
    console.error("Code:", error.code);
    console.error("Meta:", JSON.stringify(error.meta));
    console.error("Message:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
