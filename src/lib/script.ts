import { PrismaClient } from '../../generated/prisma/client.js'
import { hashPassword } from "better-auth/crypto";
import { prisma } from './prisma.js';



async function main() {
  const adminEmail = 'admin@foodhub.com'
  const hashedPassword = await hashPassword('admin123');

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      id: 'admin-user-uuid-123', 
      email: adminEmail,
      name: 'System Admin',
      role: 'ADMIN',
      isActive: true,
      accounts: {
        create: {
          id: 'admin-account-uuid-123',
          accountId: adminEmail,
          providerId: 'credential',
          password: hashedPassword,
        }
      }
    },
  })

  console.log("✅ Admin seeded successfully with Static ID")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })