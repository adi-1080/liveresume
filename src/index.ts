import { app } from './app';
import { prisma } from './plugins/db';

const PORT = process.env.PORT || 3000;

async function main() {
  try{
    await prisma.$connect();
    console.log('Database Connected✅');
  }catch(error){
    console.error('Database connection failed', error);
    process.exit(1);
  }

  app.listen(PORT, ({hostname,port}) => {
  console.log(`🦊 Elysia is running cleanly at ${hostname}:${port}`);
});
}

main();